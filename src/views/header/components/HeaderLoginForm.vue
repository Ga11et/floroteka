<template>
  <transition name="loginForm" appear>
    <div class="loginContainer">
      <form class="form">
        <base-input-text :errorMessage="errorMessages.login" v-model="data.login" text="Логин" />
        <base-input-text
          :errorMessage="errorMessages.pass"
          v-model="data.pass"
          text="Пароль"
          type="password"
        />
        <span class="originError" v-if="errorMessages.origin">
          {{ errorMessages.origin }}
        </span>
        <base-svg v-if="isLoading" type="loading" class="suspense" />
        <base-button
          :style="{ width: '100%' }"
          :disabled="isLoading"
          @click.prevent="submitHandler"
          content="Войти"
        />
      </form>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeaderLoginForm',
  data: function () {
    return {
      data: {
        login: '',
        pass: '',
      },
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.getLoginLoading
    },
    errorMessages() {
      return this.$store.getters.getLoginErrorMessages
    },
  },
  methods: {
    submitHandler: async function () {
      const isOk = await this.$store.dispatch('getAuth', this.data)
      if (isOk === 'ok') {
        this.$router.push('/admin')
        this.$root.$emit('scroll')
      }
    },
  },
})
</script>
<style lang="scss" scoped>
@import '@/variables';
@import '@/animations';
.loginContainer {
  position: absolute;
  top: 30%;
  background-color: #191f1a99;
  padding: 50px;
  z-index: 100;
  .form {
    position: relative;
    width: 350px;
    .originError {
      @include flex(row, center, center);
      border-radius: 10px;
      background-color: $mainRed;
      padding: 10px 20px;
      min-height: 50px;
      min-width: 200px;
      margin: 10px 0;
    }
    .suspense {
      height: 60px;
      width: 60px;
      margin: 0;
      position: absolute;
      top: -30px;
      right: 0;
    }
  }
}
@media screen and (max-width: 1200px) {
  .loginContainer {
    top: 20%;
    padding: 30px;
  }
}
@media screen and (max-width: 750px) {
  .loginContainer {
    width: 100%;
    .form {
      width: 100%;
    }
  }
}
</style>
