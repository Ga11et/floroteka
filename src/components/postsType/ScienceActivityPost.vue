<template>
  <section class="sciencePostConteiner">
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <div class="contentContainer">
      <img class="images" :src="content.images[0]" />
      <p class="paragraph">{{ content.description }}</p>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'science-activity-post',
  props: ['content']
})
</script>
<style lang="scss">
@import '@/variables';

.sciencePostConteiner {
  margin: 100px 0 0;
  width: 1280px;
  @include flex(column, center, unset);

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
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    .paragraph {
      text-align: justify;
      padding: 0;
      @include font(16px, 20px, 500);
    }
    .images {
      display: block;
      width: 100%;
    }
  }
}

@media screen and (max-width: 1400px) {
  .sciencePostConteiner {
    padding: 0 50px;
    width: 100%;
  }
}

@media screen and (max-width: 1000px) {
  .sciencePostConteiner {
    margin: 50px 0;
  }
}

@media screen and (max-width: 750px) {
  .sciencePostConteiner {
    padding: 0 20px;
    margin: 50px 0;

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
      grid-template-columns: 1fr;
    }
  }
}
</style>
