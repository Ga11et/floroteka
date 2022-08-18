<template>
  <transition name="loginForm" appear>
    <div class="loginContainer">
      <form class="form">
        <CustomInput :errorMessage="errorMessages.login" v-model="data.login" text="Логин" type="normal" />
        <CustomInput :errorMessage="errorMessages.pass" v-model="data.pass" text="Пароль" type="normal"
          inputType="password" />
        <span class="originError" v-if="error">
          {{ error }}
        </span>
        <SvgIcons v-if="sumbitLoading" type="loading" class="suspense" />
        <button class="submitButton" :disabled="sumbitLoading" @click.prevent="submitHandler">Войти</button>
      </form>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from 'vue'
import CustomInput from '@/components/customInput.vue'
import router from '@/router'
import { loginErrorMessages } from '@/store/models/formTypes'
import SvgIcons from '@/components/common/svgIcons.vue'

export default Vue.extend({
  name: 'login-view',
  components: { CustomInput, SvgIcons },
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
        router.push('/admin')
        this.$root.$emit('scroll')
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

    .submitButton {
      background-color: $mainDarkGreen;
      border: none;
      @include font(18px, 30px, 500);
      width: 100%;
      height: 50px;
      margin-top: 10px;

      &:hover {
        cursor: pointer;
      }

      &:active {
        background-color: $mainVeryDarkGreen;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .loginContainer {
    top: 20%;
    padding: 30px;
  }
}

@media screen and (max-width: 1000px) {
  .loginContainer {
    .form{
      .errorSpanContainer{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        margin-top: 10px;
        .errorSpan{
          width: 100%
        }
      }
    }
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
