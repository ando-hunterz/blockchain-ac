<script>
import { getImageFile } from '../utils/ipfs';
export default {
  name: "DropImages",
  props: {
    photos: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      isDragging: false,
      imageSources: [],
      immutableSources: []
    };
  },
  computed: {
    getClasses() {
      return { isDragging: this.isDragging };
    },
  },
  async beforeMount() {
    if(this.photos == null) return;
    console.log(this.photos.length)
    for(let i = 0; i < this.photos.length; i++){
      this.immutableSources.push(await getImageFile(this.photos[i]));
    }
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
      files.forEach((file) => {
        if (file.size > 3 * 10 ** 6) alert("file size exceeded");
      });
      let images = files.filter(
        (file) => file.type.indexOf("image/") >= 0 && file.size < 3 * 10 ** 6
      );
      let promises = [];
      images.forEach((file) => {
        promises.push(this.getBase64(file));
      });
      let sources = await Promise.all(promises);
      this.imageSources = this.imageSources.concat(sources);
      images.forEach(async (image) => {
        this.$emit("photo-added", image);
      });
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
      this.$emit("photo-deleted", index);
    },
  }
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
    <div v-for="(img, index) in imageSources" class="img">
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

    <div v-for="img in immutableSources" class="img">
      <img :src="img" />
    </div>

    <h1 v-if="imageSources.length == 0 && immutableSources.length == 0">Drop some images</h1>

    <div class="manual">
      <label for="uploadmyfile">
        <p>or pick from device</p>
      </label>
      <input
        id="uploadmyfile"
        type="file"
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
  width: 30%;
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
