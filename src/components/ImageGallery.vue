<script setup lang="ts">
import { defineProps, ref } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'

defineProps({
  images: Array, // List of images
  openModal: Function, // Function to open the modal
})

// Track loading states for each image
const loadedImages = ref(new Set())

// Function to mark an image as loaded
const markAsLoaded = (id) => {
  loadedImages.value.add(id)
}
</script>

<template>
  <div
    class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
  >
    <div
      v-for="(image, index) in images"
      :key="image.id"
      class="relative cursor-pointer group overflow-hidden rounded-lg"
      @click="openModal(image, index)"
    >
      <!-- Loading Indicator -->
      <div
        v-if="!loadedImages.has(image.id)"
        class="absolute inset-0 flex items-center justify-center bg-gray-200"
      >
        <LoadingIndicator />
      </div>

      <!-- Image -->
      <img
        :src="image.download_url"
        :alt="image.author"
        class="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
        @load="markAsLoaded(image.id)"
      />

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
      >
        <p class="text-white text-sm font-medium">{{ image.author }}</p>
      </div>
    </div>
  </div>
</template>
