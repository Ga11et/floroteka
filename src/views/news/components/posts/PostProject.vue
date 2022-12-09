<template>
  <NewsPostLayout :content="content">
    <template v-if="postParts[0]">
      <PostPart v-if="!isOpened" :content="postParts[0]" />
      <OpenedPost v-else :content="postParts" />
      <base-button v-if="isOpened" @click="setIsOpened(false)" content="Закрыть" />
      <base-button v-else @click="setIsOpened(true)" content="Показать больше" />
    </template>
  </NewsPostLayout>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IOpenablePart, postPropsType } from '@/store/models/appTypes'
import PostPart from './openable/PostPart.vue'
import OpenedPost from './openable/OpenedPost.vue'
import NewsPostLayout from '../NewsPostLayout.vue'

export default defineComponent({
  name: 'ProjectPostContent',
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true
    }
  },
  data: function () {
    return {
      postParts: [] as IOpenablePart[],
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
        this.postParts.push({ image: this.content.images[index], text: item, step: index + 1, stepWord: 'этап' })
      })
    }
  },
  components: { PostPart, OpenedPost, NewsPostLayout }
})
</script>
<style lang="scss" scoped>
</style>
