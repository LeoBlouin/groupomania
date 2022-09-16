<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  label: String,
  type: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  placeholder: String,
  regex: RegExp,
  errorMsg: String,
  modelValue: String,
})

defineEmits(['update:modelValue', 'update:emailValidation'])

const isValid = ref<boolean>(true)

const checkField = () => {
  if (!props.regex || !props.modelValue) return
  isValid.value = props.regex.test(props.modelValue)
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <label :for="name">{{ label }}</label>
    <input
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      autocomplete="off"
      :class="`${
        isValid ? 'border-gray-200' : 'border-primary'
      } rounded-md border-2 px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring focus:ring-rose-200`"
      @keyup="checkField"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" />
    <small class="text-primary">{{ !isValid ? errorMsg : '' }}</small>
  </div>
</template>
