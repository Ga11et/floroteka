<template>
  <main class="plantInfoContainer">
    <SidePathContainer :path="plantInfo.name" />
    <SuspenseConteiner v-if="!plantsLoaded" />
    <div v-else class="contentContainer">
      <div class="top">
        <div class="headings">
          <h2 class="name">{{ plantInfo.name }}</h2>
          <h2 class="latinName">{{ plantInfo.latin }}</h2>
        </div>
        <div class="spans">
        </div>
      </div>
      <p class="description">
        {{ plantInfo.description }}
      </p>
      <div class="item">
        <h3>Дата посадки:</h3>
        <p>{{ plantInfo.date }}</p>
      </div>
      <div class="item">
        <h3>Возраст:</h3>
        <p>{{ plantInfo.age }}</p>
      </div>
      <div class="item">
        <h3>Царство:</h3>
        <p>{{ plantInfo.family }}</p>
      </div>
      <div class="item">
        <h3>Привезено из:</h3>
        <p>{{ plantInfo.from }}</p>
      </div>
      <div class="item">
        <h3>Районирование:</h3>
        <p>{{ plantInfo.livingPlace }}</p>
      </div>
      <div class="item">
        <h3>Присутствует для разведения:</h3>
        <p>{{ plantInfo.having ? 'Да' : 'Нет' }}</p>
      </div>
      <div class="photoContainer">
        <img v-for="image in plantInfo.img" class="image" :src="image" :alt="plantInfo.name"
          :key="plantInfo.img.indexOf(image)" />
      </div>
      <div class="recommendstionContainer">
        <h3 class="title">Также рекомендуем:</h3>
        <div class="reccomendations">
          <div class="reccomendation" v-for="plant in randomPlants" :key="plant.id" >
            <h4 class="heading">{{ plant.name }}</h4>
            <img @click.prevent="imageClickHandler(plant.id)" :src="plant.img[0]" :alt="plant.name" class="image" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue'
import SidePathContainer from '@/components/sidePathContainer.vue'
import store from '@/store'
import { plantPropsType } from '@/store/models'
import SuspenseConteiner from '@/components/SuspenseConteiner.vue'

export default Vue.extend({
  name: 'plant-info-container',
  components: { SidePathContainer, SuspenseConteiner },
  computed: {
    plantInfo () {
      return store.getters.activePlant as plantPropsType
    },
    randomPlants () {
      return store.getters.randomPlants(3) as plantPropsType[]
    },
    plantsLoaded () {
      return store.state.plantsLoaded
    }
  },
  mounted: async function () {
    if (!store.state.plantsLoaded) {
      store.dispatch('setPlants')
    }
  },
  methods: {
    imageClickHandler (plantId: string) {
      store.commit('setActivePlant', plantId)
      setTimeout(() => {
        this.$root.$emit('scroll')
      }, 300)
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.plantInfoContainer {
  @include flex(column, center, flex-start);

  .contentContainer {
    width: 1280px;
    @include flex(column, flex-start, flex-start);
    margin: 100px 0 0;

    .top {
      @include flex(row, center, space-between);

      .headings {
        .name {
          @include font(36px, 44px, 500);
        }
        .latinName {
          @include font(24px, 30px, 400);
          color: #000b;
        }
      }
    }

    .description {
      padding: 20px 0;
      @include font(16px, 20px, 500);
      text-align: justify;
    }

    .item {
      @include flex(row, center, flex-start);
      padding-bottom: 20px;

      h3 {
        @include font(24px, 30px, 500);
        padding-right: 20px;
      }

      p {
        @include font(24px, 30px, 400);
      }
    }

    .photoContainer {
      width: 100%;
      display: flex;
      flex-wrap: wrap;

      .image {
        display: block;
        object-fit: cover;
        min-width: 40%;
        height: 500px;
        margin: 0 20px 20px 0;

        &:nth-child(2n) {
          margin-right: 0;
        }
        &:nth-child(3n) {
          margin-bottom: 0;
        }
      }
    }
    .recommendstionContainer {
      width: 100%;
      padding: 50px 0;
      .title{
        @include font(36px, 46px, 500);
      }
      .reccomendations{
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 20px;
        .reccomendation{
          border: 1px solid transparent;
          border-radius: 14px;
          padding: 5px;
          transition: 600ms;
          .heading{
            @include font(28px, 38px, 500);
            padding-bottom: 10px
          }
          .image{
            display: block;
            width: 100%;
            height: 400px;
            object-fit: cover;
          }
          &:hover{
            cursor: pointer;
            border-color: black;
            transition: 600ms;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .plantInfoContainer{
    .contentContainer{
      width: 100%;
      padding: 0 50px;
    }
  }
}
@media screen and (max-width: 1000px) {
  .plantInfoContainer{
    .contentContainer{
      margin-top: 50px;
      .recommendstionContainer{
        .reccomendations{
          grid-template-columns: 1fr 1fr;
          .reccomendation{
            &:nth-child(3n){
              display: none;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .plantInfoContainer{
    .contentContainer{
      margin-top: 20px;
      padding: 0 20px;
      .top{
        .headings{
          .name{
            font-size: 30px;
          }
        }
      }
      .description{
        padding: 10px 0;
      }
      .item{
        padding-bottom: 10px;
        h3{
          font-size: 16px;
        }
        p{
          font-size: 18px;
        }
      }
      .photoContainer{
        .image{
          width: 100%;
          margin-right: 0;
        }
      }
      .recommendstionContainer{
        .title{
          font-size: 26px;
        }
        .reccomendations{
          grid-template-columns: 1fr;
          .reccomendation{
            .heading{
              font-size: 20px;
              padding-bottom: 5px;
            }
            .image{
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
