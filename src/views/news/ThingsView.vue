<template>
  <div class="things-view">
    <base-adaptive>
      <a class="things-view__link" href="https://vk.com/club213860874">Cсылка на группу "В контакте" 2022-2023 учебного года</a>
      <a class="things-view__link" href="https://vk.com/club222393784">Ссылка на группу "В контакте" 2023-2024 учебного года</a>
    </base-adaptive>

    <NewsLayout :posts="posts" name="Дела" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import store from '@/store'
import NewsLayout from './components/NewsLayout.vue'

export default Vue.extend({
  name: 'before-after-container',
  components: { NewsLayout },
  computed: {
    posts () {
      return store.getters.thingPosts
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.things-view {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__link {
    display: inline-block;
    margin-bottom: 24px;  
  
    font-size: 18px;
    text-decoration: none;
      color: black;

    transition: 300ms;

    @media screen and (min-width: 1024px) {
      font-size: 24px;
    }

    &:hover {
      color: $mainRed;
      text-decoration: underline;
    }
  }
}
</style>
