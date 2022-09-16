<script setup lang="ts">
import Container from '@/components/shared/Container/Container.vue'
import RegisterForm from '@/components/Forms/RegisterForm.vue'
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
    <RegisterForm />
  </Container>
</template>
