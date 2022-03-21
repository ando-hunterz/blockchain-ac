<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import { getImageFile, getJsonFile } from "../utils/ipfs";
import { connectLogContract } from "../utils/web3";
import NavBar from "./NavBar.vue";

const crypto = useCrypto();

const state = reactive({
  logCount: 0,
  logs: [],
});

const getLocaleDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("id-ID");
};

const showCapture = async (index) => {
  state.logs[index].capture = !state.logs[index].capture;
  if (state.logs[index].photo == undefined)
    state.logs[index].photo = await getImageFile(state.logs[index].uri.photo);
};

onBeforeMount(async () => {
  if (crypto.logContract == null) {
    await connectLogContract(crypto);
  }
  state.logCount = (await crypto.logContract.totalSupply()).toNumber();
  for (let index = state.logCount - 1; index >= 0; index--) {
    const owner = await crypto.logContract.ownerOf(index);
    const account = await crypto.contract.tokenOfOwnerByIndex(owner, 0);
    const accountURI = await crypto.contract.tokenURI(account);
    const jsonAccount = await getJsonFile(accountURI);
    const uri = await crypto.logContract.tokenURI(index);
    const jsonUri = await getJsonFile(uri);
    const log = {
      name: jsonAccount.name,
      address: owner,
      uri: jsonUri,
      capture: false,
    };
    console.log(log);
    state.logs.push(log);
  }
});
</script>

<template>
  <nav-bar>
    <div class="w-full bg-white rounded-md p-4">
      <span class="font-semibold text-xl">Logs</span>
      <div class="flex flex-col my-4">
        <div
          v-for="(log, index) in state.logs"
          :key="index"
          class="flex flex-col"
          @click="showCapture(index)"
        >
          <div class="flex flex-row justify-between">
            <span>{{ log.name }}</span>
            <span>{{ log.address }}</span>
            <span>{{ getLocaleDate(log.uri.time) }}</span>
          </div>
          <div v-if="log.capture" class="flex justify-center my-2">
            <img :src="log.photo" class="w-1/2" />
          </div>
        </div>
      </div>
    </div>
  </nav-bar>
</template>
