<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить растение" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новое растение</h2>
      <span class="originError" v-if="errorMessages.origin">
        {{ errorMessages.origin }}
      </span>
      <FormPartContainer name="Основная информация">
        <CustomInput :errorMessage="errorMessages.name" v-model="plantFormData.name" text="Введите имя растения"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.latin" v-model="plantFormData.latin"
          text="Введите латинское имя растения" type="normal" />
        <CustomInput :errorMessage="errorMessages.description" v-model="plantFormData.description"
          text="Введите описание" type="textarea" />
      </FormPartContainer>
      <FormPartContainer name="Дополнительная информация">
        <CustomInput :errorMessage="errorMessages.date" v-model="plantFormData.date" text="Введите дату посадки"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.family" v-model="plantFormData.family" text="Введите царство"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.from" v-model="plantFormData.from" text="Введите откуда привезено"
          type="normal" />
        <CustomInput :errorMessage="errorMessages.livingPlace" v-model="plantFormData.livingPlace"
          text="Введите районирование" type="normal" />
      </FormPartContainer>
      <FormPartContainer name="Информация для базы">
        <CustomInput v-model="plantFormData.having" text="Доступность для приобретения" type="checkbox" />
        <CustomInput v-model="plantFormData.type" text="Выберете тип для фильтрации" type="select" />
      </FormPartContainer>
      <FormPartContainer name="Фотографии">
        <CustomInput v-for="step in steps" :key="step" :errorMessage="errorMessages.img" v-model="plantFormData.img[step - 1]" text="Добавьте фото (одно)"
          type="photo" :photoId="'plant' + step" />
      </FormPartContainer>
      <button class="plusStep" v-if="steps.length !== 3" type="button" @click.prevent="addStep">Добавить этап</button>
      <div class="buttons">
        <SvgIcons v-if="sumbitLoading" type="loading" class="suspense" />
        <button class="button" type="submit" :disabled="sumbitLoading" @click.prevent="submitForm">Отправить на сервер</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import FormPartContainer from '../../components/formPartContainer.vue'
import CustomInput from '@/components/customInput.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'
import store from '@/store'
import SvgIcons from '../common/svgIcons.vue'
import { PlantType } from '@/store/models/appTypes'
import { plantErrorMessages, plantFormType } from '@/store/models/formTypes'
import { postAPI } from '@/store/api/postAPI'

export default Vue.extend({
  name: 'plant-adding-form',
  data: function () {
    return {
      plantFormData: {
        name: '',
        latin: '',
        description: '',
        img: [],
        date: '',
        family: '',
        from: '',
        livingPlace: '',
        having: false,
        type: 'Деревья' as PlantType
      } as plantFormType,
      errorMessages: {} as plantErrorMessages,
      sumbitLoading: false,
      steps: [1]
    }
  },
  components: { FormPartContainer, CustomInput, SidePathContainer, SvgIcons },
  computed: {
    token () {
      return store.getters.getToken
    }
  },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId.indexOf('plant') !== -1) this.plantFormData.img[+photoId[5] - 1] = value
    })
  },
  methods: {
    addStep: function () {
      this.steps.push(this.steps.length + 1)
      this.plantFormData.img.push('')
    },
    submitForm: async function () {
      this.sumbitLoading = true
      const response = await postAPI.postPlantData(this.plantFormData, this.token)
      this.errorMessages = {} as plantErrorMessages
      if (response !== 'ok') {
        response.forEach((el: { param: string, msg: string }) => {
          const location = el.param.slice(5) as string
          if (location.slice(0, 3) === 'img') this.errorMessages.img = el.msg
          else this.errorMessages[location] = el.msg
        })
        this.$root.$emit('scroll')
        this.sumbitLoading = false
      }
      if (response === 'ok') {
        this.$root.$emit('changeForm', undefined)
        setTimeout(() => {
          this.$root.$emit('scroll')
        }, 300)
        this.sumbitLoading = false
      }
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';
@import '@/app';

.addingFormContaner {
  @include flex(column, center, flex-start);
  width: 100%;

  .addingForm {
    padding: 100px 0 100px;
    width: 1280px;

    .heading {
      @include font(34px, 55px, 500);
      border-bottom: 1px solid $mainVeryDarkGreen;
      padding-bottom: 50px;
    }

    .buttons {
      @include flex(row, center, flex-end);
      margin-top: 30px;

      .button {
        width: 500px;
        height: 60px;
        @include font(20px, 30px, 400);
        border: 1px solid #8BAB94;
        border-radius: 4px;
        background-color: #8BAB9444;
        transition: 300ms;

        &:hover {
          cursor: pointer;
          background-color: #8BAB94;
          transition: 300ms;
        }
      }

      .suspense{
        height: 60px;
        width: 60px;
        margin: 0;
      }

      .plusStep {
        width: 300px;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .addingFormContaner {
    .addingForm {
      width: 100%;
      padding: 100px 50px;
    }
  }
}

@media screen and (max-width: 1000px) {
  .addingFormContaner {
    .addingForm {
      padding: 50px 50px;

      .heading {
        font-size: 28px;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .addingFormContaner {
    .addingForm {
      padding: 20px;

      .heading {
        font-size: 26px;
        line-height: 34px;
        padding-bottom: 20px;
      }

      .buttons{
        position: relative;
        .suspense{
          position: absolute;
          top: 60px;
          left: 0;
        }
      }
    }
  }
}
</style>
