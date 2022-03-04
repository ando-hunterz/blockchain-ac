<script setup>
import { reactive,} from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import UAParser from "ua-parser-js";
import { useCrypto } from "../stores/crypto";
import { getImageFile, getJsonFile } from "../utils/ipfs";
import AddUser from "./AddUser.vue";
import UserDropdown from './UserDropdown.vue';
import UserDropzone from './UserDropzone.vue'

const crypto = useCrypto();

const modals = reactive({
  addUser: false,
  isMobile: false,
});

const state = reactive({
  index: 0,
  users: [],
})

const disableUser = async (address, index) => {
    try{
      await crypto.contract.grantRole(import.meta.env.VITE_DISABLED_ROLE, address);
      state.users[index].disabled = true;
    } catch (e) {
      console.log(e)
    }
}

const enableUser = async (address, index) => {
  try{
    await crypto.contract.revokeRole(import.meta.env.VITE_DISABLED_ROLE, address )
    state.users[index].disabled = false;
  } catch (e) {
      console.log(e)
  }
}


onBeforeMount(async () => {

  const ua = UAParser()
  if(ua.os.name == "Android") {
    modals.isMobile = true
  }
  const userCount = await crypto.contract.getUsers();
  
  for(;state.index < userCount; state.index++) {
    const address = await crypto.contract.getUser(state.index);
    const details = await crypto.contract.getUserInfo(address);
    state.users.push(await getJsonFile(details));
    state.users[state.index].address = address;
    state.users[state.index].disabled = await crypto.contract.hasRole(import.meta.env.VITE_DISABLED_ROLE, address);
    state.users[state.index].showDropdown = false
    state.index++;
    if(state.index % 5 == 0) break;
  }
})

</script>

<template>
  <h1>Manage User</h1>
  <button v-if="!modals.isMobile" @click="modals.addUser = true">Add User</button>
  <add-user
    v-if="modals.addUser"
    @user-modal-closed="modals.addUser = false"
  ></add-user>
  <div v-for="(user, index) in state.users">
    <div class="flex flex-row gap-4" @click="user.showDropdown = !user.showDropdown">
      <p>{{user.address}}</p>
      <p>{{user.name}}</p>  
    </div>
    <button v-if="!user.disabled" @click="disableUser(user.address, index)">🔐</button>
      <button v-else @click="enableUser(user.address, index)">🔓</button>
    <user-dropdown v-if="user.showDropdown" :user="user"></user-dropdown>
  </div>
  
</template>
