<template>
  <nav class="adminViewNavigation">
    <transition name="formNavAnim" mode="out-in" appear>
      <component :is="active ? ArrowComponent : NavigationComponent"></component>
    </transition>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import Arrow from './arrow.vue'
import FormsNavigationContainer from './formsNavigationContainer.vue'

export default Vue.extend({
  name: 'admin-page-navigation',
  props: ['active'],
  data: function () {
    return {
      ArrowComponent: Arrow,
      NavigationComponent: FormsNavigationContainer,
    }
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/animations';
.adminViewNavigation {
  width: 1280px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  .active {
    transform: scale(1.1);
  }

  .navigationContainer {
    display: flex;
    flex-wrap: wrap;
  }
}
@media (max-width: 1400px) {
  .adminViewNavigation {
    width: 100%;
    padding: 0 50px;
  }
}
@media (max-width: 750px) {
  .adminViewNavigation {
    padding: 0 20px;
  }
}
</style>
