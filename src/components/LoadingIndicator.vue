<template>
  <div class="flex items-center justify-center">
    <div :class="`loader ${sizeClass}`"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

// Define the size prop with default value 'md'
const props = defineProps({
  size: {
    type: String,
    default: 'md', // Default size is 'md'
    validator: (value) => ['sm', 'md', 'lg'].includes(value), // Valid sizes
  },
})

// Compute the size classes based on the size prop
const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4 border-2'
    case 'lg':
      return 'w-12 h-12 border-4'
    default:
      return 'w-8 h-8 border-4' // Default to 'md'
  }
})
</script>

<style scoped>
/* Loader styles */
.loader {
  border-width: 4px;
  border-style: solid;
  border-color: transparent;
  border-top-color: #3b82f6; /* Tailwind's blue-500 */
  border-radius: 9999px; /* Fully rounded */
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
