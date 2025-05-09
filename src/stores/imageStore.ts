import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('imageStore', () => {
  const images = ref([])
  const isLoading = ref(false)

  // Fetch images from the API
  const fetchImages = async () => {
    isLoading.value = true
    try {
      const endpoint = `${import.meta.env.VITE_API_ENDPOINT}?limit=100`
      const response = await fetch(endpoint)
      images.value = await response.json()
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    images,
    isLoading,
    fetchImages,
  }
})
