<template>
  <div class="content" v-if="plantInfo">
    <PlantInfoContentTop :plant-info="plantInfo" />
    <PlantInfoContentDescription :plant-info="plantInfo" />
    <PlantInfoContentItem :heading="'Фильтрация'" :text="plantInfo.type" />
    <PlantInfoContentItem :heading="'Дата посадки'" :text="plantInfo.date" />
    <PlantInfoContentItem :heading="'Царство'" :text="plantInfo.family" />
    <PlantInfoContentItem :heading="'Привезено из'" :text="plantInfo.from" />
    <PlantInfoContentItem :heading="'Районирование'" :text="plantInfo.livingPlace" />
    <PlantInfoContentItem
      :heading="'Доступно для приобретения'"
      :text="plantInfo.having ? 'Да' : 'Нет'"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IPlant } from '../../types/types'
import PlantInfoContentTop from './components/PlantInfoContentTop.vue'
import PlantInfoContentItem from './components/PlantInfoContentItem.vue'
import PlantInfoContentDescription from './components/PlantInfoContentDescription.vue'

export default defineComponent({
  name: 'plant-info-content',
  props: {
    plantInfo: {
      type: Object as PropType<IPlant>,
    },
  },
  components: { PlantInfoContentTop, PlantInfoContentItem, PlantInfoContentDescription },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.content {
  width: 1280px;
  @include flex(column, flex-start, flex-start);
  margin: 100px 0 0;
}
@media screen and (max-width: 1400px) {
  .content {
    width: 100%;
    padding: 0 50px;
  }
}
@media screen and (max-width: 1000px) {
  .content {
    margin-top: 50px;
  }
}
@media screen and (max-width: 750px) {
  .content {
    margin-top: 20px;
    padding: 0 20px;
  }
}
</style>
