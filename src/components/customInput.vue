<template>
  <div class="item">
    <p class="text">{{ text }}</p>
    <input v-if="type === 'normal'" :value="value" type="text" @input="inputHandler"
      class="input" />
    <textarea v-else-if="type === 'textarea'" :value="value" @input="inputHandler"
      class="input heightMore"></textarea>
    <label v-else-if="type === 'checkbox'" class="checkbox">
      <input :checked="value" @change="checkboxHandler" type="checkbox" class="checkboxInput" />
      Присутствует
    </label>
    <select v-else-if="type === 'select'" class="select input" :value="value" @change="inputHandler">
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
    <DropFileContainer v-else-if="type === 'photo'" :photo="value" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import DropFileContainer from './dropFileContainer.vue'

export default Vue.extend({
  name: 'cunsom-input',
  model: {
    event: 'change',
    prop: 'value'
  },
  props: ['text', 'type', 'value'],
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
        'Овощные культуры'
      ]
    }
  },
  components: { DropFileContainer },
  methods: {
    inputHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('change', target.value)
    },
    checkboxHandler: function (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('change', target.checked)
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.item {
  padding: 0 0 20px;

  .text {
    @include font(20px, 30px, 500);
    padding-bottom: 20px;
  }

  .input {
    width: 100%;
    height: 50px;
    @include font(20px, 30px, 500);
    padding: 0 20px;
  }

  .heightMore {
    height: 200px;
    padding: 20px;
    resize: none;
  }

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
