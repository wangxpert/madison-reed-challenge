<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImageStore } from './stores/imageStore'
import ImageGallery from './components/ImageGallery.vue'
import ImageModal from './components/ImageModal.vue'
import LoadingIndicator from './components/LoadingIndicator.vue'

// Use the image store
const imageStore = useImageStore()

// State for the selected image and its index
const selectedImage = ref(null)
const currentIndex = ref(null)

// Lifecycle hook to fetch images on mount
onMounted(() => {
  imageStore.fetchImages()
})

// Function to open the modal
const openModal = (image, index) => {
  currentIndex.value = index
  selectedImage.value = image
}

// Function to close the modal
const closeModal = () => {
  selectedImage.value = null
  currentIndex.value = null
}

// Function to update the current index and selected image
const setCurrentIndex = (index) => {
  currentIndex.value = index
  selectedImage.value = imageStore.images[index]
}
</script>

<template>
  <div>
    <!-- Loading Indicator -->
    <div
      v-if="imageStore.isLoading"
      class="fixed inset-0 flex items-center justify-center bg-gray-100 z-50"
    >
      <LoadingIndicator size="lg" />
    </div>

    <!-- Gallery -->
    <ImageGallery v-else @openModal="openModal" />

    <!-- Modal -->
    <ImageModal
      :selectedImage="selectedImage"
      :closeModal="closeModal"
      :currentIndex="currentIndex"
      :setCurrentIndex="setCurrentIndex"
    />
  </div>
</template>
