<script setup lang="ts">
import { onBeforeMount } from 'vue'
import router from '@/router'

import Header from '@/components/shared/Header/Header.vue'
import ListPost from '../components/Posts/ListPost.vue'

onBeforeMount(() => {
  const token = sessionStorage.getItem('token')
  if (!token) {
    router.push('/login')
  }
})
</script>

<template>
  <Header />
  <div class="container mx-auto px-5">
    <ListPost />
  </div>
</template>
