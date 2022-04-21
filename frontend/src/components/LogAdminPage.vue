<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import { useNavigation } from "../stores/navigation";
import { getImageFile, getJsonFile } from "../utils/ipfs";
import { connectLogContract } from "../utils/web3";
import NavBar from "./NavBar.vue";

const crypto = useCrypto();
const navigation = useNavigation();

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

const bgColor = (status) => {
  return status == "allowed" ? "bg-green-300" : "bg-red-400";
};

const getName = async (address) => {
  const account = await crypto.contract.tokenOfOwnerByIndex(address, 0);
  console.log(account);
  const accountURI = await crypto.contract.tokenURI(account);
  const jsonAccount = await getJsonFile(accountURI);
  return jsonAccount.name;
};

onBeforeMount(async () => {
  if (crypto.logContract == null) {
    await connectLogContract(crypto);
  }
  navigation.setLoading();
  state.logCount = (await crypto.logContract.totalSupply()).toNumber();
  for (let index = state.logCount - 1; index >= 0; index--) {
    console.log(index);
    const owner = await crypto.logContract.ownerOf(index);
    const uri = await crypto.logContract.tokenURI(index);
    const jsonUri = await getJsonFile(uri);
    console.log(jsonUri);
    let address, name;
    if (owner != import.meta.env.VITE_NODE_ADDR) {
      name = await getName(owner);
    } else {
      address = JSON.parse(jsonUri).name;
      name =
        address != import.meta.env.VITE_NOACCOUNT_ADDR
          ? await getName(address)
          : "Unregistered";
    }
    const log = {
      name: name,
      address: owner,
      uri: JSON.parse(jsonUri),
      capture: false,
    };
    state.logs.push(log);
  }
  navigation.clearLoading();
});
</script>

<template>
  <nav-bar>
    <div class="w-full bg-white rounded-md p-4">
      <span class="font-semibold text-xl">Logs</span>
      <div class="flex flex-col my-4" v-if="state.logs.length > 0">
        <div
          v-for="(log, index) in state.logs"
          :key="index"
          class="flex flex-col"
          @click="showCapture(index)"
        >
          <div
            class="flex flex-row justify-between my-2 rounded py-1 px-2"
            :class="bgColor(log.uri.type)"
          >
            <span>{{ log.name }}</span>
            <span>{{ log.address }}</span>
            <span>{{ getLocaleDate(log.uri.time) }}</span>
            <span>{{ log.uri.location }} </span>
          </div>
          <div v-if="log.capture" class="flex justify-center my-2">
            <img :src="log.photo" class="w-1/2" />
          </div>
        </div>
      </div>
      <div v-else class="my-4">No Log Found</div>
    </div>
  </nav-bar>
</template>
