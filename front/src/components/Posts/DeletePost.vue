<script setup lang="ts">
import { ref } from 'vue'
import PostService from '@/services/post.service'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import PrimaryButton from '../shared/Buttons/PrimaryButton.vue'
import GhostButton from '../shared/Buttons/GhostButton.vue'
import { errorToast, successToast } from '../shared/Toasts/Toasts'

const isOpen = ref(false)

const openModal = () => (isOpen.value = true)
const closeModal = () => (isOpen.value = false)

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

const deletePost = async () => {
  try {
    const postService = new PostService()
    await postService.deletePost(props.postId)
    closeModal()
    successToast('Post supprimé avec succès !')
  } catch {
    errorToast('Une erreur est survenue, veuillez réessayer.')
  }
}
</script>

<template>
  <i
    class="fa-solid fa-trash cursor-pointer duration-300 hover:text-primary"
    @click="openModal"></i>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-xl font-medium leading-6 text-gray-900">
                Voulez-vous vraiment supprimer ce post ?
              </DialogTitle>

              <div class="mt-12 flex space-x-5">
                <GhostButton text="Annuler" @click="closeModal" />
                <PrimaryButton text="Supprimer" @click="deletePost" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
