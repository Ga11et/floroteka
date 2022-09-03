<template>
  <section class="postContainer">
    <transition name="fade">
      <CheckPass v-if="isModalOpen" :errorMessage="modalError" :submitCallback="submitModalhandler" @close="isModalOpen = false" />
    </transition>
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <div class="onePhotoContainer">
      <SuspenseImage class="images" :imageUrl="content.images[0]" alt="Научная активность" />
      <div>
        <p class="paragraph" v-for="(part, index) in content.description.split('\n')" :key="index">{{ part }}</p>
      </div>
    </div>
    <div class="bottom" v-if="isAuth">
      <button class="deleteButton" @click="deletePostHandler">
        <SvgIcons type="delete" class="svg" />
      </button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SuspenseImage from '../suspenseImage.vue'
import SvgIcons from '../common/svgIcons.vue'
import CheckPass from '../modalWindow/checkPass.vue'
import postMixin from '@/mixins/postMixin'

export default defineComponent({
  name: 'science-activity-post',
  mixins: [postMixin],
  components: { SuspenseImage, SvgIcons, CheckPass }
})
</script>
<style lang="scss">
@import './postStyles';
</style>
