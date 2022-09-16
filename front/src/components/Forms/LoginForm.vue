<script setup lang="ts">
import { reactive } from 'vue'
import AuthService from '@/services/auth.service'
import InputWithLabel from '@/components/shared/Form/InputWithLabel.vue'
import PrimaryButton from '@/components/shared/Buttons/PrimaryButton.vue'
import { successToast, errorToast } from '@/components/shared/Toasts/Toasts'
import router from '@/router'

const fields = reactive({
  email: '',
  password: '',
})

const onSubmitLoginForm = async () => {
  try {
    const authService = new AuthService()
    const res: any = await authService.login(fields.email, fields.password)
    sessionStorage.setItem('token', res.token)
    successToast('Vous êtes désormais connecté !')
    router.replace('/home')
  } catch (err) {
    errorToast('Adresse email ou mot de passe incorrect.')
  }
}
</script>

<template>
  <form class="flex flex-col space-y-8" @submit.prevent="onSubmitLoginForm">
    <InputWithLabel
      label="Adresse email"
      type="email"
      name="email"
      placeholder="john@doe.fr"
      :regex="
        /^(([^<>()[\]\\.,;:\s@&quot;]+(\.[^<>()[\]\\.,;:\s@&quot;]+)*)|(&quot;.+&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      "
      errorMsg="Adresse email invalide."
      v-model="fields.email" />

    <InputWithLabel
      label="Mot de passe"
      type="password"
      name="password"
      placeholder="*****"
      v-model="fields.password" />

    <PrimaryButton text="Se connecter" />

    <router-link to="/register">
      <p class="text-center hover:text-primary hover:underline">
        Pas encore de compte ? <br />
        Inscrivez-vous ici
      </p>
    </router-link>
  </form>
</template>
