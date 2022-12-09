<template>
  <main class="galleryLayout">
    <side-path path="Галерея" />
    <base-pagination
      :itemCount="photos.length"
      :itemsInPage="9"
      :activeItem="activePage"
      @setActive="setActiveHandler"
    />
    <base-loading v-if="!isGaleryLoaded" />
    <found-nothing-placeholder v-else-if="photos.length === 0" />
    <div v-else class="galeryImages">
      <GalleryPhoto
        v-for="item in photos.slice(activePage * 9 - 9, activePage * 9)"
        :key="item.id"
        :content="item"
      />
    </div>
    <base-pagination
      :itemCount="photos.length"
      :itemsInPage="9"
      :activeItem="activePage"
      @setActive="setActiveHandler"
    />
  </main>
</template>
<script lang='ts'>
import Vue from 'vue'
import GalleryPhoto from './GalleryPhoto.vue'
export default Vue.extend({
  name: 'GalleryLayout',
  components: { GalleryPhoto },
  computed: {
    photos () {
      return this.$store.getters.photos
    },
    isGaleryLoaded () {
      return this.$store.getters.galeryLoaded
    }
  },
  mounted () {
    if (!this.isGaleryLoaded) {
      this.$store.dispatch('getGalery')
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
.galleryLayout {
  @include flex(column, center, unset);
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
  .galleryLayout{
    .galeryImages{
      width: 100%;
      padding: 0 50px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .galleryLayout{
    .galeryImages{
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
@media screen and (max-width: 1000px) {
  .galleryLayout{
    .galeryImages{
      grid-template-columns: 1fr 1fr;
      margin: 50px 0;
    }
  }
}
@media screen and (max-width: 750px) {
  .galleryLayout{
    .galeryImages{
      grid-template-columns: 1fr;
      margin: 0;
      padding: 20px;
    }
  }
}
</style>
