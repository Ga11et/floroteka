<template>
  <AdminTableThingsFormLoading v-if="isFormLoading || !activePost.images" />
  <form class="form" v-else>
    <AdminTableThingsFormInfo :description="activePost.description" :heading="activePost.heading" />
    <AdminTableThingsFormPhotos
      :photos="[
        ...activePost.images.map((el) => ({ id: el.id, renderResult: el.small })),
        { id: String(Date.now()), renderResult: '' },
      ]"
      @change="changePhotoHandler"
    />
    <AdminTableThingsFormAdditional
      :isShowing="activePost.shouldShow"
      @toggle="toggleShowingHandler"
    />
    <AdminTableFormButtons />
  </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AdminTableThingsImageDropdown from './components/localInputs/imageDrop.vue'
import AdminTableThingsFormInfo from './components/thingsParts/info.vue'
import AdminTableThingsFormPhotos from './components/thingsParts/photos.vue'
import AdminTableThingsFormAdditional from './components/thingsParts/additional.vue'
import AdminTableFormButtons from './components/thingsParts/buttons.vue'
import AdminTableThingsFormLoading from './components/thingsParts/suspense.vue'
import { IPost } from '../../types/fetchTypes'

export default defineComponent({
  name: 'admin-table-things-form',
  data() {
    return {
      formValues: {
        heading: '',
        description: '',
        photos: [{ id: '1', renderResult: '' }] as { id: string; renderResult: string }[],
        isShowing: false,
      },
    }
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  computed: {
    isFormLoading(): boolean {
      return this.$store.getters.formLoading
    },
    activePost(): IPost {
      return this.$store.getters.getActivePostFormValues
    },
  },
  components: {
    AdminTableThingsImageDropdown,
    AdminTableThingsFormInfo,
    AdminTableThingsFormPhotos,
    AdminTableThingsFormAdditional,
    AdminTableFormButtons,
    AdminTableThingsFormLoading,
  },
  methods: {
    changePhotoHandler(photos: { id: string; renderResult: string }[]) {
      this.formValues.photos = photos
    },
    toggleShowingHandler() {
      this.$store.commit('setActivePostFormShowing', !this.activePost.shouldShow)
    },
  },
  mounted() {
    this.$store.dispatch('getPostById', this.$props.postId)
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.form {
  background: $backgroundLightRed;
  border: 1px solid black;
}
</style>
