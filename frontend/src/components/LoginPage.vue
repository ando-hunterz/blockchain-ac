<script setup>
// import { ref } from 'vue'
import { onBeforeMount, reactive } from "@vue/runtime-core";
import {
  checkForProvider,
  connectProvider,
  connectToBlockchain,
} from "../utils/web3";
import { useCrypto } from "../stores/crypto";
import { baseRouteTo } from "../utils/router-helper";

const crypto = useCrypto();

const state = reactive({
  provider: true,
});

const connect = async () => {
  try {
    await connectToBlockchain(crypto);
    await baseRouteTo();
  } catch (e) {
    window.alert(e);
  }
};
</script>

<template>
  <div class="text-center flex-col flex items-center justify-center h-screen">
    <h1 class="text-xl font-semibold mb-4">Blockchain Based Access Control</h1>
    <button
      v-if="state.provider"
      class="outline-none bg-blue-500 rounded-md px-4 py-2 text-white hover:bg-blue-700 transition"
      @click="connect"
    >
      Connect Metamask
    </button>

    <h2 v-else>⚠ No Wallet Provider found</h2>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
