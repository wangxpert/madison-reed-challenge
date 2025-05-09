<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  selectedImage: Object,
  closeModal: Function,
})
</script>

<template>
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
      <p class="text-gray-600 mb-2">ID: {{ selectedImage.id }}</p>
      <p class="text-gray-600">
        Original Size: {{ selectedImage.width }} x {{ selectedImage.height }}
      </p>
    </div>
  </div>
</template>
