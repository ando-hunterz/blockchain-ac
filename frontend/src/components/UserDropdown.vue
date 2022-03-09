<script setup>
import { keccak256 } from "@ethersproject/keccak256";
import { Wallet } from "@ethersproject/wallet";
import { onMounted, reactive, watch } from "@vue/runtime-core";
import { utils } from "ethers";
import { useCrypto } from "../stores/crypto";
import { makeJsonObject } from "../utils/file";
import { addFile, getJsonFile } from "../utils/ipfs";
import { alphaNumeric, nameValidation } from "../utils/validator";
import { createEnumUserHash, createUserHash } from "../utils/account";
import UserDropzone from "./UserDropzone.vue";
import { useNavigation } from "../stores/navigation";

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const crypto = useCrypto();
const navigation = useNavigation();

const getLastName = () => {
  console.log(props.user.name.split(" ")[1]);
  return props.user.name.split(" ")[1] == undefined
    ? null
    : props.user.name.split(" ")[1];
};

const getConcatedName = () => {
  return state.firstName + (state.lastName == null ? "" : " " + state.lastName);
};

const state = reactive({
  tokenId: null,
  firstName: props.user.name.split(" ")[0],
  lastName: getLastName(),
  nameString: createUserHash(props.user.name.split(" ")[0], getLastName()),
  photos: [],
});

const error = reactive({
  firstName: null,
  lastName: null,
  photos: null,
});

const updateUser = async () => {
  if (props.user.name === getConcatedName() && state.photos.length == 0) return;
  if (
    error.firstName != null ||
    error.lastName != null ||
    error.photos != null
  ) {
    return;
  }
  let photoUrl = props.user.photo;
  if (state.photos.length > 0) {
    for (let index = 0; index < state.photos.length; index++) {
      photoUrl.push(await addFile(state.photos[index]));
    }
  }
  if (
    state.firstName !== props.user.name.split(" ")[0] ||
    state.lastName !== getLastName()
  ) {
    if (state.lastName == null) {
      state.nameString = await createEnumUserHash(
        state.firstName,
        state.nameString,
        crypto
      );
    }
    const nameString = keccak256(utils.toUtf8Bytes(state.nameString));
    if (
      await crypto.contract.checkUser(
        keccak256(utils.toUtf8Bytes(state.nameString))
      )
    ) {
      navigation.addAlert({ message: "Name is taken", type: "Error" });
      return;
    }
    const oldString = keccak256(
      utils.toUtf8Bytes(props.user.name.toUpperCase().replace(" ", "_"))
    );
    navigation.setLoading();
    try {
      await crypto.contract.deleteMapping(oldString);
    } catch (e) {
      navigation.addAlert({ message: e.message, type: "Error" });
      return;
    }
    const jsonMetadata = {
      name: getConcatedName(),
      photo: photoUrl,
      keystore: props.user.keystore,
    };
    const jsonURI = new File(
      [makeJsonObject(jsonMetadata)],
      props.user.address + ".json"
    );
    const metadataURI = await addFile(jsonURI);
    try {
      await crypto.contract.updateUser(nameString, metadataURI, state.tokenId);
      navigation.clearLoading()
      navigation.addAlert({message: "User Updated", type: "Success"})
    } catch (e) {
      navigation.clearLoading()
      navigation.addAlert(e.message);
      return;
    }
  } else {
    navigation.setLoading();
    const jsonMetadata = {
      name: props.user.name,
      photo: photoUrl,
      keystore: props.user.keystore,
    };
    console.log(jsonMetadata);
    const jsonURI = new File(
      [makeJsonObject(jsonMetadata)],
      props.user.address + ".json"
    );
    try{
      const metadataURI = await addFile(jsonURI);
      await crypto.contract.updateUserMetadata(state.tokenId, metadataURI);
      navigation.clearLoading()
      navigation.addAlert({message: "User Updated", type: "Success"})
    } catch (e) {
      navigation.addAlert({message: e.message, type: "Error"})
    }
  }
};

const resetPassword = async () => {
  try {
    navigation.setLoading();
    const path = await crypto.contract.getDefaultKeystore(props.user.address);
    console.log(path);
    const jsonKeyStore = await getJsonFile(path);
    const keyFile = new File(
      [makeJsonObject(jsonKeyStore)],
      props.user.address + "-key.json"
    );
    const jsonKeystore = await addFile(keyFile);
    console.log(props.user.photos);
    const jsonMetadata = {
      name: getConcatedName(),
      photo: props.user.photo,
      keystore: jsonKeystore,
    };
    const jsonURI = new File(
      [makeJsonObject(jsonMetadata)],
      props.user.address + ".json"
    );
    const metadataURI = await addFile(jsonURI);
    console.log(metadataURI);
    await crypto.contract.updateUserMetadata(state.tokenId, metadataURI);
    navigation.clearLoading();
    navigation.addAlert({ message: "Reset Password Success", type: "Success" });
  } catch (e) {
    navigation.clearLoading();
    navigation.addAlert({ message: e.message, type: "Error" });
  }
};

const addPhoto = (image) => {
  console.log(image);
  state.photos.push(image);
};

const deletePhoto = (index) => {
  state.photos.splice(index, 1);
};

onMounted(async () => {
  state.tokenId = (
    await crypto.contract.tokenOfOwnerByIndex(props.user.address, 0)
  ).toNumber();
});

watch(
  () => state,
  (value) => {
    if (value.firstName != null) {
      error.firstName = nameValidation(value.firstName, "First name");
      state.nameString = createUserHash(value.firstName, value.lastName);
    }
    if (value.lastName != null)
      if (!alphaNumeric())
        error.lastName = "Last name column must be alphanumeric";
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col border rounded-b-md p-4 z-10 mt-2 gap-2">
    <label for="firstname">First Name</label>
    <input
      v-model="state.firstName"
      type="text"
      placeholder="firstname"
      class="border-2 rounded pl-2 focus:outline-none focus:border-gray-400"
    />
    <label for="lastName">Last Name</label>
    <input
      v-model="state.lastName"
      type="text"
      placeholder="lastname"
      class="border-2 rounded pl-2 focus:outline-none focus:border-gray-400"
    />
    <user-dropzone
      :photos="props.user.photo"
      @photo-added="addPhoto"
      @photo-deleted="deletePhoto"
    ></user-dropzone>
    <button
      @click="updateUser()"
      class="w-1/3 mx-auto bg-blue-500 rounded-md text-white mt-4"
    >
      Save
    </button>
    <button
      @click="resetPassword()"
      class="w-1/3 mx-auto bg-red-500 rounded-md text-white"
    >
      Reset Password
    </button>
  </div>
</template>
