<template>
  <div class="baseInputText">
    <p class="text">{{ text }}</p>
    <base-checkbox :checked="value" :text="label" @change="checkboxHandler" />
    <base-error-span v-if="errorMessage" :message="errorMessage" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-checkbox-input',
  model: {
    event: 'change',
    prop: 'value',
  },
  props: {
    text: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    errorMessage: String,
  },
  methods: {
    checkboxHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('change', target.checked)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import './input.scss';
.baseInputText {
  .checkbox {
    @include font(20px, 30px, 500);
    @include flex(row, center, flex-start);
    .checkboxInput {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}
</style>
