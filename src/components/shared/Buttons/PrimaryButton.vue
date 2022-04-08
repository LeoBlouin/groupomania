<script setup lang="ts">
defineProps({
  text: String,
  outline: Boolean,
});
</script>

<template>
  <button
    :class="`inline-flex items-center justify-center rounded-md
    ${outline ? 'bg-transparent' : 'bg-primary '}
    ${outline ? 'text-primary' : 'text-white '}
    border ${outline ? 'border-primary' : 'border-transparent'}
    ${outline ? 'hover:bg-primary hover:text-white' : 'hover:bg-secondary'}
    px-4 py-2 font-medium duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
