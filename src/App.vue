<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
      <div class="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>

    <!-- Gallery -->
    <div v-else class="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div v-for="image in images" :key="image.id" class="cursor-pointer" @click="openModal(image)">
        <img
          :src="image.download_url"
          :alt="image.author"
          class="w-full h-32 object-cover rounded-lg shadow-md"
        />
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      @click="closeModal"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative" @click.stop>
        <!-- Close Button -->
        <button
          class="absolute -top-4 -right-4 bg-gray-100 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          @click="closeModal"
        >
          &times;
        </button>

        <!-- Image -->
        <img
          :src="selectedImage.download_url"
          :alt="selectedImage.author"
          class="w-full h-auto rounded-lg mb-4"
        />

        <!-- Image Details -->
        <h2 class="text-lg font-bold mb-2">{{ selectedImage.author }}</h2>
        <p class="text-gray-600">ID: {{ selectedImage.id }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Loader styles */
.loader {
  border-width: 4px;
  border-style: solid;
  border-color: transparent;
  border-top-color: #3b82f6; /* Tailwind's blue-500 */
}
</style>
