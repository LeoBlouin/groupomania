<script setup lang="ts">
defineProps({
  text: String,
})
</script>

<template>
  <button
    :class="`inline-flex items-center justify-center rounded-md
      bg-transparent px-4 py-2
      font-medium text-gray-800 duration-300 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2`">
    {{ text }}
  </button>
</template>
