<template>
  <section class="postContainer">
    <transition name="fade">
      <CheckPass v-if="isModalOpen" :errorMessage="modalError" :submitCallback="submitModalhandler" @close="isModalOpen = false" />
    </transition>
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <p class="paragraph">{{ content.description }}</p>
    <div class="threePhotosContainer">
      <h3>Фотографии:</h3>
      <div :class="['photos', { three: content.images.length === 3 }]">
        <SuspenseImage v-for="photo in content.images" :imageUrl="photo" :key="photo.id" />
      </div>
    </div>
    <div class="bottom">
      <button class="deleteButton" @click="deletePostHandler">
        <SvgIcons type="delete" class="svg" />
      </button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SuspenseImage from '../suspenseImage.vue'
import CheckPass from '../modalWindow/checkPass.vue'
import SvgIcons from '../common/svgIcons.vue'
import postMixin from '@/mixins/postMixin'

export default defineComponent({
  name: 'before-after-post',
  mixins: [postMixin],
  components: { SuspenseImage, CheckPass, SvgIcons }
})
</script>
<style lang="scss">
@import './postStyles';
</style>
