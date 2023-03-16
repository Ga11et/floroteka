<template>
  <div class="photo">
    <p class="heading">Фотографии</p>
    <div class="container">
      <AdminTableThingsImageDropdown
        v-for="item in photos"
        :key="item.id"
        :photoId="item.id"
        @dropHandler="dropHandler"
        @delete="deleteHandler"
        :renderResult="item.renderResult"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AdminTableThingsImageDropdown from '../localInputs/imageDrop.vue'

export default defineComponent({
  name: 'admin-table-things-form-photos',
  props: {
    photos: {
      type: Array as PropType<{ id: string; renderResult: string }[]>,
      required: true,
    },
  },
  methods: {
    dropHandler(file: File, photoId: string) {
      console.log(file)
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const item = this.photos.find((el) => el.id === photoId)
          if (item) {
            item.renderResult = reader.result as string
            if (this.photos.length !== 3)
              this.photos.push({ id: String(Date.now()), renderResult: '' })
          }
        }
      }
    },
    deleteHandler(photoId: string) {
      console.log(photoId)
      const photo = this.photos.find((el) => el.id === photoId)
      if (photo?.renderResult === '') return
      if (this.photos[this.photos.length - 1].renderResult !== '') {
        this.$emit('change', [
          ...this.photos.filter((el) => el.id !== photoId),
          { id: String(Date.now()), renderResult: '' },
        ])
      } else {
        this.$emit(
          'change',
          this.photos.filter((el) => el.id !== photoId),
        )
      }
    },
  },
  components: { AdminTableThingsImageDropdown },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.photo {
  padding: 0 20px 20px;
  .heading {
    padding-bottom: 10px;
  }
  .container {
    display: flex;
    gap: 10px;
  }
}
</style>
