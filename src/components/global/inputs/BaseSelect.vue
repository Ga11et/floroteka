<template>
  <div class="baseInputText">
    <p class="text">{{ text }}</p>
    <select class="select input" :value="value" @change="inputHandler">
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
    <base-error-span v-if="errorMessage" :message="errorMessage" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'base-select',
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
  },
  methods: {
    inputHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('change', target.value)
    },
  },
  data: function () {
    return {
      options: [
        'Деревья',
        'Декоративные кустарники',
        'Плодово-ягодные деревья и кустарники',
        'Ягодники',
        'Многолетние декоративные травянистые растения',
        'Однолетние декоративные травянистые растения',
        'Почвопокровные растения',
        'Декоративные объекты',
        'Комнатные растения',
        'Овощные культуры',
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import './input.scss';
</style>
