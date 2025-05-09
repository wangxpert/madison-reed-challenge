<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useImageStore } from './stores/imageStore'
import ImageGallery from './components/ImageGallery.vue'
import ImageModal from './components/ImageModal.vue'
import LoadingIndicator from './components/LoadingIndicator.vue'

// Use the image store
const imageStore = useImageStore()

// State for the selected image
const selectedImage = ref(null)

// Lifecycle hook to fetch images on mount
onMounted(() => {
  imageStore.fetchImages()
})

// Function to open the modal
const openModal = (image) => {
  selectedImage.value = image
}

// Function to close the modal
const closeModal = () => {
  selectedImage.value = null
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
    <ImageGallery v-else :images="imageStore.images" :openModal="openModal" />

    <!-- Modal -->
    <ImageModal :selectedImage="selectedImage" :closeModal="closeModal" />
  </div>
</template>
