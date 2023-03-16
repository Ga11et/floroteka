<template>
  <label class="baseCheckbox">
    <span :class="['box', { checked: $props.checked }]"
      ><span class="check" v-if="$props.checked"><base-svg type="check" class="svg" /></span
    ></span>
    <input
      class="checkbox"
      type="checkbox"
      :checked="$props.checked"
      @change="$emit('change', $event)"
    />
    <p class="text">
      {{ $props.text }}
    </p>
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
  @include flex(row, center, flex-start);

  .checkbox {
    display: none;
  }
  .box {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 2px solid #0d2b15;
  }
  .box.checked {
    background-color: #0d2b15;

    .check {
      @include flex(row, center, center);
      .svg {
        width: 16px;
      }
    }
  }
}
</style>
