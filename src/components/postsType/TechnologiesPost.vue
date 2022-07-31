<template>
  <section class="technologiesContainer">
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ content.date }}</p>
    </div>
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
  name: 'technologies-post',
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

.technologiesContainer {
  margin: 100px 0 0;
  width: 1280px;
  @include flex(column, center, unset);
  position: relative;

  .openButton {
    padding: 15px 50px;
    background-color: $mainDarkGreen;
    border: 1px solid $mainVeryDarkGreen;
    @include font(16px, 24px, 500);
    position: absolute;
    right: 0;
    bottom: 0;
    &:hover{
      cursor: pointer;
    }
  }

  .top {
    width: 100%;
    @include flex(row, center, space-between);

    .heading {
      @include font(35px, 44px, 500);
      padding-bottom: 20px;
    }

    .date {
      @include font(16px, 20px, 400);
      color: #000000bb;
    }
  }

  .contentContainer {
    width: 100%;
    padding-bottom: 20px;

    &:last-child{
      padding-bottom: 0
    }

    .step {
      @include font(20px, 30px, 700);
    }

    .stepContainer {
      display: grid;
      grid-template-columns: 40% 1fr;
      grid-gap: 20px;

      .paragraph {
        text-align: justify;
        padding: 0;
        @include font(16px, 20px, 500);
      }

      .images {
        display: block;
        width: 100%;
        height: 350px;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .technologiesContainer {
    padding: 0 50px;
    width: 100%;
    .openButton{
      right: 50px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .technologiesContainer {
    margin: 50px 0;
    .contentContainer{
      .stepContainer{
        grid-template-columns: 50% 1fr;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .technologiesContainer {
    padding: 0 20px;
    margin: 50px 0;

    .openButton{
      position: relative;
      width: 100%;
      margin-top: 10px;
      right: 0;
    }

    .top {
      @include flex(column, flex-start, flex-start);

      .heading {
        @include font(28px, 38px, 500);
        padding-bottom: 10px;
      }

      .date {
        padding-bottom: 20px;
      }
    }

    .contentContainer {
      .stepContainer{
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
