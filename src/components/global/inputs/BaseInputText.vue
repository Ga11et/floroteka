<template>
  <div :class="['baseInputText', { small: size === 'small' }]">
    <p class="text">{{ text }}</p>
    <input :value="value" :type="type ? type : 'text'" @input="inputHandler" class="input" />
    <base-error-span v-if="errorMessage" :message="errorMessage" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-input-text',
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
      type: String,
      required: true,
    },
    errorMessage: String,
    type: String,
    size: String,
  },
  methods: {
    inputHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('change', target.value)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import './input.scss';
.small {
  font-size: 16px;
  .input {
    height: 34px;
    padding-left: 10px;
  }
}
</style>
