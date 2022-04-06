<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import NavBar from "./NavBar.vue";
const crypto = useCrypto();

const state = reactive({
  userCount: 0,
});

onBeforeMount(async () => {
  state.userCount = (await crypto.contract.getUsers()).toNumber();
});
</script>

<template>
  <nav-bar>
    <div class="bg-gray-100 grow px-6 pt-4">
      <div class="w-full h-1/3 bg-white py-2 px-4 rounded-md drop-shadow">
        <div class="text-lg font-semibold">Logs</div>
        Logs
      </div>
      <div class="w-full flex flex-row gap-6">
        <div
          class="bg-white w-full flex flex-col py-2 px-4 mt-6 rounded-md gap-3 drop-shadow "
        >
          <span class="text-lg font-semibold">Users</span>
          <span>👤 {{ state.userCount }}</span>
          <router-link to="/admin/user" class="text-right"
            >Manage User >></router-link
          >
        </div>
      </div>

      <!-- <router-link to="/admin/node">Manage Node</router-link> -->
    </div>
  </nav-bar>
</template>

<style scoped></style>
