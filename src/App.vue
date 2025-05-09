<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ImageGallery from './components/ImageGallery.vue'
import ImageModal from './components/ImageModal.vue'
import LoadingIndicator from './components/LoadingIndicator.vue'

// State variables
const images = ref([])
const isLoading = ref(true)
const selectedImage = ref(null)

// Fetch images from the API
const fetchImages = async () => {
  try {
    const response = await fetch('https://picsum.photos/v2/list?limit=100')
    images.value = await response.json()
  } catch (error) {
    console.error('Error fetching images:', error)
  } finally {
    isLoading.value = false
  }
}

// Lifecycle hook to fetch images on mount
onMounted(() => {
  fetchImages()
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
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <LoadingIndicator size="lg" />
    </div>

    <!-- Gallery -->
    <ImageGallery v-else :images="images" :openModal="openModal" />

    <!-- Modal -->
    <ImageModal :selectedImage="selectedImage" :closeModal="closeModal" />
  </div>
</template>
