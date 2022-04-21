<script setup lang="ts">
import InputWithLabel from "@/components/shared/Form/InputWithLabel.vue";
import PrimaryButton from "@/components/shared/Buttons/PrimaryButton.vue";
import { reactive } from "vue";
import { successToast } from "@/components/shared/Toasts/Toasts";

const fields = reactive({
  email: "",
  password: "",
});

const onSubmitLoginForm = () => {
  successToast("Vous êtes désormais connecté !");
};
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
      v-model="fields.email"
    />
    <InputWithLabel
      label="Mot de passe"
      type="password"
      name="password"
      placeholder="*****"
      v-model="fields.password"
    />
    <PrimaryButton text="Se connecter" />
  </form>
</template>
