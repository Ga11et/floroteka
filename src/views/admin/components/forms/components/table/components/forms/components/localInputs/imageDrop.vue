<template>
  <div class="imageDropdown">
    <label
      :class="['container', { active: isActive }]"
      @dragenter.prevent="toggleActive(true)"
      @dragleave.prevent="toggleActive(false)"
      @dragover.prevent
      @drop.prevent="dropHandlerLocal($event)"
    >
      <p class="innerContent"><base-svg type="menuAnabled" class="svg" /></p>
      <input class="innerContent fileInput" @change="changeHandler" type="file" ref="file" />
      <img v-if="renderResult" :src="renderResult" alt="Dropped" class="background" />
      <span class="darkMask"></span>
    </label>
    <button class="deleteSvg" @click.prevent="$emit('delete', photoId)">
      <base-svg type="menuAnabled" />
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin-table-things-image-dropdown',
  imageId: String,
  data: function () {
    return {
      isActive: false,
      file: '',
    }
  },
  methods: {
    toggleActive(value: boolean) {
      this.isActive = value
    },
    dropHandlerLocal(event: DragEvent) {
      if (event.dataTransfer) {
        const file = event.dataTransfer.files[0]
        this.$emit('dropHandler', file, this.photoId)
      }
      this.toggleActive(false)
    },
    changeHandler(event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files) {
        const file = target.files[0] as File
        this.$emit('dropHandler', file, this.photoId)
      }
    },
  },
  props: {
    photoId: {
      type: String,
      required: true,
    },
    renderResult: String,
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.imageDropdown {
  background-color: #e6e6de;
  border: 1px solid black;
  width: 200px;
  height: 200px;
  position: relative;

  .container {
    display: inline-block;
    cursor: inherit;
    width: 100%;
    height: 100%;
    @include flex(column, center, center);

    .innerContent {
      z-index: 0;
      pointer-events: none;
      .svg {
        fill: black;
        width: 30px;
        transform: rotate(45deg);
      }
    }
    .fileInput {
      display: none;
    }
    .background {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }

    .darkMask {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0;
      z-index: 2;
    }
  }
  .deleteSvg {
    display: none;
    position: absolute;
    right: 5px;
    top: 5px;
    fill: $mainRed;
    z-index: 4;
    background-color: transparent;
    border: none;
    svg {
      width: 30px;
    }
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    cursor: pointer;
    .deleteSvg {
      display: block;
    }
    .container .darkMask {
      opacity: 0.5;
    }
  }
}
</style>
