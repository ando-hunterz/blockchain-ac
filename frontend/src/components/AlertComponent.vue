<script setup>
import { useNavigation } from "../stores/navigation";
import { XIcon } from '@heroicons/vue/solid'

const navigation = useNavigation();

const getMessageType = (message) => {
    if(message.type == 'Error') return {"bg-red-500": true, 'text-white': true}
    else if (message.type == 'Success') return {"bg-green-500": true, 'text-white': true}
    else return {"bg-yellow-500": true}
}
</script>

<template>
    <div class="fixed z-50 bottom-0 right-0 flex flex-col w-full md:w-1/3 mb-4 md:mr-4 px-4 gap-4">
        <div class="w-full p-4 rounded-md" :class="getMessageType(message)" v-for="(message, index) in navigation.alert.messages" :key="index">
            <div class="font-semibold text-lg flex flex-row">
                <span class="grow">{{message.type}}</span>
                <div @click="navigation.removeAlert(index)" class="cursor-pointer"><XIcon class="h-6"></XIcon></div>
            </div>
            <hr class="my-2">
            <div>{{message.message}}</div>
        </div>
    </div>
</template>
