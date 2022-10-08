<template>
  <div class="galleryPhotoContainer">
    <SuspenseImage :imageUrl="content.image" alt="Фото" :title="content.lastModified" />
    <div class="actions" v-if="isAuth">
      <button class="btn" @click="deleteHandler">
        <base-svg type="delete" class="svg" />
      </button>
    </div>
  </div>
</template>
<script lang='ts'>
import store from '@/store'
import { GaleryPhotoType } from '@/store/models/appTypes'
import Vue, { PropType } from 'vue'
import SuspenseImage from '../suspenseImage.vue'

export default Vue.extend({
  name: 'GalleryPhoto',
  components: { SuspenseImage },
  props: {
    content: {
      type: Object as PropType<GaleryPhotoType>,
      required: true
    }
  },
  computed: {
    isAuth () {
      return store.getters.isAuth
    }
  },
  methods: {
    deleteHandler () {
      store.dispatch('deleteGalleryPhoto', this.content.id)
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.galleryPhotoContainer{
  .actions{
    display: flex;
    justify-content: flex-end;
    border: 1px solid $mainGreen;
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 5px;
    .btn{
      background-color: transparent;
      border: none;
      padding: 0;
      .svg{
        width: 40px;
        height: 40px;
        fill: $mainRed;
      }
      &:hover{
        cursor: pointer;
        .svg{
          fill: $mainRedHover;
        }
      }
    }
  }
}
</style>
