<template>
  <div class="adaptiveContainer">
    <div class="pathContainer">
      <p class="path">{{ path }}</p>
      <div class="line"></div>
    </div>
  </div>

</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'side-path-component',
  props: ['path']
})
</script>
<style lang="scss">
@import '@/variables';

.adaptiveContainer {
  position: relative;
  width: 1280px;

  .pathContainer {
    @include flex(row, flex-end, flex-end);
    width: 500px;
    @include font(20px, 30px, 500);
    position: absolute;
    transform: rotate(-90deg);
    left: -293px;
    top: 339px;

    .path {
      padding-right: 10px;
    }

    .line {
      border-top: 1px solid black;
      height: 15px;
      width: 200px;
    }
  }
}

@media screen and (max-width: 1400px) {
  .adaptiveContainer {
    width: 100%;
    padding: 0 50px;

    .pathContainer {
      left: -226px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .adaptiveContainer {
    .pathContainer {
      top: 289px;
    }
  }
}

@media screen and (max-width: 750px) {
  .adaptiveContainer {
    .pathContainer {
      display: none;
    }
  }
}
</style>
