<template>
  <transition name="loginForm" appear>
    <div class="loginContainer">
      <form class="form">
        <base-input-text :errorMessage="errorMessages.login" v-model="data.login" text="Логин" type="normal" />
        <base-input-text :errorMessage="errorMessages.pass" v-model="data.pass" text="Пароль" type="normal"
          inputType="password" />
        <span class="originError" v-if="error">
          {{ error }}
        </span>
        <base-svg v-if="sumbitLoading" type="loading" class="suspense" />
        <base-button :style="{ width: '100%' }" :disabled="sumbitLoading" @click.prevent="submitHandler" content="Войти" />
      </form>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import { loginErrorMessages } from '@/store/models/formTypes'

export default Vue.extend({
  name: 'HeaderLoginForm',
  data: function () {
    return {
      data: {
        login: '',
        pass: ''
      },
      errorMessages: {} as loginErrorMessages,
      error: '',
      sumbitLoading: false
    }
  },
  methods: {
    submitHandler: async function () {
      this.sumbitLoading = true
      this.error = ''
      this.errorMessages = {} as loginErrorMessages
      const resp = await this.$store.dispatch('getAuth', this.data)
      if (resp !== 'ok') {
        if (resp.error) {
          this.error = resp.error
        } else {
          resp.forEach((el: { param: string, msg: string }) => {
            const location = el.param.slice(5) as string
            this.errorMessages[location] = el.msg
          })
        }
        this.sumbitLoading = false
      } else {
        this.sumbitLoading = false
        this.$router.push('/admin')
        this.$root.$emit('scroll')
      }
    }
  }
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
    .form{
      width: 100%;
    }
  }
}
</style>
