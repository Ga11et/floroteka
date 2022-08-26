<template>
  <header class="header">
    <img src="../assets/headerPic1.jpg" alt="background picture" class="image" />
    <div class="top">
      ФлоротекаСЛИ
      <nav class="nav">
        <router-link class="link" @click.native="scrollHandler" to="/">Каталог</router-link>
        <router-link class="link" @click.native="scrollHandler" to="/news">Новости</router-link>
        <Dropdown :scrollHandler="scrollHandler" />
        <router-link class="link" @click.native="scrollHandler" to="/galery">Галерея</router-link>
        <router-link v-if="!isAuth" class="link" to="/login">Логин</router-link>
        <router-link v-if="isAuth" class="link" @click.native="scrollHandler" to="/admin">Админская</router-link>
      </nav>
      <MobileMenu class="mobileMenu" :scrollHandler="scrollHandler" />
    </div>
    <LoginView v-if="isLogin" />
    <transition name="content">
      <div v-if="!isLogin" class="content">
        <h1 class="heading">Растения дендроучастка Сыктывкарского Лесного Института</h1>
        <p class="paragraph">Представляем наш проект, где вы можете увидеть разнообразие растений, высаженных на
          дендрологическом участке Сыктывкарского лесного института.</p>
        <form class="inputContainer" @submit.prevent="submitHandler">
          <input type="text" v-model="filterValue" placeholder="Попробуем найти что-то конкретное?" class="input" />
          <router-link class="link" @click.native="submitHandler" to="/">Что у нас есть</router-link>
        </form>
      </div>
    </transition>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'
import MobileMenu from '@/components/MobileMenu.vue'
import Dropdown from '@/components/dropdownHeader.vue'
import router from '@/router'
import store from '@/store'
import LoginView from './loginView.vue'

export default Vue.extend({
  name: 'header-component',
  components: { MobileMenu, Dropdown, LoginView },
  data: function () {
    return {
      filterValue: ''
    }
  },
  methods: {
    scrollHandler: function () {
      setTimeout(() => {
        window.scroll({ left: 0, top: this.$el.clientHeight, behavior: 'smooth' })
      }, 300)
    },
    submitHandler: function () {
      store.commit('setPlantsFilterValue', this.filterValue)
      if (this.$route.path !== '/') router.push('/')
      setTimeout(() => {
        this.$root.$emit('scroll')
      }, 300)
    }
  },
  mounted: function () {
    this.$root.$on('scroll', () => window.scroll({ left: 0, top: this.$el.clientHeight, behavior: 'smooth' }))
    this.$root.$on('dropHandler', (file: File, photoId: string) => {
      console.log(file)
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          this.$root.$emit('renderResult', reader.result as string, photoId, file.name)
        }
      }
    })
  },
  computed: {
    isLogin () {
      return this.$route.path === '/login'
    },
    isAuth () {
      return store.state.isAuth
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';
.content-enter-active,
.content-leave-active {
  transition: opacity 600ms;
}

.content-enter,
.content-leave-to {
  opacity: 0;
}
.header {
  @include flex(column, center, unset);
  width: 100%;
  color: $mainWhite;
  position: relative;

  .image {
    display: block;
    width: 100%;
  }

  .top {
    @include flex(row, center, space-between);
    @include font(28px, 36px, 500);
    width: 1280px;
    padding-top: 35px;
    position: absolute;

    .nav {
      @include flex(row, center, space-between);
      width: 55%;

      .link {
        @include font(16px, 19px, 500);
        color: inherit;
        text-decoration: none;
        padding: 5px 20px;

        &:hover {
          text-decoration: underline;
        }
      }

      .router-link-exact-active {
        text-decoration: underline;
      }
    }

    .mobileMenu {
      display: none;
    }
  }

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
        &:focus{
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
}

@media screen and (max-width: 1400px) {
  .header {
    .top {
      width: 100%;
      padding: 35px 50px;
    }

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
}

@media screen and (max-width: 1200px) {
  .header {
    .top {
      .nav {
        width: 70%;
      }
    }

    .content {
      .heading {
        @include font(40px, 50px, 500);
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .header {
    .top {
      .nav {
        display: none;
      }

      .mobileMenu {
        display: flex;
      }
    }

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
}

@media screen and (max-width: 750px) {
  .header {
    .top {
      padding: 20px;
    }

    .image {
      height: 500px;
      width: 100%;
      object-fit: cover;
    }

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
        .input{
          border-right: 1px solid white;
          border-bottom: none;
          padding-left: 10px;
          padding-bottom: 7px;
          width: 100%;
          height: 50%;
          &::placeholder{
            font-size: 16px;
          }
        }
        .link{
          border-radius: 0 0 14px 14px;
          border-left: 1px solid white;
          border-top: none;
          width: 100%;
          height: 50%;
        }
      }
    }
  }
}
</style>
