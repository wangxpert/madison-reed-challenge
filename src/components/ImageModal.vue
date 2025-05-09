<script setup lang="ts">
import { computed } from 'vue'
import { useImageStore } from '../stores/imageStore' // Import the image store

// Props for modal control
const { selectedImage, closeModal, currentIndex, setCurrentIndex } = defineProps({
  selectedImage: Object,
  closeModal: Function,
  currentIndex: Number, // Index of the currently selected image
  setCurrentIndex: Function, // Function to update the current index
})

// Access images from the store
const imageStore = useImageStore()
const images = computed(() => imageStore.images) // Get images from the store

// Computed property to check if there is a previous or next image
const hasPrev = computed(() => currentIndex > 0)
const hasNext = computed(() => currentIndex < images.value.length - 1)

// Function to navigate to the previous image
const goToPrev = () => {
  if (hasPrev.value) {
    setCurrentIndex(currentIndex - 1)
  }
}

// Function to navigate to the next image
const goToNext = () => {
  if (hasNext.value) {
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
      <!-- Close Button -->
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
        <!-- Previous Button -->
        <button
          v-if="hasPrev"
          data-testid="prev-button"
          class="bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-lg px-6 py-3 shadow-md"
          @click="goToPrev"
        >
          Previous
        </button>

        <!-- Next Button -->
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
