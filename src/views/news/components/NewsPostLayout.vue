<template>
  <section class="postContainer">
    <transition name="fade">
      <CheckPass v-if="isModalOpen" :errorMessage="modalError" :submitCallback="submitModalhandler"
        @close="isModalOpen = false" />
    </transition>
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <p class="paragraph">{{ content.description }}</p>
    <slot></slot>
    <div class="bottom" v-if="isAuth">
      <button class="deleteButton" @click="deletePostHandler">
        <base-svg type="delete" class="svg" />
      </button>
    </div>
  </section>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import DeletePostMixin from '../mixins/DeletePostMixin'
import CheckPass from '@/components/modalWindow/checkPass.vue'

export default defineComponent({
  name: 'NewsPostLayout',
  mixins: [DeletePostMixin],
  components: { CheckPass }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
@import '@/animations';
.postContainer {
  margin: 0 0 100px;
  width: 1280px;
  @include flex(column, center, unset);
  .top {
    width: 100%;
    @include flex(row, flex-start, space-between);
    .heading {
      @include font(35px, 44px, 500);
      max-width: 70%;
    }
    .date {
      @include font(16px, 20px, 400);
      padding-top: 15px;
      color: #000000bb;
    }
  }
  .paragraph {
    width: 100%;
    text-align: justify;
    padding: 20px 0;
    @include font(16px, 20px, 500);
  }
  .bottom {
    @include flex(row, center, flex-end);
    width: 100%;
    .deleteButton {
      background-color: transparent;
      width: 80px;
      height: 80px;
      border: none;

      &:hover {
        cursor: pointer;
        .svg {
          fill: $mainRedHover;
          transition: 300ms;
        }
      }
      .svg {
        fill: $mainRed;
        width: 60px;
        height: 60px;
        transition: 300ms;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .postContainer {
    padding: 0 50px;
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .postContainer {
    margin: 50px 0;
  }
}

@media screen and (max-width: 750px) {
  .postContainer {
    padding: 0 20px;
    margin: 50px 0;
    .top {
      @include flex(column, flex-start, flex-start);
      .heading {
        @include font(28px, 38px, 500);
        padding-bottom: 10px;
        max-width: 100%;
      }
    }
  }
}
</style>
