<template>
  <div :class="['baseInputText', { small: size === 'small' }]">
    <p class="text">{{ text }}</p>
    <textarea :value="value" @input="inputHandler" class="input heightMore"></textarea>
    <base-error-span v-if="errorMessage" :message="errorMessage" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-textarea',
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
.baseInputText {
  .input.heightMore {
    height: 200px;
    padding: 20px;
    resize: none;
    font-family: inherit;
  }
}
.small {
  font-size: 16px;
  .input.heightMore {
    height: 68px;
    padding: 3px 10px;
  }
}
</style>
