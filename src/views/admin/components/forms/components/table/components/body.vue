<template>
  <div class="body">
    <base-svg type="loading" v-if="!isLoaded" class="svg" />
    <AdminTableLine v-for="item in posts" :content="item.data" :key="item.id" :propsId="item.id" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AdminTableLine from './line.vue'

export default defineComponent({
  name: 'admin-table-body',
  computed: {
    posts() {
      return this.$store.getters.filteredPosts.map((el: any) => ({
        id: el.id,
        data: [el.heading, el.description, el.type, new Date(el.date).toLocaleDateString()],
      }))
    },
    isLoaded() {
      return this.$store.getters.postsLoaded
    },
  },
  components: { AdminTableLine },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.body {
  background-color: #4d4d4d;
  display: grid;
  gap: 1px;
  max-height: 612px;
  overflow-y: scroll;
  .svg {
    width: 50px;
    height: 50px;
    position: absolute;
  }
}
</style>
