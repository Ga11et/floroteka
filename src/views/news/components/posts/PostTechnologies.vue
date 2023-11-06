<template>
  <NewsPostLayout :content="content">
    <template v-if="postParts[0]">
      <Transition name="fade" mode="out-in">
        <div v-if="!isOpened" class="post-technologies__last-step-wrapper">
          <div class="post-technologies__last-step">
            <BaseImage
              class="post-technologies__last-step-image"
              :image="postParts[postParts.length - 1].image"
              alt="Последний шаг"
              title="Последний шаг"
            />
          </div>
        </div>
        <!-- <PostPart v-if="!isOpened" :content="postParts[postParts.length - 1]" /> -->
        <OpenedPost v-else :content="postParts" />
      </Transition>
      <base-button v-if="isOpened" @click="setIsOpened(false)" content="Закрыть" />
      <base-button v-else @click="setIsOpened(true)" content="Показать больше" />
    </template>
  </NewsPostLayout>
</template>
<script lang="ts">
import { IOpenablePart, postPropsType } from '@/store/models/appTypes'
import { defineComponent, PropType } from 'vue'
import PostPart from './openable/PostPart.vue'
import OpenedPost from './openable/OpenedPost.vue'
import NewsPostLayout from '../NewsPostLayout.vue'
import BaseImage from '@/components/global/base/BaseImage.vue'

export default defineComponent({
  name: 'TechnologiesPostContent',
  props: {
    content: {
      type: Object as PropType<postPropsType>,
      required: true,
    },
  },
  data: function () {
    return {
      postParts: [] as IOpenablePart[],
      isOpened: false,
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
    },
  },
  mounted: function () {
    const textParts = this.content.text.split('\n\n')
    if (textParts.length !== this.content.images.length) {
      console.log('length mistake')
      this.postParts = []
    } else {
      textParts.forEach((item: string, index: number) => {
        this.postParts.push({
          image: this.content.images[index],
          text: item,
          step: index + 1,
          stepWord: 'шаг',
        })
      })
    }
  },
  components: { PostPart, OpenedPost, NewsPostLayout, BaseImage },
})
</script>
<style lang="scss" scoped>
@import '@/variables';

.post-technologies {
  &__last-step-wrapper {
    margin-bottom: 20px;
    width: 100%;

    @media screen and (min-width: 1024px) {
      align-self: flex-start;
      width: unset;
    }
  }

  &__last-step {
    position: relative;
    width: 100%;
    padding-top: 62%;
    align-self: flex-start;

    overflow: hidden;

    @media screen and (min-width: 1024px) {
      width: 500px;
    }
  }

  &__last-step-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
