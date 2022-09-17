<script setup lang="ts">
import emptyIcon from '@/assets/images/empty_icon.jpg'
import PostService from '@/services/post.service'
import moment from 'moment'
import 'moment/locale/fr'
import { onBeforeMount, ref } from 'vue'
import DeletePost from './DeletePost.vue'
import EditPost from './EditPost.vue'

moment.locale('fr', {
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'un an',
    yy: '%d ans',
  },
})

const props = defineProps({
  post: Object,
})

const isLiked = ref(false)
const numberOfLikes = ref(0)

onBeforeMount(() => {
  const postService = new PostService()
  postService.checkLike(props.post?.id).then(res => {
    isLiked.value = res
    numberOfLikes.value = JSON.parse(props.post?.likes).length
  })
})

const likePost = async () => {
  const postService = new PostService()
  const res = await postService.likePost(props.post?.id)
  isLiked.value = res
  if (res) numberOfLikes.value++
  else numberOfLikes.value--
}
</script>

<template>
  <div class="rounded-xl border border-gray-300 bg-white p-5 shadow-xl sm:p-8 md:p-10">
    <div class="mb-10 flex items-center justify-between">
      <div class="flex items-center">
        <img
          :src="emptyIcon"
          alt="Logo personne"
          class="mr-5 h-12 w-12 rounded-full border border-gray-400" />
        <div class="flex flex-col">
          <p class="text-bold text-lg">{{ post?.author }}</p>
          <p class="text-tertiary">{{ moment(post?.created_at).fromNow() }}</p>
        </div>
      </div>
      <div v-if="post?.canEditOrDelete" class="flex items-center space-x-3">
        <EditPost
          :title="post?.title"
          :content="post?.content"
          :filename="post?.filename"
          :postId="post?.id" />
        <DeletePost :postId="post?.id" />
      </div>
    </div>
    <h1 class="text-bold mb-10 text-2xl">{{ post?.title }}</h1>
    <p>{{ post?.content }}</p>
    <img
      v-if="post?.filename"
      :src="post?.filename"
      alt="Illustration du post"
      class="mx-auto mt-10 block w-full max-w-md rounded" />
    <div class="mt-10 flex items-center space-x-3">
      <i
        v-if="isLiked"
        @click="likePost"
        class="fa-solid fa-heart cursor-pointer text-xl text-primary"></i>
      <i v-if="!isLiked" @click="likePost" class="fa-regular fa-heart cursor-pointer text-xl"></i>
      <p>{{ numberOfLikes }}</p>
    </div>
  </div>
</template>
