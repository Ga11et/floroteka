<template>
  <div class="navPart" @click="clickHandler">
    {{ content.rus }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'admin-view-nav-part',
  props: ['content'],
  methods: {
    clickHandler: function () {
      this.$root.$emit('changeForm', this.content.en)
      setTimeout(() => {
        this.$root.$emit('scroll')
      }, 300)
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.navPart {
  border: 1px solid $mainVeryDarkGreen;
  border-radius: 6px;
  padding: 25px 50px;
  margin: 20px 20px 0 0;
  transition: 600ms;
  background-color: $mainBackGreen;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: 600ms;
  }
}
@media screen and (max-width: 750px) {
  .navPart{
    width: 100%;
    margin: 0 0 10px 0;
  }
}
</style>
