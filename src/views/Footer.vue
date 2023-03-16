<template>
  <footer class="footer">
  <p class="content">Сивкова Елена Николаевна 2023</p>
  </footer>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'custom-footer',
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.footer {
  width: 100%;
  height: 100px;
  margin-top: 100px;
  @include flex(row, center, center);
  background-color: $mainDarkGreen;
  .content {
    @include font(20px, 30px, 500);
  }
}
@media screen and (max-width: 1000px) {
  .footer {
    margin-top: 50px;
  }
}
@media screen and (max-width: 750px) {
  .footer {
    margin-top: 50px;
    .content {
      @include font(14px, 24px, 500);
    }
  }
}
</style>
