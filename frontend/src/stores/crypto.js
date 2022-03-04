import { defineStore } from "pinia";
import { ethers } from "ethers";
import { shallowReactive } from "vue";

export const useCrypto = defineStore("crypto", {
  state: () => {
    return shallowReactive({
      provider: null,
      signer: null,
      contract: null,
      role: null,
    });
  },
  persist: true,

  getters: {},

  actions: {},
});
