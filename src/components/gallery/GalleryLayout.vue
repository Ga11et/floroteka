<template>
  <main class="container">
    <SidePathContainer path="Галерея" />
    <Pagination
      :itemCount="photos.length"
      :itemsInPage="9"
      :activeItem="activePage"
      @setActive="setActiveHandler"
    />
    <SuspenseConteiner v-if="!isGaleryLoaded" />
    <NotFoundthing v-else-if="photos.length === 0" />
    <div v-else class="galeryImages">
      <GalleryPhoto
        v-for="item in photos.slice(activePage * 9 - 9, activePage * 9)"
        :key="item.id"
        :content="item"
      />
    </div>
    <Pagination :itemCount="photos.length" :itemsInPage="9" :activeItem="activePage" @setActive="setActiveHandler" />
  </main>
</template>
<script lang='ts'>
import Vue from 'vue'
import SidePathContainer from '../sidePathContainer.vue'
import Pagination from '../secondary/pagination.vue'
import SuspenseConteiner from '../SuspenseConteiner.vue'
import NotFoundthing from '../common/notFoundthing.vue'
import store from '@/store'
import GalleryPhoto from './GalleryPhoto.vue'

export default Vue.extend({
  name: 'GalleryLayout',
  components: { SidePathContainer, Pagination, SuspenseConteiner, NotFoundthing, GalleryPhoto },
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
  },
  data () {
    return {
      activePage: 1
    }
  },
  methods: {
    setActiveHandler (newActive: number) {
      if (newActive !== 0 && newActive <= Math.ceil(this.photos.length / 9)) this.activePage = newActive
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.container {
  .galeryImages {
    width: 1280px;
    margin: 50px 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fit-content;
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
