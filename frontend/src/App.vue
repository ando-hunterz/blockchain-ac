<script setup>
import { useCrypto } from "./stores/crypto";
import { useNavigation } from "./stores/navigation";
import { removeCookies } from "./utils/cookies";
import { routeTo } from "./utils/router-helper";
import LoadingComponent from './components/LoadingComponent.vue'
import AlertComponent from './components/AlertComponent.vue'

const crypto = useCrypto();
const navigation = useNavigation();

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
} else {
  routeTo('404')
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
  <loading-component v-if="navigation.loading"></loading-component>
  <alert-component v-if="navigation.alert.show"></alert-component>
  <router-view></router-view>
</template>
