<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useCrypto } from "../stores/crypto";
import { hasAdminRole } from "../utils/router-helper";

const crypto = useCrypto()
const router = useRouter()

// onBeforeMount(async () => {
//   if(await hasAdminRole() == false) return router.push("/")
// })
 
</script>

<template>
  <h1>admin page</h1>
  <router-link to="/admin/user">Manage User</router-link>
  <!-- <router-link to="/admin/node">Manage Node</router-link> -->
</template>

<style scoped>

</style>
