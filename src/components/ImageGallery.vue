<script setup lang="ts">
import { defineProps, ref } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'

defineProps({
  images: Array,
  openModal: Function,
})

// Track loading states for each image
const loadedImages = ref(new Set())

// Function to mark an image as loaded
const markAsLoaded = (id) => {
  loadedImages.value.add(id)
}
</script>

<template>
  <div class="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <div
      v-for="image in images"
      :key="image.id"
      class="relative cursor-pointer"
      @click="openModal(image)"
    >
      <!-- Loading Indicator -->
      <div
        v-if="!loadedImages.has(image.id)"
        class="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg"
      >
        <LoadingIndicator />
      </div>

      <!-- Image -->
      <img
        :src="image.download_url"
        :alt="image.author"
        class="w-full h-32 object-cover rounded-lg shadow-md"
        @load="markAsLoaded(image.id)"
      />
    </div>
  </div>
</template>
