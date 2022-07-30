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
      NavigationComponent: FormsNavigationContainer
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.formNavAnim-enter-active,
.formNavAnim-leave-active {
  transition: all 600ms;
}

.formNavAnim-enter,
.formNavAnim-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

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
@media screen and (max-width: 1400px) {
  .adminViewNavigation{
    width: 100%;
    padding: 0 50px;
  }
}
@media screen and (max-width: 7500px) {
  .adminViewNavigation{
    padding: 0 20px;
  }
}
</style>
