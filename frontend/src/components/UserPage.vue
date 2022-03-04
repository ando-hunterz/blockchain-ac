<script setup>
import { ref } from "@vue/reactivity"
import { onBeforeMount } from "@vue/runtime-core";
import QRCode from 'qrcode'
import { useCrypto } from "../stores/crypto"
import UAParser from 'ua-parser-js'

const qr = ref("")

const crypto = useCrypto();

const generateQR = async text => {
  try {
    qr.value = await QRCode.toDataURL(text)
  } catch (err) {
    console.error(err)
  }
}

onBeforeMount(async () => {
  await generateQR(await crypto.signer.getAddress());
  const ua = UAParser()
  console.log(ua.os.name)
  if(ua.os.name == "Android") {
    console.log('ok')
  }
}
)


</script>

<template>
  <h1>user page</h1>
  <img :src="qr">
  <button @click="emitLog()">emit </button>
</template>

<style scoped></style>
