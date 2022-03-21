<script setup>
import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import { uploadPhotos } from "../utils/ipfs";
import UserDropzone from "./UserDropzone.vue";
import { alphaNumeric, nameValidation } from "../utils/validator";
import { Wallet } from "@ethersproject/wallet";
import { utils } from "ethers";
import { keccak256 } from "@ethersproject/keccak256";
import {
  createEnumUserHash,
  createKeystore,
  createMetadata,
  createUserHash,
} from "../utils/account";
import { downloadBlob } from "../utils/file";
import { useNavigation } from "../stores/navigation";

const crypto = useCrypto();
const navigation = useNavigation();

// eslint-disable-next-line no-undef
const emits = defineEmits(["user-modal-closed"]);

const form = reactive({
  firstName: null,
  lastName: null,
  email: null,
  photos: [],
  address: null,
  jsonFile: null,
  nameString: null,
});

const error = reactive({
  firstName: null,
  lastName: null,
  photos: null,
});

const pushPhoto = (file) => {
  form.photos.push(file);
};

const deletePhoto = (index) => {
  form.photos.splice(index, 1);
};

const closeModal = () => {
  console.log("close");
  emits("user-modal-closed");
};

watch(
  () => form,
  (value) => {
    if (value.firstName != null) {
      error.firstName = nameValidation(value.firstName, "First name");
      form.nameString = createUserHash(value.firstName, value.lastName);
    }
    if (value.lastName != null)
      if (!alphaNumeric)
        error.lastName = "Last name column must be alphanumeric";
  },
  { deep: true }
);

const saveUser = async () => {
  error.photos = form.photos.length < 3 ? "Photo is insufficient" : null;
  if (error.photos != null) {
    navigation.addAlert({ message: error.photos, type: "Error" });
  }
  try {
    if (
      error.firstName != null ||
      error.lastName != null ||
      error.photos != null
    ) {
      return;
    }
    const photoUrl = await uploadPhotos(form.photos);
    if (form.lastName == null) {
      form.nameString = await createEnumUserHash(
        form.firstName,
        form.nameString,
        crypto
      );
    }
    let name =
      form.firstName + (form.lastName == null ? "" : " " + form.lastName);
    if (
      await crypto.contract.checkUser(
        keccak256(utils.toUtf8Bytes(form.nameString))
      )
    ) {
      navigation.addAlert({ message: "Name Found", type: "Error" });
      return;
    }
    navigation.setLoading();
    const account = Wallet.createRandom();
    const password = keccak256(utils.toUtf8Bytes(form.nameString));
    const jsonKeyURI = await createKeystore(account, password);
    const metadataURI = await createMetadata(account, jsonKeyURI, {
      name: name,
      photoUrl: photoUrl,
    });
    const address = await crypto.signer.getAddress();
    const privateKey = new Blob([account.privateKey], {
      type: "text/plain",
    });
    downloadBlob(privateKey, account.address + ".txt");
    const tx = {
      from: address,
      to: account.address,
      value: utils.parseEther("0.5"),
    };
    await crypto.signer.sendTransaction(tx);
    await crypto.contract.safeMint(
      account.address,
      metadataURI,
      password,
      jsonKeyURI
    );
    navigation.clearLoading();
    emits("user-modal-closed");
  } catch (e) {
    navigation.clearLoading();
    navigation.addAlert({ message: e.message, type: "Error" });
    return;
  }
};
</script>

<template>
  <div
    class="bg-white rounded-md px-6 pt-6 py-8 absolute top-0 z-20 w-full drop-shadow"
  >
    <div class="flex flex-row">
      <span class="grow text-xl font-semibold">Create User</span>
      <span class="text-right" @click="closeModal">❌</span>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <label for="firstName">First Name</label>
      <input
        v-model="form.firstName"
        type="text"
        class="border-2 rounded pl-2 focus:outline-none focus:border-gray-400"
        placeholder="First Name..."
      />
      <div v-if="error.firstName != null" class="text-red-600">
        {{ error.firstName }}
      </div>
      <label for="firstName">Last Name</label>
      <input
        v-model="form.lastName"
        type="text"
        placeholder="Last Name.."
        class="border-2 rounded pl-2 focus:outline-none focus:border-gray-400"
      />
      <div v-if="error.lastName != null" class="text-red-600">
        {{ error.lastName }}
      </div>
      <user-dropzone
        @photo-added="pushPhoto"
        @photo-deleted="deletePhoto"
      ></user-dropzone>
    </div>
    <div class="text-center mt-4">
      <button
        @click="saveUser()"
        class="bg-blue-500 text-white rounded-md px-4 mx-auto py-1"
      >
        Save
      </button>
    </div>
  </div>
</template>
