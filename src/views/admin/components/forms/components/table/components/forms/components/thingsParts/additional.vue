<template>
  <div class="additional">
    <p class="heading">Дополнительные параметры:</p>
    <base-checkbox :checked="isShowing" @change="$emit('toggle')" text="Показывать на сайте" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AdminTableThingsFormAdditional',
  props: {
    isShowing: {
      type: Boolean,
      required: true,
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.additional {
  padding: 0 20px 20px;
  .heading {
    padding-bottom: 10px;
  }
}
</style>
