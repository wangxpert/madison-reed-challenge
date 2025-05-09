<template>
  <div class="flex items-center justify-center">
    <div :class="`loader ${sizeClass}`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Define the size prop with default value 'md'
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

// Compute the size classes based on the size prop
const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-6 h-6'
    case 'lg':
      return 'w-16 h-16'
    case 'md':
    default:
      return 'w-10 h-10'
  }
})
</script>

<style scoped>
.loader {
  border-width: 4px;
  border-style: solid;
  border-color: transparent;
  border-top-color: #3b82f6; /* Tailwind's blue-500 */
  border-right-color: #60a5fa; /* Tailwind's blue-400 */
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 50%, transparent 100%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
