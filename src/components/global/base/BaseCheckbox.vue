<template>
  <label class="baseCheckbox">
    <input
      class="checkbox"
      type="checkbox"
      :checked="$props.checked"
      @change="$emit('change', $event)"
    />
    {{ $props.text }}
  </label>
</template>
<script lang="ts">
export default {
  name: 'base-checkbox',
  props: {
    checked: Boolean,
    text: String,
  },
}
</script>
<style lang="scss" scoped>
@import '@/variables';
.baseCheckbox {
  @include font(16px, 24px, 400);
  @include flex(row, center, unset);

  .checkbox {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
}
</style>
