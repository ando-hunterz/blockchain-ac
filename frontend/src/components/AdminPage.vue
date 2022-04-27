<script setup>
import { onBeforeMount, reactive } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import { useNavigation } from "../stores/navigation";
import { getJsonFile } from "../utils/ipfs";
import { connectLogContract } from "../utils/web3";
import NavBar from "./NavBar.vue";
const crypto = useCrypto();
const navigation = useNavigation();

const state = reactive({
  userCount: 0,
  logs: [],
});

const getName = async (address) => {
  const account = await crypto.contract.tokenOfOwnerByIndex(address, 0);
  console.log(account);
  const accountURI = await crypto.contract.tokenURI(account);
  const jsonAccount = await getJsonFile(accountURI);
  return jsonAccount.name;
};

const bgColor = (status) => {
  const statusBg = {
    allowed: "bg-green-300",
    unallowed: "bg-red-400",
    timeout: "bg-red-400",
    wrong_face: "bg-red-400",
    disabled: "bg-yellow-400",
    QR_mismatch: "bg-red-400",
  };
  return statusBg[status];
};

onBeforeMount(async () => {
  navigation.setLoading();
  state.userCount = (await crypto.contract.getUsers()).toNumber();
  if (crypto.logContract == null) {
    await connectLogContract(crypto);
  }
  const logCount = await crypto.logContract.totalSupply();
  for (let i = logCount - 1; i >= logCount - 3; i--) {
    const owner = await crypto.logContract.ownerOf(i);
    const uri = await crypto.logContract.tokenURI(i);
    const jsonUri = await getJsonFile(uri);
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

const getLocaleDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("id-ID");
};
</script>

<template>
  <nav-bar>
    <div class="bg-gray-100 grow px-6 pt-4">
      <div class="w-full h-1/3 bg-white py-2 px-4 rounded-md drop-shadow">
        <div class="text-lg font-semibold">Logs</div>
        <div class="flex flex-col mt-4 mb-1 flex-wrap" v-if="state.logs.length > 0">
          <div
            v-for="(log, index) in state.logs"
            :key="index"
            class="flex flex-col flex-wrap"
          >
            <div
              class="flex flex-row flex-wrap justify-between my-2 rounded py-1 px-2"
              :class="bgColor(log.uri.type)"
            >
              <span>{{ log.name }}</span>
              <span>{{ log.address }}</span>
              <span>{{ getLocaleDate(log.uri.time) }}</span>
              <span>{{ log.uri.location }} </span>
            </div>
          </div>
        </div>
        <div class="text-right mb-2">
          <router-link to="/admin/log"
            >See Logs >></router-link
          >
        </div>
      </div>
      <div class="w-full flex flex-row gap-6">
        <div
          class="bg-white w-full flex flex-col py-2 px-4 mt-6 rounded-md gap-3 drop-shadow"
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
