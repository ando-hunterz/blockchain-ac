<script setup>
import { onMounted, reactive, watch } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import { makeJsonObject } from "../utils/file";
import { addFile } from "../utils/ipfs";
import { alphaNumeric, nameValidation } from "../utils/validator";
import { createEnumUserHash, createUserHash } from "../utils/web3";
import UserDropzone from './UserDropzone.vue'

const props = defineProps({
  user: {
    type: Object,
    default: null,
  },
});

const crypto = useCrypto();

const getLastName = () => {
  props.user.name.split(" ")[1] == undefined
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
  console.log(getConcatedName());
  console.log(props.user.name === getConcatedName() && state.photos.length == 0);
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
    const jsonMetadata = {
      name: name,
      photo: photoUrl,
      keystore: props.user.keystore,
    };
    const jsonURI = new File(
      [makeJsonObject(jsonMetadata)],
      props.user.address.address + ".json"
    );
    const metadataURI = await addFile(jsonURI);
    await crypto.contract.updateUser(state.nameString, metadataURI, state.tokenId)
  } else {
    const jsonMetadata = {
      name: props.user.name,
      photo: photoUrl,
      keystore: props.user.keystore,
    };
    console.log(jsonMetadata)
    const jsonURI = new File(
      [makeJsonObject(jsonMetadata)],
      props.user.address + ".json"
    );
    const metadataURI = await addFile(jsonURI);
    await crypto.contract. updateUserMetadata(state.tokenId, metadataURI)
  }
};

const resetPassword = () => {
    console.log("reset");
}

const addPhoto = (image) => {
    console.log(image)
    state.photos.push(image)
}

const deletePhoto = (index) => {
    state.photos.splice(index, 1);
}

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
  <div class="flex flex-col">
    <label for="firstname">firstname</label>
    <input v-model="state.firstName" type="text" placeholder="firstname" />
    <label for="lastName">lastname</label>
    <input v-model="state.lastName" type="text" placeholder="lastname" />
    <user-dropzone :photos="props.user.photo" @photo-added="addPhoto" @photo-deleted="deletePhoto"></user-dropzone>
    <button @click="updateUser()">Save</button>
    <button @click="resetPassword()">Reset Password</button>
  </div>
</template>
