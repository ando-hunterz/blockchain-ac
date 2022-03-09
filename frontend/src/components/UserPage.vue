<script setup>
import { reactive, ref } from "@vue/reactivity";
import QRCode from "qrcode";
import { useCrypto } from "../stores/crypto";
import { getJsonFile } from "../utils/ipfs";
import { Wallet } from "@ethersproject/wallet";
import { keccak256 } from "@ethersproject/keccak256";
import { utils } from "ethers";
import { createKeystore, createMetadata } from "../utils/account";
import NavBar from "./NavBar.vue";
import { onBeforeMount } from "@vue/runtime-core";
import { useNavigation } from "../stores/navigation";
import { EyeIcon } from "@heroicons/vue/solid";

const qr = ref(null);

const modal = reactive({
  keys: false,
  manage: false,
  changePassword: false,
});

const state = reactive({
  logged: false,
  account: null,
  password: null,
  changePassword: {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null,
  },
  visibility: {
    password: "password",
    oldPassword: "password",
    newPassword: "password",
    confirmPassword: "password",
  },
});

const crypto = useCrypto();
const navigation = useNavigation();

const generateQR = async (text) => {
  try {
    qr.value = await QRCode.toDataURL(text);
  } catch (err) {
    console.error(err);
  }
};

const getDetails = async () => {
  const details = await crypto.contract.getUserInfo(
    await crypto.signer.getAddress()
  );
  return await getJsonFile(details);
};

const getQr = async () => {
  navigation.setLoading();
  try {
    const keystore = await getJsonFile(state.account.keystore);
    const password = keccak256(utils.toUtf8Bytes(state.password));
    const wallet = await Wallet.fromEncryptedJson(keystore, password);
    await generateQR(wallet.publicKey + "-" + wallet.privateKey);
    state.logged = true;
    state.password = null;
    navigation.clearLoading();
  } catch (e) {
    navigation.addAlert({ message: e.message, type: "Error" });
    navigation.clearLoading();
  }
};

const changePassword = async () => {
  if (
    state.changePassword.newPassword != state.changePassword.confirmPassword
  ) {
    navigation.addAlert({ message: "Password not match", type: "Error" });
    return;
  }
  try {
    console.log(state.account.keystore);
    const keystore = await getJsonFile(state.account.keystore);
    const password = keccak256(
      utils.toUtf8Bytes(state.changePassword.oldPassword)
    );
    navigation.setLoading();
    const wallet = await Wallet.fromEncryptedJson(keystore, password);
    console.log(wallet);
    const keystoreURI = await createKeystore(
      wallet,
      keccak256(utils.toUtf8Bytes(state.changePassword.newPassword))
    );
    const metadataURI = await createMetadata(wallet, keystoreURI, {
      name: state.account.name,
      photoUrl: state.account.photo,
    });
    const tokenId = await crypto.contract.tokenOfOwnerByIndex(
      wallet.address,
      0
    );
    await crypto.contract.updatePassword(tokenId, metadataURI);
    navigation.clearLoading();
    navigation.addAlert({message: "Password Changed", type: "Success"})
    state.account = await getDetails();
  } catch (e) {
    navigation.addAlert({ message: e.message, type: "Error" });
    navigation.clearLoading();
  }
};

const resetKey = () => {
  state.logged = modal.keys = false;
  state.password = qr.value = null;
};

onBeforeMount(async () => {
  state.account = await getDetails();
});
</script>

