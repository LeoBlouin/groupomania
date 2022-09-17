<script setup lang="ts">
import PostService from '@/services/post.service'
import { onMounted, onUpdated, ref } from 'vue'
import Post from './Post.vue'

const posts = ref([])

onMounted(() => getAllPosts())
onUpdated(() => getAllPosts())

const getAllPosts = async () => {
  const postService = new PostService()
  const allPosts: any = await postService.getAllPosts()
  posts.value = allPosts
}
</script>

<template>
  <ul class="mt-10 mb-20 flex flex-col space-y-14">
    <Post v-for="post in posts" :key="(post as any).id" :post="post" />
  </ul>
</template>
