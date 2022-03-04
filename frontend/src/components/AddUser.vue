<script setup>
import { reactive } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useCrypto } from "../stores/crypto";
import { addFile, uploadPhotos } from "../utils/ipfs";
import UserDropzone from "./UserDropzone.vue";
import { alphaNumeric, nameValidation } from "../utils/validator";
import { Wallet } from "@ethersproject/wallet";
import { utils } from "ethers";
import { keccak256 } from "@ethersproject/keccak256";
import { createEnumUserHash, createUserHash } from "../utils/web3";
import { downloadBlob, makeJsonObject } from "../utils/file";

const crypto = useCrypto();

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
  error.photos = form.photos.length < 1 ? "Photo is insufficient" : null;
  if (
    error.firstName != null ||
    error.lastName != null ||
    error.photos != null
  ) {
    return;
  }
  let photoUrl;
  for(const photo in form.photos) {
    photoUrl.push(await uploadPhotos(photo));
  }
  if (form.lastName == null) {
    form.nameString = await createEnumUserHash(
      form.firstName,
      form.nameString,
      crypto
    );
  }
  let name =
    form.firstName + (form.lastName == null ? "" : " " + form.lastName);
  const account = Wallet.createRandom();
  const password = keccak256(utils.toUtf8Bytes(form.nameString));
  const jsonKey = await account.encrypt(password);
  const JsonKeyStore = new File(
    [makeJsonObject(jsonKey)],
    account.address + "-key.json"
  );
  const jsonKeyURI = addFile(JsonKeyStore);
  const jsonMetadata = {
    name: name,
    photo: photoUrl,
    keystore: jsonKeyURI
  };
  const jsonURI = new File(
    [makeJsonObject(jsonMetadata)],
    account.address + ".json"
  );
  const metadataURI = await addFile(jsonURI);
  const address = await crypto.signer.getAddress();
  const privateKey = new Blob([account.privateKey], {
    type: "text/plain",
  })
  downloadBlob(privateKey, account.address+".txt")
  const tx = {
    from: address,
    to: account.address,
    value: utils.parseEther("0.001"),
  };
  await crypto.signer.sendTransaction(tx);
  try {
    await crypto.contract.safeMint(account.address, metadataURI, password);
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <h1>Create User</h1>
  <p @click="closeModal">❌</p>
  <div class="flex flex-col">
    <input v-model="form.firstName" type="text" placeholder="First Name..." />
    <div v-if="error.firstName != null">{{ error.firstName }}</div>
    <input v-model="form.lastName" type="text" placeholder="Last Name.." />
    <div v-if="error.lastName != null">{{ error.lastName }}</div>
    <user-dropzone
      @photo-added="pushPhoto"
      @photo-deleted="deletePhoto"
    ></user-dropzone>
    <button @click="saveUser()">save</button>
  </div>
</template>