<template>
  <nav-bar>
    <div
      class="w-full bg-white rounded-md text-xl text-center px-4 py-6 drop-shadow"
    >
      Welcome Back
      <span class="font-semibold">{{ state.account.name }}</span> 👋
    </div>
    <div class="flex flex-col my-4">
      <div v-if="modal.keys">
        <div v-if="state.logged" class="text-center">
          <img
            v-if="qr != null"
            :src="qr"
            class="mx-auto rounded-md drop-shadow md:w-1/2"
          />
          <p v-else>Please Login</p>
          <button
            class="bg-blue-500 w-1/3 text-white mx-auto mt-4 rounded-md drop-shadow py-1.5"
            @click="resetKey"
          >
            Close
          </button>
        </div>
        <div
          v-else
          class="bg-white w-full flex flex-col p-4 rounded-md drop-shadow"
        >
          <div class="w-full flex flex-col relative">
            <label class="text-lg font-semibold">Password</label>
            <span
              class="absolute inset-y-0 left-0 flex items-center z-10 mt-9 pl-2"
              @mousedown="state.visibility.password = 'text'"
              @mouseup="state.visibility.password = 'password'"
            >
              <EyeIcon class="h-6 text-gray-400"></EyeIcon>
            </span>
            <input
              v-model="state.password"
              :type="state.visibility.password"
              placeholder="Enter Password"
              class="border-2 rounded pl-10 focus:outline-none focus:border-gray-400 mt-2 py-1.5 relative"
            />
          </div>

          <div class="text-center w-full mt-4">
            <button
              @click="getQr"
              class="bg-blue-500 px-4 py-1.5 text-white rounded-md"
            >
              Get Key
            </button>
          </div>
        </div>
      </div>
      <div v-else class="w-full text-center">
        <button
          @click="modal.keys = !modal.keys"
          class="bg-blue-500 text-white rounded-md px-4 py-2 drop-shadow"
        >
          Get Private Key
        </button>
      </div>
      <div class="w-full text-center">
        <button
          @click="modal.manage = !modal.manage"
          class="bg-blue-400 text-white rounded-md drop-shadow mt-4 px-4 py-2"
        >
          Manage User
        </button>
      </div>
      <div v-if="modal.manage" class="w-full text-center">
        <button
          @click="modal.changePassword = !modal.changePassword"
          class="bg-blue-400 rounded-md drop-shadow mt-4 px-4 py-2 text-white"
        >
          Change Password
        </button>
        <div v-if="modal.changePassword" class="flex flex-col mt-4">
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 flex items-center z-10 mt-2 pl-2"
              @mousedown="state.visibility.oldPassword = 'text'"
              @mouseup="state.visibility.oldPassword = 'password'"
            >
              <EyeIcon class="h-6 text-gray-400"></EyeIcon>
            </span>
            <input
              v-model="state.changePassword.oldPassword"
              placeholder="Old Password"
              :type="state.visibility.oldPassword"
              class="border-2 rounded pl-10 focus:outline-none focus:border-gray-400 mt-2 py-1.5 w-full"
            />
          </div>
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 flex items-center z-10 mt-2 pl-2"
              @mousedown="state.visibility.newPassword = 'text'"
              @mouseup="state.visibility.newPassword = 'password'"
            >
              <EyeIcon class="h-6 text-gray-400"></EyeIcon>
            </span>
            <input
              v-model="state.changePassword.newPassword"
              placeholder="New Password"
              :type="state.visibility.newPassword"
              class="border-2 rounded pl-10 focus:outline-none focus:border-gray-400 mt-2 py-1.5 w-full"
            />
          </div>
          <div class="relative">
            <span
              class="absolute inset-y-0 left-0 flex items-center z-10 mt-2 pl-2"
              @mousedown="state.visibility.confirmPassword = 'text'"
              @mouseup="state.visibility.confirmPassword = 'password'"
            >
              <EyeIcon class="h-6 text-gray-400"></EyeIcon>
            </span>
            <input
              v-model="state.changePassword.confirmPassword"
              placeholder="Confirm password"
              :type="state.visibility.confirmPassword"
              class="border-2 rounded pl-10 focus:outline-none focus:border-gray-400 mt-2 py-1.5 w-full"
            />
          </div>
          <button
            @click="changePassword"
            class="mt-2 bg-blue-400 px-4 py-2 text-white"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  </nav-bar>
</template>

<style scoped></style>
