<script setup lang="ts">
import { computed } from 'vue'
import { useImageStore } from '../stores/imageStore'

interface ImageModalProps {
  closeModal: () => void // Function to close the modal
  currentIndex?: number // Index of the currently selected image
  setCurrentIndex: (index: number) => void // Function to update the current index
}
const { closeModal, currentIndex, setCurrentIndex } = defineProps<ImageModalProps>()

const imageStore = useImageStore()
const images = computed(() => imageStore.images)

// Compute the selected image based on the current index
const selectedImage = computed(() => {
  if (currentIndex !== null && currentIndex >= 0 && currentIndex < images.value.length) {
    return images.value[currentIndex]
  }
  return null
})

// Computed property to check if there is a previous or next image
const hasPrev = computed(() => currentIndex !== null && currentIndex > 0)
const hasNext = computed(() => currentIndex !== null && currentIndex < images.value.length - 1)

const goToPrev = () => {
  if (hasPrev.value && currentIndex !== null) {
    setCurrentIndex(currentIndex - 1)
  }
}

const goToNext = () => {
  if (hasNext.value && currentIndex !== null) {
    setCurrentIndex(currentIndex + 1)
  }
}

// Ref to track the key for the transition
const transitionKey = computed(() => `image-${currentIndex}`)
</script>

<template>
  <div
    v-if="selectedImage"
    class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full relative" @click.stop>
      <button
        class="absolute -top-4 -right-4 bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
        @click="closeModal"
      >
        &times;
      </button>

      <!-- Image with Transition -->
      <transition :name="'fade'" mode="out-in">
        <img
          v-if="selectedImage"
          :key="transitionKey"
          :src="selectedImage.download_url"
          :alt="selectedImage.author"
          class="w-full h-auto rounded-lg mb-6"
        />
      </transition>

      <!-- Image Details -->
      <h2 class="text-xl font-bold mb-4">{{ selectedImage.author }}</h2>
      <p class="text-gray-600 mb-2">ID: {{ selectedImage.id }}</p>
      <p class="text-gray-600">
        Original Size: {{ selectedImage.width }} x {{ selectedImage.height }}
      </p>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-6">
        <button
          v-if="hasPrev"
          data-testid="prev-button"
          class="bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg px-6 py-3 shadow-md"
          @click="goToPrev"
        >
          Previous
        </button>
        <button
          v-if="hasNext"
          data-testid="next-button"
          class="bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg px-6 py-3 shadow-md ml-auto"
          @click="goToNext"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
