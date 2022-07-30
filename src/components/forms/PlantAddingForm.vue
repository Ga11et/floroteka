<template>
  <section class="addingFormContaner">
    <SidePathContainer path="Добавить растение" />
    <form class="addingForm">
      <h2 class="heading">Зарегистрировать новое растение</h2>
      <FormPartContainer name="Основная информация" >
        <CustomInput :errorMessage="errorMessages.name" v-model="plantFormData.name" text="Введите имя растения" type="normal" />
        <CustomInput :errorMessage="errorMessages.latin" v-model="plantFormData.latin" text="Введите латинское имя растения" type="normal" />
        <CustomInput :errorMessage="errorMessages.description" v-model="plantFormData.description" text="Введите описание" type="textarea" />
      </FormPartContainer>
      <FormPartContainer name="Дополнительная информация" >
        <CustomInput :errorMessage="errorMessages.date" v-model="plantFormData.date" text="Введите дату посадки" type="normal" />
        <CustomInput :errorMessage="errorMessages.family" v-model="plantFormData.family" text="Введите царство" type="normal" />
        <CustomInput :errorMessage="errorMessages.from" v-model="plantFormData.from" text="Введите откуда привезено" type="normal" />
        <CustomInput :errorMessage="errorMessages.livingPlace" v-model="plantFormData.livingPlace" text="Введите районирование" type="normal" />
      </FormPartContainer>
      <FormPartContainer name="Информация для базы" >
        <CustomInput v-model="plantFormData.having" text="Доступность для приобретения" type="checkbox" />
        <CustomInput v-model="plantFormData.type" text="Выберете тип для фильтрации" type="select" />
      </FormPartContainer>
      <FormPartContainer name="Фотографии"  >
        <CustomInput :errorMessage="errorMessages.img" text="Добавьте фото (одно)" type="photo" photoId="plant1" />
      </FormPartContainer>
      <div class="buttons">
        <button class="button" type="submit" @click.prevent="submitForm">Отправить на сервер</button>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import { postPlantData } from '@/store/api/api'
import { plantPropsType, PlantType, ErrorMessagesPlantAddingFormType } from '@/store/models'
import FormPartContainer from '../../components/formPartContainer.vue'
import CustomInput from '@/components/customInput.vue'
import SidePathContainer from '@/components/sidePathContainer.vue'

export default Vue.extend({
  name: 'plant-adding-form',
  data: function () {
    return {
      plantFormData: {
        name: '',
        latin: '',
        description: '',
        img: [''],
        date: '',
        family: '',
        from: '',
        livingPlace: '',
        having: false,
        type: 'Деревья' as PlantType
      } as plantPropsType,
      errorMessages: {} as ErrorMessagesPlantAddingFormType
    }
  },
  components: { FormPartContainer, CustomInput, SidePathContainer },
  mounted: function () {
    this.$root.$on('renderResult', (value: string, photoId: string) => {
      if (photoId === 'plant1') this.plantFormData.img[0] = value
    })
    this.$root.$on('dropHandler', (file: File, photoId: string) => {
      console.log(photoId)
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          this.$root.$emit('renderResult', reader.result as string, photoId)
        }
      }
    })
  },
  methods: {
    submitForm: async function () {
      const response = await postPlantData(this.plantFormData)
      this.errorMessages = {} as ErrorMessagesPlantAddingFormType
      if (response !== 'ok') {
        response.forEach((el: { param: string, msg: string }) => {
          const location = el.param.slice(5) as string
          if (location.slice(0, 3) === 'img') this.errorMessages.img = el.msg
          else this.errorMessages[location] = el.msg
        })
        this.$root.$emit('scroll')
      }
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';

.addingFormContaner {
  @include flex(column, center, flex-start);
  width: 100%;

  .addingForm {
    padding: 50px 0 100px;
    width: 1280px;

    .heading {
      @include font(34px, 55px, 500);
      border-bottom: 1px solid $mainVeryDarkGreen;
      padding-bottom: 50px;
    }

    .buttons {
      @include flex(row, center, flex-end);

      .button {
        width: 500px;
        height: 60px;
        margin-top: 30px;
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
    }
  }
}
@media screen and (max-width: 1400px) {
  .addingFormContaner{
    .addingForm{
      width: 100%;
      padding: 50px 50px 100px;
    }
  }
}
@media screen and (max-width: 1000px) {
  .addingFormContaner{
    .addingForm{
      padding: 50px 50px;
      .heading{
        font-size: 28px;
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .addingFormContaner{
    .addingForm{
      padding: 20px;
      .heading{
        font-size: 26px;
        line-height: 34px;
        padding-bottom: 20px;
      }
    }
  }
}
</style>
