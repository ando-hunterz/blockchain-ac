<script>
// import { ref } from "@vue/reactivity";
// import { computed } from "@vue/runtime-core";

// const isDragging = ref(false);
// const imageSources = ref([]);

// const getClasses = computed(() => {
//   return { isDragging: isDragging };
// });

// const dragOver = () => (isDragging = true);
// const dragLeave = () => (isDragging = true);

// const drop = async (e) => {
//   let files = [...e.dataTransfer.files];
//   let images = files.filter((file) => file.type.indexOf("image/") >= 0);
//   let promises = [];
//   images.forEach((file) => {
//     promises.push(getBase64(file));
//   });
//   let sources = await Promise.all(promises);
//   imageSources = imageSources.concat(sources);
//   isDragging = false;
// };

// const requestUploadFile = () => {
//   var src = this.$refs.uploadmyfile;
//   drop({ dataTransfer: src });
// };

// const getBase64 = (file) => {
//   const reader = new FileReader();
//   return new Promise((resolve) => {
//     reader.onload = (ev) => {
//       resolve(ev.target.result);
//     };
//     reader.readAsDataURL(file);
//   });
// };
export default {
  name: "DropImages",
  data() {
    return {
      isDragging: false,
      imageSources: [],
    };
  },
  computed: {
    getClasses() {
      return { isDragging: this.isDragging };
    },
  },
  methods: {
    dragOver() {
      this.isDragging = true;
    },
    dragLeave() {
      this.isDragging = false;
    },
    async drop(e) {
      let files = [...e.dataTransfer.files];
      let images = files.filter((file) => file.type.indexOf("image/") >= 0);
      let promises = [];
      images.forEach((file) => {
        promises.push(this.getBase64(file));
      });
      let sources = await Promise.all(promises);
      this.imageSources = this.imageSources.concat(sources);
      images.forEach((image) => {
          this.$emit("photo-added", image);
      })
      this.isDragging = false;
    },
    requestUploadFile() {
      var src = this.$el.querySelector("#uploadmyfile");
      this.drop({ dataTransfer: src });
    },
    getBase64(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (ev) => {
          resolve(ev.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    deletePhoto(index) {
        this.imageSources.splice(index, 1);
        this.$emit('photo-deleted', index)
    }
  },
};
</script>

<template>
  <div
    class="drop"
    :class="getClasses"
    @dragover.prevent="dragOver"
    @dragleave.prevent="dragLeave"
    @drop.prevent="drop($event)"
  >
    <div class="img" v-for="(img,index) in imageSources">
      <div class="relative">
        <p
          class="absolute right-0 -mr-2 -mt-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
          @click="deletePhoto(index)"
        >
          ❌
        </p>
        <img :src="img" />
      </div>
    </div>

    <h1 v-if="imageSources.length == 0">Drop some images</h1>

    <div class="manual">
      <label for="uploadmyfile">
        <p>or pick from device</p>
      </label>
      <input
        type="file"
        id="uploadmyfile"
        :accept="'image/*'"
        multiple
        @change="requestUploadFile"
      />
    </div>
  </div>
</template>

<style scoped>
.drop {
  width: 100%;
  height: 100%;
  background-color: #eee;
  border: 10px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out;
  font-family: sans-serif;
  overflow: hidden;
  position: relative;
}
.isDragging {
  background-color: #999;
}
.img {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
#img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.manual {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  font-size: 0.8rem;
  text-decoration: underline;
}
#uploadmyfile {
  display: none;
}
</style>
