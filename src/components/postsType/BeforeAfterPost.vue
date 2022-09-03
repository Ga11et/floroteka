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
    <div class="beforeAfterContainer">
      <div class="before">
        <h3>Было</h3>
        <SuspenseImage :imageUrl="content.before" alt="Было" />
      </div>
      <div class="after">
        <h3>Стало</h3>
        <SuspenseImage :imageUrl="content.after" alt="Стало" />
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
import postMixin from '../../mixins/postMixin'
import store from '@/store'

export default defineComponent({
  name: 'before-after-post',
  mixins: [postMixin],
  components: { SuspenseImage, SvgIcons, CheckPass },
  computed: {
    isAuth (): string {
      return store.getters.isAuth
    }
  }
})
</script>
<style lang="scss">
@import './postStyles';
</style>
