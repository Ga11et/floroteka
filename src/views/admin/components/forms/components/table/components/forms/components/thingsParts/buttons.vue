<template>
  <div class="buttons">
    <base-button
      content="Сохранить изменения"
      size="small"
      color="accept"
      type="outlined"
      @click="acceptHandler"
    />
    <base-button content="В архив" size="small" color="info" type="empty" @click="archiveHandler" />
    <base-button content="Удалить" size="small" color="red" type="empty" @click="cancelHandler" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IPost } from '../../../../types/fetchTypes'

export default defineComponent({
  name: 'AdminTableFormButtons',
  methods: {
    acceptHandler() {
      this.$store.dispatch('postPostById', { postId: this.activePost.id, data: this.activePost })
    },
    archiveHandler() {
      alert('Кнопка пока не работает :(')
    },
    cancelHandler() {
      alert('Кнопка пока не работает :(')
    },
  },
  computed: {
    activePost(): IPost {
      return this.$store.getters.getActivePostFormValues
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.buttons {
  padding: 0 20px 20px;
  @include flex(row, center, flex-end);
  gap: 20px;
}
</style>
