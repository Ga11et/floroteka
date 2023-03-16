<template>
  <div class="baseInputText">
    <p class="text">{{ text }}</p>
    <label
      :class="['baseDropfileContainer', { active: isActive }]"
      @dragenter.prevent="toggleActive(true)"
      @dragleave.prevent="toggleActive(false)"
      @dragover.prevent
      @drop.prevent="dropHandlerLocal($event)"
    >
      <p class="innerContent">Перетащите сюда</p>
      <p class="innerContent">или</p>
      <p class="innerContent">Кликните</p>
      <input class="innerContent fileInput" @change="changeHandler" type="file" ref="file" />
      <img v-if="imageUrl" :src="imageUrl" alt="Dropped" class="background" />
    </label>
    <base-error-span v-if="errorMessage" :message="errorMessage" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-dropfile-container',
  data: function () {
    return {
      isActive: false,
      imageUrl: '',
      file: '',
    }
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    photoId: {
      type: String,
      required: true,
    },
    errorMessage: String,
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, id: string) => {
      if (id === this.photoId) this.imageUrl = value
    })
  },
  methods: {
    toggleActive: function (value: boolean) {
      this.isActive = value
    },
    dropHandlerLocal: function (event: DragEvent) {
      if (event.dataTransfer) {
        const file = event.dataTransfer.files[0]
        this.$root.$emit('dropHandler', file, this.photoId)
      }
      this.toggleActive(false)
    },
    changeHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files) {
        const file = target.files[0] as File
        this.$root.$emit('dropHandler', file, this.photoId)
      }
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import './input.scss';
.baseDropfileContainer {
  background-color: #8bab9415;
  border: 1px dotted #8bab94;
  width: 400px;
  height: 400px;
  @include flex(column, center, center);
  position: relative;

  &:hover {
    cursor: pointer;
    border-color: $mainVeryDarkGreen;
  }
  .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    opacity: 0.3;
  }
  .innerContent {
    z-index: 10;
  }
  .fileInput {
    display: none;
  }
  .test {
    z-index: 100;
    width: 100%;
  }
}
.active {
  background-color: #8bab94;
}
@media screen and (max-width: 1000px) {
  .baseDropfileContainer {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .baseDropfileContainer {
    height: 200px;
  }
}
</style>
