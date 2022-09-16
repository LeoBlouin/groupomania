<script setup lang="ts">
import logo from '@/assets/images/white-logo.svg'
import router from '@/router'
import { warnToast } from '../Toasts/Toasts'

const logout = () => {
  sessionStorage.removeItem('token')
  warnToast('Vous êtes désormais déconnecté !')
  router.replace('/login')
}
</script>

<template>
  <header class="flex items-center justify-between bg-primary py-5 px-5 text-white">
    <img :src="logo" alt="Logo Groupomania" class="block w-32 sm:w-40 md:w-52" />
    <i
      @click="logout"
      class="fa-solid fa-arrow-right-from-bracket cursor-pointer text-xl hover:text-secondary"></i>
  </header>
</template>
