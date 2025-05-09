<script setup lang="ts">
import { ref, computed } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'
import { useImageStore } from '../stores/imageStore'

// Define the emit type
defineEmits<{
  (e: 'openModal', payload: number): void
}>()

const imageStore = useImageStore()
const images = computed(() => imageStore.images)

// Track loading states for each image
const loadedImages = ref(new Set())

// Function to mark an image as loaded
const markAsLoaded = (id: string) => {
  loadedImages.value.add(id)
}
</script>

<template>
  <div class="p-6">
    <!-- Check if there are images -->
    <div v-if="images.length === 0" class="text-center text-gray-500 text-lg font-medium">
      No Images Available
    </div>

    <!-- Image Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
    >
      <div
        v-for="(image, index) in images"
        :key="image.id"
        class="relative cursor-pointer group overflow-hidden rounded-lg"
        @click="$emit('openModal', index)"
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
  </div>
</template>
