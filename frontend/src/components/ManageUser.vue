<script setup>
import { reactive } from "@vue/reactivity";
import { onBeforeMount } from "@vue/runtime-core";
import UAParser from "ua-parser-js";
import { useCrypto } from "../stores/crypto";
import { getJsonFile } from "../utils/ipfs";
import AddUser from "./AddUser.vue";
import UserDropdown from "./UserDropdown.vue";
import NavBar from "./NavBar.vue";
import { useNavigation } from "../stores/navigation";

const crypto = useCrypto();
const navigation = useNavigation();

const modals = reactive({
  addUser: false,
  isMobile: false,
});

const state = reactive({
  index: 0,
  count: 0,
  users: [],
  page: [],
});

const disableUser = async (address, index) => {
  try {
    navigation.setLoading();
    await crypto.contract.grantRole(
      import.meta.env.VITE_DISABLED_ROLE,
      address
    );
    state.users[index].disabled = true;
    navigation.clearLoading();
    navigation.addAlert({ message: "User disabled", type: "Success" });
  } catch (e) {
    navigation.clearLoading();
    navigation.addAlert({ message: e.message, type: "Error" });
  }
};

const enableUser = async (address, index) => {
  try {
    navigation.setLoading();
    await crypto.contract.revokeRole(
      import.meta.env.VITE_DISABLED_ROLE,
      address
    );
    state.users[index].disabled = false;
    navigation.clearLoading();
    navigation.addAlert({ message: "User enabled", type: "Success" });
  } catch (e) {
    navigation.clearLoading();
    navigation.addAlert({ message: e.message, type: "Error" });
  }
};

const getPage = async (index) => {
  state.count = (await crypto.contract.getUsers()).toNumber();
  let pageCount = 1;
  for (; index < state.count; index++) {
    if (index % 10 == 0) {
      state.page.push(pageCount);
      pageCount++;
    }
  }
};

const getUser = async (max) => {
  if (state.users.length >= state.count) return;
  if (max > state.count) max = state.count;
  console.log(max);
  for (let index = state.index; index < max; index++) {
    const address = await crypto.contract.getUser(index);
    console.log(index);
    const details = await crypto.contract.getUserInfo(address);
    console.log(await getJsonFile(details));
    state.users.push(await getJsonFile(details));
    state.users[index].address = address;
    state.users[index].disabled = await crypto.contract.hasRole(
      import.meta.env.VITE_DISABLED_ROLE,
      address
    );
    state.users[index].showDropdown = false;
  }
};

const changePage = async (page) => {
  state.index = page * 10;
  await getUser((page + 1) * 10);
};

const border = (index) => {
  if (index == 0) return { "rounded-l-md": true, "border-r": true };
  if (index == state.page.length - 1)
    return { "rounded-r-md": true, "border-l": true };
  return { "border-x": true };
};

onBeforeMount(async () => {
  const ua = UAParser();
  if (ua.os.name == "Android") {
    modals.isMobile = true;
  }
  navigation.setLoading();
  await getPage(0);
  await getUser(10);
  navigation.clearLoading();
});
</script>

<template>
  <nav-bar>
    <div class="w-full relative">
      <add-user
        v-if="modals.addUser"
        @user-modal-closed="modals.addUser = false"
      ></add-user>
      <button
        v-if="!modals.isMobile"
        @click="modals.addUser = true"
        class="bg-blue-400 px-4 py-1 rounded-md text-white"
      >
        Add User
      </button>
    </div>
    <div class="bg-white p-4 mt-4 rounded-md drop-shadow">
      <div class="mb-4 font-semibold text-xl">User List</div>
      <div v-if="state.users.length > 0">
        <div
          v-for="(user, index) in state.users.slice(
            state.index,
            state.index + 10
          )"
          :key="index"
          class="flex flex-col gap-4 mb-4"
        >
          <div class="flex flex-row">
            <div
              class="flex flex-col md:flex-row md:flex-auto"
              @click="user.showDropdown = !user.showDropdown"
            >
              <p class="w-full md:w-1/2 break-all">{{ user.address }}</p>
              <p>{{ user.name }}</p>
            </div>
            <button
              v-if="!user.disabled"
              @click="disableUser(user.address, index)"
              class="md:w-8"
            >
              🔐
            </button>
            <button
              v-else
              @click="enableUser(user.address, index)"
              class="md:w-8"
            >
              🔓
            </button>
          </div>
          <user-dropdown v-if="user.showDropdown" :user="user"></user-dropdown>
        </div>
      </div>
      <div v-else>No User Found</div>
    </div>
    <div class="flex flex-row mt-2">
      <div v-for="(page, index) in state.page" :key="index">
        <button
          :class="border(index)"
          class="bg-blue-400 px-2 text-white"
          @click="changePage(index)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </nav-bar>
</template>
