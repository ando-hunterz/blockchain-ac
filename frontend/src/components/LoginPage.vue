<script setup>
import { reactive } from "@vue/runtime-core";
import { connectToBlockchain } from "../utils/web3";
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
  <div
    class="grid md:grid-cols-8 md:grid-rows-6 grid-cols-6 grid-rows-6 h-screen bg-gray-100"
  >
    <img
      src="../assets/bg-landing.jpg"
      class="h-full w-full col-start-2 md:col-start-2 md:row-start-2 row-start-2 row-span-2 md:row-span-4 md:col-span-3 col-span-4 object-cover rounded-t-lg md:rounded-tr-none md:rounded-l-xl md:drop-shadow-md"
    />
    <div
      class="text-center md:col-start-5 md:row-start-2 row-span-2 md:row-span-4 md:col-span-3 col-span-4 row-start-4 col-start-2 flex flex-col justify-center items-center bg-white md:rounded-r-xl md:rounded-bl-none rounded-b-lg drop-shadow-md"
    >
      <h1 class="text-xl font-semibold mb-4">
        Blockchain Based Access Control
      </h1>
      <button
        v-if="state.provider"
        class="outline-none bg-blue-500 rounded-md px-4 py-2 text-white hover:bg-blue-700 transition"
        @click="connect"
      >
        Connect Metamask
      </button>

      <h2 v-else>⚠ No Wallet Provider found</h2>
    </div>
  </div>
</template>
4
