<template>
  <label :class="['dropFileContainer', { active: isActive }]" @dragenter.prevent="toggleActive(true)"
    @dragleave.prevent="toggleActive(false)" @dragover.prevent @drop.prevent="dropHandlerLocal($event)"
    >
    <p class="innerContent">Drop Here</p>
    <p class="innerContent">or</p>
    <p class="innerContent">Click</p>
    <input class="innerContent fileInput" @change="changeHandler" type="file" ref="file" />
    <img v-if="imageUrl" :src="imageUrl" alt="Dropped" class="background" />
  </label>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'drop-file-container',
  data: function () {
    return {
      isActive: false,
      imageUrl: '',
      file: ''
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string) => { this.imageUrl = value })
  },
  methods: {
    toggleActive: function (value: boolean) {
      this.isActive = value
    },
    dropHandlerLocal: function (event: DragEvent) {
      if (event.dataTransfer) {
        const file = event.dataTransfer.files[0]
        this.$root.$emit('dropHandler', file)
      }
      this.toggleActive(false)
    },
    changeHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      if (target.files) {
        const file = target.files[0] as File
        this.$root.$emit('dropHandler', file)
      }
    }
  }
})
</script>
<style lang="scss">
@import "@/variables";

.dropFileContainer {
  background-color: #8BAB9415;
  border: 1px dotted #8BAB94;
  width: 400px;
  height: 400px;
  @include flex(column, center, center);
  position: relative;

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
    // pointer-events: none;
  }

  .fileInput {
    display: none;
  }
  .test{
    z-index: 100;
    width: 100%;
  }
}

.active {
  background-color: #8BAB94;
}

@media screen and (max-width: 1000px) {
  .dropFileContainer {
    width: 100%;
  }
}
@media screen and (max-width: 750px) {
  .dropFileContainer {
    height: 200px;
  }
}
</style>
