<script setup lang="ts">
import PostService from '@/services/post.service'
import { onMounted, onUpdated, reactive } from 'vue'
import Post from './Post.vue'

const state = reactive({
  posts: [],
})

onMounted(() => getAllPosts())
onUpdated(() => getAllPosts())

const getAllPosts = async () => {
  const postService = new PostService()
  const allPosts: any = await postService.getAllPosts()
  state.posts = allPosts
}
</script>

<template>
  <div class="mt-10 mb-20 flex flex-col space-y-14">
    <Post v-for="post in state.posts" :post="post" />
  </div>
</template>
