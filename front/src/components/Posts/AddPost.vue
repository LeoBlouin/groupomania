<script setup lang="ts">
import { reactive, ref } from 'vue'
import PostService from '@/services/post.service'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import PrimaryButton from '../shared/Buttons/PrimaryButton.vue'
import InputWithLabel from '../shared/Form/InputWithLabel.vue'
import TextAreaWithLabel from '../shared/Form/TextAreaWithLabel.vue'
import { errorToast, successToast } from '../shared/Toasts/Toasts'

const isOpen = ref(false)
const fields = reactive({
  title: '',
  content: '',
  filename: '',
})

const openModal = () => (isOpen.value = true)
const closeModal = () => (isOpen.value = false)

const resetFields = () => {
  fields.title = ''
  fields.content = ''
  fields.filename = ''
}

const addNewPost = async () => {
  try {
    const postService = new PostService()
    await postService.addNewPost({ ...fields })
    closeModal()
    successToast('Nouveau post ajouté !')
    resetFields()
  } catch {
    errorToast('Une erreur est survenue, veuillez vérifier vos données et réessayer.')
  }
}
</script>

<template>
  <div class="mt-10 text-right">
    <PrimaryButton @click="openModal" text="Nouveau post" />
  </div>
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
                Ajout d'un nouveau post
              </DialogTitle>

              <form class="mt-10 flex flex-col space-y-8" @submit.prevent="addNewPost">
                <InputWithLabel
                  label="Titre du post"
                  type="text"
                  name="title"
                  placeholder="Titre 1"
                  :regex="/^.{5,}$/"
                  errorMsg="Le titre doit contenir au moins 5 caractères."
                  v-model="fields.title" />

                <TextAreaWithLabel
                  label="Contenu du post"
                  name="title"
                  placeholder="Lorem ipsum."
                  :regex="/^.{20,}$/"
                  errorMsg="Le titre doit contenir au moins 20 caractères."
                  v-model="fields.content" />

                <InputWithLabel
                  label="Lien de l'image"
                  type="text"
                  name="title"
                  placeholder="https://groupomania.leoblouin.fr/image.png"
                  :regex="
                    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
                  "
                  errorMsg="URL invalide."
                  v-model="fields.filename" />

                <PrimaryButton text="Ajouter" />
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
