<script setup lang="ts">
import { reactive } from 'vue'
import AuthService from '@/services/auth.service'
import InputWithLabel from '@/components/shared/Form/InputWithLabel.vue'
import PrimaryButton from '@/components/shared/Buttons/PrimaryButton.vue'
import { successToast, errorToast } from '@/components/shared/Toasts/Toasts'
import router from '@/router'

const fields = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const onSubmitLoginForm = async () => {
  try {
    const authService = new AuthService()
    const emailExists: any = await authService.checkIfEmailExists(fields.email)
    if (emailExists) return errorToast('Cette adresse email est déjà utilisée.')
  } catch {
    errorToast('Une erreur est survenue, veuillez réessayer.')
  }
  if (fields.password !== fields.passwordConfirmation) {
    return errorToast('Les mots de passe ne sont pas identiques.')
  }
  try {
    const authService = new AuthService()
    await authService.register(fields.firstname, fields.lastname, fields.email, fields.password)
    successToast('Votre inscription est réussie, vous pouvez désormais vous connecter !')
    router.replace('/login')
  } catch {
    errorToast(
      'Une erreur est survenue, veuillez vérifier que vous ayez rempli tous les champs du formulaire.',
    )
  }
}
</script>

<template>
  <form class="flex flex-col space-y-8" @submit.prevent="onSubmitLoginForm">
    <div class="flex space-x-5">
      <InputWithLabel
        label="Prénom"
        class="flex-1"
        type="text"
        name="firstname"
        placeholder="Léo"
        :regex="/^[A-Za-zéèëêôöâäàûüïî]{2}/"
        errorMsg="Votre prénom doit contenir au moins 2 lettres."
        v-model="fields.firstname" />

      <InputWithLabel
        label="Nom"
        class="flex-1"
        type="text"
        name="lastname"
        placeholder="BLOUIN"
        :regex="/^[A-Za-zéèëêôöâäàûüïî]{2}/"
        errorMsg="Votre nom doit contenir au moins 2 lettres."
        v-model="fields.lastname" />
    </div>

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

    <InputWithLabel
      label="Confirmation du mot de passe"
      type="password"
      name="passwordConfirmation"
      placeholder="*****"
      v-model="fields.passwordConfirmation" />

    <PrimaryButton text="Se connecter" />

    <router-link to="/login">
      <p class="text-center hover:text-primary hover:underline">
        Déjà un compte ? <br />
        Connectez-vous ici
      </p>
    </router-link>
  </form>
</template>
