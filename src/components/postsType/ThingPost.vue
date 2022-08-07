<template>
  <section class="postContainer">
    <div class="top">
      <h2 class="heading">{{ content.heading }}</h2>
      <p class="date">{{ new Date(content.date).toLocaleDateString() }}</p>
    </div>
    <p class="paragraph">{{ content.describtion }}</p>
    <div class="thingPhotos">
      <h3>Фотографии:</h3>
      <div class="photos">
        <SuspenseImage v-for="photo in content.images" :imageUrl="photo" :key="photo" />
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

  .thingPhotos {
    width: 100%;

    .photos {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: 500px;
      grid-gap: 10px;

      img {
        display: block;
        width: 100%;
      }
    }

    h3 {
      @include font(24px, 30px, 500);
      padding-bottom: 10px;
    }
  }
}

@media screen and (max-width: 1200px) {
  .postContainer{
    .thingPhotos {
      .photos{
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .postContainer{
    .thingPhotos {
      .photos{
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
