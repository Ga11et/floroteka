<template>
  <div class="">
    <div :class="['line', { active: $props.propsId === activeId }]" @click="lineClickHandler">
      <div v-for="text in $props.content" :key="String(text)" class="item">
        {{ text.length > 45 ? text.slice(0, 45) + '...' : text }}
      </div>
    </div>
    <AdminTableThingsForm
      v-if="$props.propsId === activeId && $props.content[2] === 'things'"
      :postId="activeId"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AdminTableThingsForm from './forms/things.vue'

export default defineComponent({
  name: 'admin-table-line',
  props: {
    content: {
      type: Array as PropType<string[]>,
      required: true,
    },
    propsId: {
      type: String,
      required: true,
    },
  },
  computed: {
    activeId(): string {
      return this.$store.getters.activeAdminPostId
    },
  },
  methods: {
    lineClickHandler() {
      this.$store.commit('setActivePostId', this.$props.propsId)
    },
  },
  components: { AdminTableThingsForm },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.line {
  background-color: #4d4d4d;
  height: 50px;
  display: grid;
  grid-template-columns: 330px 1fr 300px 150px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  gap: 1px;
  .item {
    @include font(16px, 16px, 500);
    @include flex(row, center, flex-start);
    background-color: $primaryGreen;
    padding-left: 20px;
  }

  &:hover {
    cursor: pointer;
  }
}
.active {
  .item {
    background-color: $backgroundRed;
  }
}
</style>
