<template>
  <div class="suspenseContainer">
    <base-svg type="loading" class="svg" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminTableThingsFormLoading',
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.suspenseContainer {
  background-color: $backgroundLightRed;
  border: 1px solid black;
  min-height: 500px;
  .svg {
    width: 50px;
    height: 50px;
    margin: 20px;
  }
}
</style>
