<script setup lang="ts">
import logo from '@/assets/images/white-logo.svg'
</script>

<template>
  <div class="bg-image h-screen pt-20">
    <router-link to="/login">
      <img :src="logo" alt="Logo Groupomania" class="mx-auto block w-72 sm:w-96" />
    </router-link>
    <div
      class="mx-auto mt-14 w-11/12 rounded-lg bg-white p-7 sm:mt-20 sm:w-4/5 md:mt-24 md:w-3/4 lg:w-1/2 2xl:w-1/3">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: linear-gradient(rgba(225, 29, 72, 0.85), rgba(225, 29, 72, 0.85)),
    url('/images/desktop.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
