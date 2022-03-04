<script setup>
import { onBeforeMount } from "@vue/runtime-core";
import { useCrypto } from "./stores/crypto";
import { removeCookies } from "./utils/cookies";
import { routeTo } from "./utils/router-helper";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const crypto = useCrypto();

if (window.ethereum) {
  window.ethereum.on("accountsChanged", (account) => {
    console.log(account);
    removeCookies("crypto");
    removeCookies("role");
    crypto.$patch({
      provider: null,
      signer: null,
      contract: null,
    });
    if (account.length < 1) removeCookies("crypto");
    routeTo("");
  });
}

window.addEventListener("beforeunload", () => {
  crypto.$patch({
    provider: null,
    signer: null,
    contract: null,
  });
});


</script>

<template>
  <router-view></router-view>
</template>
