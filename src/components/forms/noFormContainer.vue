<template>
  <div class="noFormContainer">
    <h2>Добро пожаловать в админку</h2>
    <h2>Выберите нужную вам форму из предложенных выше</h2>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'no-form-container'
})
</script>
<style lang="scss">
@import '@/variables';
.noFormContainer{
  margin: 50px 0 500px;
  width: 1280px;
  h2{
    @include font(32px, 44px, 500);
  }
}
@media screen and (max-width: 1400px) {
  .noFormContainer{
    width: 100%;
    padding: 0 50px;
  }
}
@media screen and (max-width: 1000px) {
  .noFormContainer{
    h2{
      font-size: 24px;
      line-height: 34px;
    }
  }
}
@media screen and (max-width: 750px) {
  .noFormContainer{
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>
