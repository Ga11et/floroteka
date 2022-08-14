<template>
  <section class="postContainer">
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <p class="paragraph">{{ content.description }}</p>
    <div class="photoContainer">
      <div class="before">
        <h3>Было</h3>
        <SuspenseImage :imageUrl="content.before" alt="Было" />
      </div>
      <div class="after">
        <h3>Стало</h3>
        <SuspenseImage :imageUrl="content.after" alt="Стало" />
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import SuspenseImage from '../suspenseImage.vue'
export default Vue.extend({
  name: 'before-after-post',
  props: ['content'],
  components: { SuspenseImage }
})
</script>
<style lang="scss">
@import '@/variables';

.postContainer {
  margin: 100px 0 0;
  width: 1280px;
  @include flex(column, center, unset);

  .top {
    width: 100%;
    @include flex(row, center, space-between);

    .heading {
      @include font(35px, 44px, 500);
    }

    .date {
      @include font(16px, 20px, 400);
      color: #000000bb;
    }
  }

  .paragraph {
    width: 100%;
    text-align: justify;
    padding: 20px 0;
    @include font(16px, 20px, 500);
  }

  .photoContainer {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;

    .before,
    .after {
      h3 {
        @include font(24px, 30px, 500);
        padding-bottom: 10px;
      }

      img {
        display: block;
        width: 100%;
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
      }
    }

    .photoContainer {
      grid-template-columns: 1fr;

      .before,
      .after {
        h3 {
          @include font(20px, 30px, 500);
        }
      }
    }
  }
}
</style>
