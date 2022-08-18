<template>
  <main class="container">
    <SidePathContainer path="Галерея" />
    <SuspenseConteiner v-if="!isGaleryLoaded" />
    <NotFoundthing v-else-if="photos.length === 0" />
    <div v-else class="galeryImages">
      <SuspenseImage class="image" v-for="item in photos" :imageUrl="item.image" alt="galeryImage" :key="item.id" />
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'
import SuspenseImage from '@/components/suspenseImage.vue'
import NotFoundthing from '@/components/common/notFoundthing.vue'

export default Vue.extend({
  name: 'galery-container',
  components: { SuspenseConteiner, SidePathContainer, SuspenseImage, NotFoundthing },
  computed: {
    photos () {
      return store.getters.photos
    },
    isGaleryLoaded () {
      return store.getters.galeryLoaded
    }
  },
  mounted: async function () {
    if (!this.isGaleryLoaded) {
      store.dispatch('getGalery')
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.container {
  .galeryImages {
    width: 1280px;
    margin: 100px 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 400px;
    grid-gap: 5px;
  }
}

@media screen and (max-width: 1400px) {
  .container{
    .galeryImages{
      width: 100%;
      padding: 0 50px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .container{
    .galeryImages{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
@media screen and (max-width: 1000px) {
  .container{
    .galeryImages{
      grid-template-columns: 1fr 1fr;
      margin: 50px 0;
    }
  }
}
@media screen and (max-width: 750px) {
  .container{
    .galeryImages{
      grid-template-columns: 1fr;
      margin: 0;
      padding: 20px;
    }
  }
}
</style>
