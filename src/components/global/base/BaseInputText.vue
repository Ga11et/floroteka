<template>
  <div class="baseInputText">
    <p class="text">{{ text }}</p>
    <input :value="value" :type="type ? type : 'text'" @input="inputHandler" class="input" />
    <base-error-span v-if="errorMessage" :message="errorMessage" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'base-input-text',
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    text: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    errorMessage: String,
    type: String
  },
  methods: {
    inputHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('change', target.value)
    }
  }
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.baseInputText {
  padding: 0 0 20px;
  position: relative;
  .text {
    @include font(20px, 30px, 500);
    padding-bottom: 10px;
  }
  .input {
    width: 100%;
    height: 50px;
    @include font(20px, 30px, 500);
    padding: 0 20px;
  }
}
@media screen and (max-width: 1000px) {
  .item{
    padding-bottom: 10px;
    .text{
      font-size: 16px;
      padding-bottom: 5px;
    }
    .input{
      font-size: 16px;
      padding: 0 10px;
    }
  }
}
</style>
