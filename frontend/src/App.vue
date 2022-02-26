<script setup>
import { onBeforeMount } from "@vue/runtime-core";
import { useCrypto } from "./stores/crypto";
import { addCookies, removeCookies } from "./utils/cookies";
import { routeTo } from "./utils/router-helper";
import UserContract from './contracts/UserToken.sol/UserToken.json'; 
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const crypto = useCrypto();

window.addEventListener("beforeunload", () => {
  if (crypto.provider != null && crypto.signer != null)
    addCookies("crypto", true);
});

if (window.ethereum) {
  console.log("hi")
  window.ethereum.on("accountsChanged", (account) => {
    console.log(account)
    if(account.length < 1) removeCookies("crypto");
    routeTo('');
  });
}

onBeforeMount(() => {
  console.log(UserContract)
})
</script>

<template>
  <router-view></router-view>
</template>
