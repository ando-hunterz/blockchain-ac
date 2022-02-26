<script setup>
import { reactive } from "@vue/reactivity";
import AddUser from "./AddUser.vue";

const modals = reactive({
  addUser: false,
});
</script>

<template>
  <h1>Manage User</h1>
  <button @click="modals.addUser = true">Add User</button>
  <add-user
    v-if="modals.addUser"
    @user-modal-closed="modals.addUser = false"
  ></add-user>
</template>
