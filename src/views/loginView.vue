<template>
  <transition name="loginForm" appear>
    <div class="loginContainer">
      <form class="form">
        <CustomInput :errorMessage="error" v-model="data.login" text="Логин" type="normal" />
        <CustomInput v-model="data.pass" text="Пароль" type="normal" inputType="password" />
        <button class="submitButton" @click.prevent="submitHandler">Войти</button>
      </form>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import CustomInput from '@/components/customInput.vue'
import router from '@/router'

export default Vue.extend({
  name: 'login-view',
  components: { CustomInput },
  data: function () {
    return {
      data: {
        login: '',
        pass: ''
      },
      error: ''
    }
  },
  methods: {
    submitHandler: async function () {
      this.error = ''
      const resp = await this.$store.dispatch('getAuth', this.data)
      if (resp === 'ok') {
        router.push('/admin')
        this.$root.$emit('scroll')
      } else {
        this.error = resp.error
      }
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.loginForm-enter-active,
.loginForm-leave-active {
  transition: transform 600ms;
}

.loginForm-enter,
.loginForm-leave-to {
  transform: translateX(100vw);
}

.loginContainer {
  position: absolute;
  top: 30%;
  background-color: #191f1a99;
  padding: 50px;
  .form{
    .submitButton{
      background-color: $mainDarkGreen;
      border: none;
      @include font(18px, 30px, 500);
      width: 100%;
      height: 50px;
      margin-top: 10px;
      &:hover{
        cursor: pointer;
      }
      &:active{
        background-color: $mainVeryDarkGreen;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .loginContainer{
    top: 20%;
  }
}
@media screen and (max-width: 1200px) {
  .loginContainer{
    padding: 30px;
  }
}
</style>
