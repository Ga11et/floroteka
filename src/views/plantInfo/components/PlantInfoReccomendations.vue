<template>
  <div class="reccomendationsCont">
    <h3 class="title">Также рекомендуем:</h3>
    <div class="reccomendations">
      <div class="reccomendation" v-for="plant in randomPlants" :key="plant.id">
        <h4 class="heading">{{ plant.name }}</h4>
        <img
          @click.prevent="imageClickHandler(plant.id)"
          :src="plant.img[0].small"
          :alt="plant.name"
          class="image"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'plant-info-reccomendations',
  computed: {
    randomPlants() {
      return this.$store.getters.randomPlants(3)
    },
  },
  methods: {
    imageClickHandler(plantId: string) {
      this.$store.commit('setActivePlant', plantId)
      setTimeout(() => this.$root.$emit('scroll'), 300)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
.reccomendationsCont {
  width: 1280px;
  padding: 50px 0;
  .title {
    @include font(36px, 46px, 500);
    padding-bottom: 10px;
  }
  .reccomendations {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;
    .reccomendation {
      border: 1px solid transparent;
      border-radius: 5px;
      padding: 0 10px 10px;
      transition: 600ms;
      .heading {
        @include font(28px, 38px, 500);
        padding-bottom: 10px;
      }
      .image {
        display: block;
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
      &:hover {
        cursor: pointer;
        border-color: black;
        transition: 600ms;
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .reccomendationsCont {
    width: 100%;
    padding: 0 50px;
  }
}
@media screen and (max-width: 1000px) {
  .reccomendationsCont {
    .reccomendations {
      grid-template-columns: 1fr 1fr;
      .reccomendation {
        &:nth-child(3n) {
          display: none;
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .reccomendationsCont {
    .title {
      font-size: 26px;
    }
    .reccomendations {
      grid-template-columns: 1fr;
      .reccomendation {
        .heading {
          font-size: 20px;
          padding-bottom: 5px;
        }
        .image {
          width: 100%;
        }
      }
    }
  }
}
</style>
