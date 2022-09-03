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
    <ClosedTechnology v-if="!isOpened" :content="postParts[0]" />
    <OpenedTechnology v-else :content="postParts" />
    <div class="bottom">
      <button v-if="isAuth" class="deleteButton" @click="deletePostHandler">
        <SvgIcons type="delete" class="svg" />
      </button>
      <button v-if="isOpened" class="openButton" @click="setIsOpened(false)">Закрыть</button>
      <button v-else class="openButton" @click="setIsOpened(true)">Читать больше</button>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ClosedTechnology from './techCOmponents/closedTechnology.vue'
import OpenedTechnology from './techCOmponents/openedTechnology.vue'
import CheckPass from '../modalWindow/checkPass.vue'
import SvgIcons from '../common/svgIcons.vue'
import postMixin from '@/mixins/postMixin'
import { imageType } from '@/store/models/appTypes'

export default defineComponent({
  name: 'study-project-post',
  mixins: [postMixin],
  data: function () {
    return {
      postParts: [] as {
        image: imageType
        text: string
        step: number
      }[],
      isOpened: false
    }
  },
  methods: {
    setIsOpened: function (value: boolean) {
      if (value) {
        this.isOpened = value
      } else {
        this.isOpened = value
        const elTop = -this.$el.getBoundingClientRect().top
        const bodyTop = -document.body.getBoundingClientRect().top
        window.scrollTo({ left: 0, top: bodyTop - elTop - 50, behavior: 'smooth' })
      }
    }
  },
  mounted: function () {
    const textParts = this.content.text.split('\n\n')
    if (textParts.length !== this.content.images.length) {
      console.log('length mistake')
      this.postParts = []
    } else {
      textParts.forEach((item: string, index: number) => {
        this.postParts.push({ image: this.content.images[index], text: item, step: index + 1 })
      })
    }
  },
  components: { ClosedTechnology, OpenedTechnology, CheckPass, SvgIcons }
})
</script>
<style lang="scss">
@import './postStyles';
</style>
