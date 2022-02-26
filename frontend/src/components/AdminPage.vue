<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";

const crypto = useCrypto();

 
</script>

<template>
  <h1>admin page</h1>
  <router-link to="/admin/user">Manage User</router-link>
  <!-- <router-link to="/admin/node">Manage Node</router-link> -->
</template>

<style scoped>

</style>
