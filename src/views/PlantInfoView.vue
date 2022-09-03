<template>
  <main class='plantInfoContainer' v-if="plantsLoaded">
    <transition name="fade">
      <CheckPass v-if="isModalOpen" :errorMessage="modalError" :submitCallback="submitModalhandler" />
    </transition>
    <transition name="fade">
      <UpdatePlant v-if="isUpdateModalOpen" :errorMessages="errorMessages" :submitCallback="submitUpdateHandler" :actualData="plantInfo" />
    </transition>
    <SidePathContainer :path="plantInfo.name" />
    <div class="contentContainer">
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
        <h3>Фильтрация:</h3>
        <p>{{ plantInfo.type }}</p>
      </div>
      <div class="item">
        <h3>Дата посадки:</h3>
        <p>{{ plantInfo.date }}</p>
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
        <h3>Доступно для приобретения:</h3>
        <p>{{ plantInfo.having ? 'Да' : 'Нет' }}</p>
      </div>
      <div v-if="isAuth" class="optionButtons">
        <button class="button" @click="updateHandler"><SvgIcons class="change" type="change" /></button>
        <button class="button" @click="deleteHandler"><SvgIcons class="delete" type="delete" /></button>
      </div>
      <div class="photoContainer">
        <SuspenseImage v-for="image in plantInfo.img" class="image" :imageUrl="image" :alt="plantInfo.name"
          :key="plantInfo.img.indexOf(image)" />
      </div>
      <div class="recommendstionContainer">
        <h3 class="title">Также рекомендуем:</h3>
        <div class="reccomendations">
          <div class="reccomendation" v-for="plant in randomPlants" :key="plant.id" >
            <h4 class="heading">{{ plant.name }}</h4>
            <img @click.prevent="imageClickHandler(plant.id)" :src="plant.img[0].small" :alt="plant.name" class="image" />
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
import SuspenseImage from '@/components/suspenseImage.vue'
import CheckPass from '@/components/modalWindow/checkPass.vue'
import router from '@/router'
import { plantPropsType } from '@/store/models/appTypes'
import UpdatePlant from '@/components/modalWindow/updatePlant.vue'
import { plantErrorMessages, plantFormType } from '@/store/models/formTypes'
import { formServises } from '../servises/formServises'
import SvgIcons from '@/components/common/svgIcons.vue'

export default Vue.extend({
  name: 'plant-info-container',
  components: { SidePathContainer, SuspenseImage, CheckPass, UpdatePlant, SvgIcons },
  computed: {
    plantInfo () {
      return store.getters.activePlant as plantPropsType
    },
    plantsLoaded () {
      return store.getters.plantsLoaded
    },
    isAuth () {
      return store.state.isAuth
    }
  },
  mounted: async function () {
    if (!this.plantsLoaded) return router.push('./')
    this.randomPlants = store.getters.randomPlants(3) as plantPropsType[]
    this.$root.$on('closeCheckPass', () => {
      this.isModalOpen = false
    })
    this.$root.$on('closeUpdateModal', () => {
      this.isUpdateModalOpen = false
    })
  },
  methods: {
    imageClickHandler (plantId: string) {
      store.commit('setActivePlant', plantId)
      setTimeout(() => {
        this.$root.$emit('scroll')
        this.randomPlants = store.getters.randomPlants(3) as plantPropsType[]
      }, 300)
    },
    deleteHandler () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
      setTimeout(() => {
        this.isModalOpen = true
        this.$root.$emit('disableScroll')
      }, 500)
    },
    updateHandler () {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
      setTimeout(() => {
        this.isUpdateModalOpen = true
        this.$root.$emit('disableScroll')
      }, 500)
    },
    async submitModalhandler (pass: string) {
      const response = await store.dispatch('deletePlant', { id: this.plantInfo.id, pass: pass })
      if (response === 'ok') {
        this.isModalOpen = false
        this.$root.$emit('ableScroll')
        setTimeout(() => {
          this.$root.$emit('scroll')
        }, 300)
      }
      this.modalError = response[0].msg
    },
    async submitUpdateHandler (data: plantFormType, password: string) {
      const response = await store.dispatch('updatePlant', { formData: data, pass: password, plantId: this.plantInfo.id })
      if (response === 'ok') {
        this.isUpdateModalOpen = false
        this.$root.$emit('ableScroll')
        this.$store.dispatch('setPlants')
        setTimeout(() => {
          this.$root.$emit('scroll')
        }, 600)
      } else {
        formServises.errorMapping(response, this.errorMessages)
      }
    }
  },
  data: function () {
    return {
      randomPlants: [] as plantPropsType[],
      isModalOpen: false,
      isUpdateModalOpen: false,
      modalError: '',
      errorMessages: {} as plantErrorMessages
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';
@import '@/app';

.plantInfoContainer {
  @include flex(column, center, flex-start);

  .contentContainer {
    width: 1280px;
    @include flex(column, flex-start, flex-start);
    margin: 100px 0 0;
    .optionButtons{
      @include flex(row, center, flex-end);
      padding-bottom: 20px;
      .button{
        border: none;
        background-color: transparent;
        width: 80px;
        height: 80px;
        svg{
          width: 100%;
          height: 100%;
        }
        .change{
          path{
            fill: $mainBlue;
          }
          &:hover{
            cursor: pointer;
            path{
              fill: $mainBlueHover;
            }
          }
        }
        .delete{
          path{
            fill: $mainRed;
          }
          &:hover{
            cursor: pointer;
            path{
              fill: $mainRedHover;
            }
          }
        }
      }
    }
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
      @include flex(row, flex-start, flex-start);
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
        display: inline-block;
        min-width: 30%;
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
      .optionButtons{
        right: 50px;
      }
    }
  }
}
@media screen and (max-width: 1000px) {
  .plantInfoContainer{
    .contentContainer{
      margin-top: 50px;

      .optionButtons{
        position: relative;
        width: 100%;
        right: 0;
        margin-bottom: 10px;
      }
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
      .optionButtons{
        padding-bottom: 0px;
      }
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
