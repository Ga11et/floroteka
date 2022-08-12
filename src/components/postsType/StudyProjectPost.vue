<template>
  <section class="technologiesContainer">
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <p class="paragraph">{{ content.description }}</p>
    <ClosedTechnology v-if="!isOpened" :content="postParts[0]" >
      <button class="openButton" @click="setIsOpened(true)">Читать больше</button>
    </ClosedTechnology>
    <OpenedTechnology v-else :content="postParts" >
      <button v-if="isOpened" class="openButton" @click="setIsOpened(false)">Закрыть</button>
    </OpenedTechnology>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import ClosedTechnology from './techCOmponents/closedTechnology.vue'
import OpenedTechnology from './techCOmponents/openedTechnology.vue'

export default Vue.extend({
  name: 'study-project-post',
  props: ['content'],
  data: function () {
    return {
      postParts: [] as {
        image: string
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
  components: { ClosedTechnology, OpenedTechnology }
})
</script>
<style lang="scss">
@import '@/variables';
</style>
