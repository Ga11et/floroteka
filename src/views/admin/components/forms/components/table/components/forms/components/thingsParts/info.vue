<template>
  <div class="info">
    <base-input-text
      text="Заголовок"
      :value="heading"
      @change="headingHandler"
      class="item"
      size="small"
    />
    <base-textarea
      text="Описание"
      :value="description"
      @change="descriptionHandler"
      class="item"
      size="small"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin-table-things-form-info',
  props: {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  methods: {
    headingHandler(event: string) {
      this.$store.commit('setActivePostFormHeading', event)
    },
    descriptionHandler(event: string) {
      this.$store.commit('setActivePostFormDescription', event)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.info {
  display: grid;
  grid-template-columns: 330px 1fr;
  .item {
    padding: 20px;
  }
}
</style>
