<template>
  <div class="plant">
    <img class="image" :src="content.img" alt="plant" @load="loaded" />
    <span class="image span" v-if="!isLoaded" ></span>
    <div class="content">
      <h3 class="heading">{{ content.name }}</h3>
      <p class="paragraph">{{ content.description }}</p>
      <router-link class="link" to="/plant">Читать больше</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'plant-container',
  props: ['content'],
  data: function () {
    return {
      isLoaded: false
    }
  },
  methods: {
    loaded: function () {
      this.isLoaded = true
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.plant {
  position: relative;
  height: 100%;

  .image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .span{
    background-color: grey;
    position: absolute;
    top: 0;
    z-index: 5;
  }

  .content {
    width: 100%;
    min-height: 40%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    @include flex(column, flex-start, space-between);
    backdrop-filter: blur(6px);
    bottom: 0;
    color: white;
    padding: 15px 20px;
    z-index: 10;

    .heading {
      @include font(24px, 30px, 500);
    }

    .paragraph {
      @include font(16px, 20px, 400);
      margin: 10px 0 15px;
      color: #ffffffbb;
    }

    .link {
      display: inline-block;
      text-decoration: none;
      border: 1px solid #ffffffbb;
      color: #ffffffbb;
      @include font(16px, 20px, 500);
      padding: 9px 26px;
    }
  }

  &:hover {
    .content .link {
      color: white;
      border-color: white;
    }
  }
}
</style>
