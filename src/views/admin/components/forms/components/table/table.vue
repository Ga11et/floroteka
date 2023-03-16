<template>
  <div>
    <AdminTableHead />
    <AdminTableBody />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import AdminTableHead from './components/head.vue'
import AdminTableBody from './components/body.vue'

export default defineComponent({
  name: 'admin-table',
  computed: {
    posts() {
      return this.$store.getters.filteredPosts
    },
    isPostsLoaded() {
      return this.$store.getters.postsLoaded
    },
  },
  mounted: async function () {
    if (!this.isPostsLoaded) {
      this.$store.dispatch('setPosts')
    }
    this.$store.commit('setPostsFilterValue', '')
  },
  components: { AdminTableHead, AdminTableBody },
})
</script>
<style lang="scss" scoped></style>
