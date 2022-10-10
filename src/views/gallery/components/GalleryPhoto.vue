<template>
  <div class="galleryPhotoContainer">
    <base-image class="image" :image="$props.content.image" alt="Фото" :title="$props.content.lastModified" />
    <div class="actions" v-if="isAuth">
      <button class="btn" @click="deleteHandler">
        <base-svg type="delete" class="svg" />
      </button>
    </div>
  </div>
</template>
<script lang='ts'>
import { GaleryPhotoType } from '@/store/models/appTypes'
import Vue, { PropType } from 'vue'
export default Vue.extend({
  name: 'GalleryPhoto',
  props: {
    content: {
      type: Object as PropType<GaleryPhotoType>,
      required: true
    }
  },
  computed: {
    isAuth (): boolean {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    deleteHandler () {
      this.$store.dispatch('deleteGalleryPhoto', this.$props.content.id)
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.galleryPhotoContainer{
  .image{
    width: 100%;
    height: 400px;
  }
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
