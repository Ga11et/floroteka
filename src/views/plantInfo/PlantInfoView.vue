<template>
  <main class="plantInfoContainer" v-if="plantsLoaded">
    <side-path :path="plantInfo.name" />
    <PlantInfoContent :plantInfo="plantInfo" />
    <PlantInfoPhoto :content="plantInfo.img" :name="plantInfo.name" />
    <PlantInfoReccomendations />
  </main>
  <main v-else>
    <side-path :path="'Растение не загружено'" />
    <p>Простите, получить растение не получилось</p>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { plantPropsType } from '@/store/models/appTypes'
import PlantInfoContent from './components/plantInfoContent/PlantInfoContent.vue'
import PlantInfoPhoto from './components/PlantInfoPhoto.vue'
import PlantInfoReccomendations from './components/PlantInfoReccomendations.vue'

export default Vue.extend({
  name: 'plant-info-container',
  components: {
    PlantInfoContent,
    PlantInfoPhoto,
    PlantInfoReccomendations,
  },
  computed: {
    plantInfo() {
      return this.$store.getters.activePlant as plantPropsType
    },
    plantsLoaded() {
      return this.$store.getters.plantsLoaded
    },
  },
  mounted: async function () {
    if (!this.plantsLoaded) return this.$router.push('./')
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.plantInfoContainer {
  @include flex(column, center, flex-start);
}
</style>
