<template>
  <div class="head">
    <div
      v-for="item in ['Название', 'Описание', 'Тип', 'Дата']"
      :class="['th', { active: active === item, reversed: reversed }]"
      @click="sortOptionHandler(item)"
    >
      {{ item }}
      <base-svg type="dropdown" class="svg" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'admin-table-head',
  computed: {
    reversed() {
      return this.$store.getters.isPostsReversed
    },
    active() {
      return this.$store.getters.postsSortOption
    },
  },
  methods: {
    sortOptionHandler(value: string) {
      if (this.active === value) return this.$store.commit('setReversed')
      this.$store.commit('setReversed', false)
      this.$store.commit('setSortOption', value)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.head {
  background-color: black;
  height: 50px;
  display: grid;
  grid-template-columns: 330px 1fr 300px 150px;
  border: 1px solid black;
  gap: 1px;
  margin-right: 17px;
  .th {
    @include font(16px, 16px, 500);
    @include flex(row, center, flex-start);
    background-color: $secondaryGreen;
    padding-left: 20px;
    .svg {
      width: 18px;
      height: 18px;
      stroke: black;
      margin-left: 5px;
    }

    &:hover {
      cursor: pointer;
    }
  }
  .active {
    color: $primaryBlue;
    .svg {
      stroke: $primaryBlue;
    }
  }
  .active.reversed {
    svg {
      transform: rotate(180deg);
    }
  }
}
</style>
