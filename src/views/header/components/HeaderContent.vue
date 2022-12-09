<template>
  <div class="content">
    <h1 class="heading">Растения дендроучастка Сыктывкарского Лесного Института</h1>
    <p class="paragraph">Представляем наш проект, где вы можете увидеть разнообразие растений, высаженных на
      дендрологическом участке Сыктывкарского лесного института.</p>
    <form class="inputContainer" @submit.prevent="submitHandler">
      <input type="text" v-model="filterValue" placeholder="Попробуем найти что-то конкретное?" class="input" />
      <router-link class="link" @click.native="submitHandler" to="/">Что у нас есть</router-link>
    </form>
  </div>
</template>
<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  name: 'HeaderContent',
  data: function () {
    return {
      filterValue: ''
    }
  },
  methods: {
    submitHandler: function () {
      this.$store.commit('setPlantsFilterValue', this.filterValue)
      if (this.$route.path !== '/') this.$router.push('/')
      setTimeout(() => {
        this.$root.$emit('scroll')
      }, 300)
    }
  }
})
</script>
<style lang='scss' scoped>
@import '@/variables';
.content {
  @include flex(column, flex-start, center);
  width: 1280px;
  position: absolute;
  top: 30%;
  .heading {
    @include font(55px, 65px, 500);
    width: 820px;
  }
  .paragraph {
    @include font(20px, 34px, 500);
    width: 700px;
    padding: 20px 0 30px;
  }
  .inputContainer {
    height: 70px;
    @include flex(row, center, flex-start);
    .input {
      height: 100%;
      width: 500px;
      @include font(24px, 30px, 500);
      padding-left: 20px;
      border: 1px solid white;
      border-right: none;
      transition: 600ms;

      &::placeholder {
        color: $mainVeryDarkGreen;
      }

      &:focus {
        background-color: white;
        transition: 600ms;
      }
    }
    .link {
      @include font(18px, 28px, 500);
      @include flex(row, center, center);
      color: white;
      text-decoration: none;
      width: 200px;
      height: 100%;
      border: 1px solid $mainWhite;
      border-radius: 0 14px 14px 0;
      border-left: none;
      text-transform: uppercase;

      &:hover {
        cursor: pointer;
        background-color: $mainDarkGreenHover;
      }
    }
  }
}
@media screen and (max-width: 1400px) {
  .content {
    width: 100%;
    padding: 0 50px;
    .heading {
      @include font(45px, 55px, 500);
      width: 720px;
    }
    .paragraph {
      @include font(16px, 20px, 500);
      width: 600px;
      padding: 20px 0 30px;
    }
    .link {
      @include font(14px, 18px, 500);
      border: 1px solid $mainWhite;
      border-radius: 25px;
      text-transform: uppercase;

      &:hover {
        cursor: pointer;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .content {
    .heading {
      @include font(40px, 50px, 500);
    }
  }
}

@media screen and (max-width: 1000px) {
  .content {
    .heading {
      @include font(28px, 38px, 500);
      width: 600px;
    }
    .paragraph {
      @include font(14px, 24px, 500);
      width: 500px;
    }
    .inputContainer {
      height: 60px;
      .input {
        width: 450px;

        &::placeholder {
          @include font(20px, 32px, 500);
        }
      }
      .link {
        @include font(14px, 24px, 500);
        width: 160px;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .content {
    padding: 0 20px;
    @include flex(column, center, space-between);
    top: 27%;
    height: 63%;
    .heading {
      @include font(20px, 30px, 500);
      width: 80%;
      text-align: center;
    }
    .paragraph {
      display: none;
    }
    .inputContainer {
      flex-direction: column;
      margin-top: 10px;
      height: 100px;
      width: 100%;
      .input {
        border-right: 1px solid white;
        border-bottom: none;
        padding-left: 10px;
        padding-bottom: 7px;
        width: 100%;
        height: 50%;

        &::placeholder {
          font-size: 16px;
        }
      }
      .link {
        border-radius: 0 0 14px 14px;
        border-left: 1px solid white;
        border-top: none;
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>
