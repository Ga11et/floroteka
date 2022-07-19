<template>
    <div :class="['dropFileContainer', { active: isActive }]"
        @dragenter.prevent="toggleActive(true)"
        @dragleave.prevent="toggleActive(false)"
        @dragover.prevent
        @drop.prevent="dropHandlerLocal"
    >
        <p class="innerContent">Drop Here</p>
        <input class="innerContent fileInput" type="file" @change="putFile" />
        <img v-if="image" :src="image" alt="Dropped" class="background" />
    </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'drop-file-container',
  props: ['putFile', 'dropHandler', 'image'],
  data: function () {
    return {
      isActive: false
    }
  },
  methods: {
    toggleActive: function (value: boolean) {
      this.isActive = value
    },
    dropHandlerLocal: function (event: DragEvent) {
      this.toggleActive(false)
      this.dropHandler(event)
    }
  }
})
</script>
<style lang="scss">
    @import "@/variables";
    .dropFileContainer{
        background-color: #8BAB9415;
        border: 1px dotted #8BAB94;
        margin: 20px 0;
        width: 500px;
        height: 500px;
        @include flex(column, center, center);
        position: relative;
        .background{
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            position: absolute;
            z-index: 5;
            opacity: 0.3;
        }
        .innerContent{
            z-index: 10;
            pointer-events: none;
        }
        .fileInput{
            display: none;
        }
    }
    .active{
        background-color: #8BAB94;
    }
</style>
