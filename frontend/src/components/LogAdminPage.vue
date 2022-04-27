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
  index: 0,
  totalPage: 0,
  logs: [],
  page: 1,
  logIndex: 0,
  itemsCount: 10,
  visitedPage: [1]
});

const changePage = async (page) => {
  console.log("change page");
  console.log('page: '+page)
  state.logIndex = (page - 1) * 10; // 10
  state.itemsCount = page * 10 // 30
  // 10 20 30 40 50
  // 30
  state.index = state.logCount - (page-1) * 10; 
  console.log(state.index)
  if(state.index < 0) state.index = state.index + 10
  if(state.logIndex > state.logs.length) state.logIndex = state.logs.length
  state.page = page;
  if(!state.visitedPage.includes(page)) state.visitedPage.push(page)
  if(state.logs.length < state.logCount) await getLog();
};

const getLog = async () => {
  navigation.setLoading();
  let logs = [];
  for (
    let index = state.index - 1; // 22
    index >= 0 && index >= state.logCount - state.page * 10; // 23 - 10 = 13
    index--
  ) {
    // console.log(index);
    const owner = await crypto.logContract.ownerOf(index);
    const uri = await crypto.logContract.tokenURI(index);
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
    logs.push(log);
  } 
  console.log(logs)
   if((state.visitedPage.filter((el) => el > state.page)).length < 1 || state.page == 1) {
     console.log('push')
     console.log(logs.length)
     state.logs.push(...logs);
   }
   else {
     const count = (state.visitedPage.filter((el) => el > state.page)).length
     state.logs.splice(state.logs.length - (count*10), 0, ...logs)
   }
   navigation.clearLoading();
};

const getLocaleDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleString("id-ID");
};

const showCapture = async (index) => {
  index = state.logIndex+index
  state.logs[index].capture = !state.logs[index].capture;
  if (state.logs[index].photo == undefined)
    state.logs[index].photo = await getImageFile(state.logs[index].uri.photo);
};

const bgColor = (status) => {
  const statusBg = {
    allowed: "bg-green-300",
    unallowed: "bg-red-400",
    timeout: "bg-red-400",
    wrong_face: "bg-red-400",
    disabled: "bg-yellow-400",
    QR_mismatch: "bg-red-400"
  };
  return statusBg[status];
};

const getName = async (address) => {
  const account = await crypto.contract.tokenOfOwnerByIndex(address, 0);
  console.log(account);
  const accountURI = await crypto.contract.tokenURI(account);
  const jsonAccount = await getJsonFile(accountURI);
  return jsonAccount.name;
};

const getReason = (type) => {
  const statusReason = {
    unallowed: "Unregistered",
    QR_mismatch: "QR is not recognized",
    timeout: "QR/Face not detected within 30s",
    wrong_face: "QR Code address and face mismatch",
    disabled: "User is disabled",
  };
  return statusReason[type];
}

onBeforeMount(async () => {
  if (crypto.logContract == null) {
    await connectLogContract(crypto);
  }
  
  state.logCount = state.index = (
    await crypto.logContract.totalSupply()
  ).toNumber();
  state.totalPage = Math.ceil(state.logCount / 10);
  console.log(state.page * 10);
  console.log(state.logCount - state.page * 10);
  await getLog();
  
});

</script>

<template>
  <nav-bar>
    <div class="w-full bg-white rounded-md p-4">
      <span class="font-semibold text-xl">Logs</span>
      <div class="flex flex-col my-4" v-if="state.logs.length > 0">
        <div
          v-for="(log, index) in state.logs.slice(
            state.logIndex,
            state.itemsCount
          )"
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
          <div v-if="log.capture" class="flex flex-col items-center my-2">
             <span v-if="log.uri.type != 'allowed'" class="mb-2" >Reason: {{ getReason(log.uri.type)}}</span>
            <img :src="log.photo" class="w-1/2" />
          </div>
        </div>
        <div class="flex flex-row mt-2">
          <div v-for="(page, index) in state.totalPage" :key="index">
            <button
              class="bg-blue-400 px-2 text-white"
              @click="changePage(page)"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="my-4">No Log Found</div>
    </div>
  </nav-bar>
</template>
