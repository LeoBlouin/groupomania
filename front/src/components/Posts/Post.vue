<script setup lang="ts">
import emptyIcon from '@/assets/images/empty_icon.jpg'
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

defineProps({
  post: Object,
})
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
      <i
        class="fa-solid fa-ellipsis-vertical flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-xl text-tertiary duration-300 hover:bg-gray-100"></i>
    </div>
    <h1 class="text-bold mb-10 text-2xl">{{ post?.title }}</h1>
    <p>{{ post?.content }}</p>
    <img
      v-if="post?.filename"
      :src="post?.filename"
      alt="Illustration du post"
      class="mx-auto mt-10 block w-full max-w-md rounded" />
  </div>
</template>
