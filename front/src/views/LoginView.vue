<script setup lang="ts">
import Container from '@/components/shared/Container/Container.vue'
import LoginForm from '@/components/Forms/LoginForm.vue'
import { onBeforeMount } from 'vue'
import router from '@/router'

onBeforeMount(() => {
  const token = sessionStorage.getItem('token')
  if (token) {
    router.push('/home')
  }
})
</script>

<template>
  <Container>
    <LoginForm />
  </Container>
</template>
