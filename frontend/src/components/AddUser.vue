<script setup>
import { reactive } from "@vue/reactivity";
import { useCrypto } from "../stores/crypto";
import UserDropzone from './UserDropzone.vue'

const crypto = useCrypto()

const emits = defineEmits(['user-modal-closed'])

const form = reactive({
  firstName: null,
  lastName: null,
  photos: [],
  address: null
})

const pushPhoto = (file) => {
  form.photos.push(file)
}

const deletePhoto = (index) => {
  form.photos.splice(index, 1)
}

const closeModal = () => {
    console.log('close')
    emits('user-modal-closed')
}

console.log(form)

</script>

<template>
<h1>Create User</h1>
<p @click="closeModal">❌</p>
<input type="text" v-model="form.firstName" placeholder="First Name...">
<input type="text" v-model="form.lastName" placeholder="Last Name..">
<user-dropzone @photo-added="pushPhoto" @photo-deleted="deletePhoto"></user-dropzone>
<button @click="saveUser()"></button>
</template>