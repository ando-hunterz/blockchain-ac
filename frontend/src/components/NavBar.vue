<script setup>
import { isAdmin } from "../utils/router-helper";
import { useNavigation } from "../stores/navigation";
import { onBeforeMount } from "@vue/runtime-core";
import { MenuIcon } from "@heroicons/vue/solid";

const navigation = useNavigation();

const state = {
  isAdmin: false,
};

const hideMenu = () => {
  return { hidden: navigation.sidebar };
};

onBeforeMount(async () => {
  state.isAdmin = await isAdmin();
});
</script>

<template>
  <div class="flex flex-col h-full min-h-screen">
    <div class="w-full h-10 bg-blue-400 shrink-0" id="navbar">
        <div
          v-if="navigation.sidebar"
          class="w-48 bg-blue-300 h-full text-center flex font-semibold flex-col justify-center text-white"
          @click="navigation.sidebar = false"
        >
          Close
        </div>
        <MenuIcon
          v-else
          class="h-full w-8 text-center text-white"
          @click="navigation.sidebar = true"
          >Close</MenuIcon
        >
    </div>
    <div class="flex flex-row grow relative">
        <div
          v-if="navigation.sidebar"
          id="sidebar"
          class="w-48 shrink-0 absolute md:relative md:z-0 z-10 bg-white left-0 h-full"
        >
          <div
            v-if="state.isAdmin"
            class="flex flex-col items-center gap-4 mt-4 font-semibold"
          >
            <router-link to="/admin" class="grid grid-cols-3 w-full">
              <span class="text-center">🏚</span>
              <span class="col-span-2">Dashboard</span>
            </router-link>
            <router-link to="/admin/user" class="grid grid-cols-3 w-full">
              <span class="text-center">👤</span>
              <span class="col-span-2">Manage User</span>
            </router-link>
            <div class="grid grid-cols-3 w-full" @click="loadingTest">
              <span class="text-center">📟</span>
              <span class="col-span-2">Manage Node</span>
            </div>
            <router-link to="/admin/log" class="grid grid-cols-3 w-full">
              <span class="text-center">📄</span>
              <span class="col-span-2">Show Logs</span>
            </router-link>
          </div>
        </div>
      <div class="bg-gray-100 px-6 py-4 overflow-visible overscroll-none grow">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
