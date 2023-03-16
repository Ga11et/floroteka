<template>
  <div class="noFormContainer">
    <h2>Добро пожаловать в админку</h2>
    <h2>Выберите нужную вам форму из предложенных выше для добавления новой записи</h2>
    <h2>Или воспользуйтесь инструментом снизу для администрирования уже существующих записей</h2>
    <AdminTable />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import AdminTable from './components/table/table.vue'

export default Vue.extend({
  name: 'no-form-container',
  components: { AdminTable },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.noFormContainer {
  margin: 50px 0 500px;
  width: 1280px;
  display: grid;
  gap: 20px;
  h2 {
    @include font(26px, 26px, 500);
  }
}
@media screen and (max-width: 1400px) {
  .noFormContainer {
    width: 100%;
    padding: 0 50px;
  }
}
@media screen and (max-width: 1000px) {
  .noFormContainer {
    h2 {
      font-size: 24px;
      line-height: 34px;
    }
  }
}
@media screen and (max-width: 750px) {
  .noFormContainer {
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>
