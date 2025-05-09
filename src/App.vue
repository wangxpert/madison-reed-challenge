<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useImageStore } from './stores/imageStore'
import ImageGallery from './components/ImageGallery.vue'
import ImageModal from './components/ImageModal.vue'
import LoadingIndicator from './components/LoadingIndicator.vue'

const { fetchImages, isLoading } = useImageStore()

// State for the selected image
const currentIndex = ref(null)

// Fetch images on mount
onMounted(() => {
  fetchImages()
})

const openModal = (index) => {
  currentIndex.value = index
}

const closeModal = () => {
  currentIndex.value = null
}

const setCurrentIndex = (index) => {
  currentIndex.value = index
}
</script>

<template>
  <div>
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <LoadingIndicator size="lg" />
    </div>

    <ImageGallery v-else @openModal="openModal" />

    <ImageModal
      :closeModal="closeModal"
      :currentIndex="currentIndex"
      :setCurrentIndex="setCurrentIndex"
    />
  </div>
</template>
