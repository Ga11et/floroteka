<template>
    <main class="plantAddingFormContaner">
        <form class="plantAddingForm">
            <h2>Введите имя растения</h2>
            <input v-model="plantName" type="text" class="input" />
            <h2>Введите описание растения</h2>
            <textarea v-model="description" type="text" class="input heightMore" ></textarea>
            <h2>Добавьте фото растения (одно)</h2>
            <DropFileContainer :putFile="putFile" :dropHandler="dropHandler" :image="image" />
            <!-- <input @change="putFile" type="file" class="fileInput" /> -->
            <button class="button" type="submit" @click.prevent="submitForm">Отправить на сервер</button>
        </form>
    </main>
</template>
<script lang="ts">
import Vue from 'vue'
import { postPlantData } from '@/store/api/api'
import DropFileContainer from '@/components/dropFileContainer.vue'

export default Vue.extend({
  name: 'plant-adding-form',
  data: function () {
    return {
      plantName: '',
      description: '',
      image: ''
    }
  },
  components: {
    DropFileContainer
  },
  methods: {
    submitForm: async function () {
      await postPlantData(this.plantName, this.description, this.image)
    },
    putFile: function (event: any) {
      const reader = new FileReader()
      reader.readAsDataURL(event.target?.files[0])
      reader.onloadend = () => {
        this.image = reader.result as string
        return null
      }
    },
    dropHandler: function (event: DragEvent) {
      if (event.dataTransfer?.files[0]) {
        const reader = new FileReader()
        reader.readAsDataURL(event.dataTransfer?.files[0])
        reader.onloadend = () => {
          this.image = reader.result as string
          return null
        }
      }
    }
  }
})
</script>
<style lang="scss">
@import '@/variables';
  .plantAddingFormContaner{
    @include flex(column, center, flex-start);
    .plantAddingForm{
      padding: 100px 0;
      width: 1280px;
      h2{
        @include font(30px, 45px, 500);
      }
      .input{
        margin: 20px 0;
        padding: 0 20px;
        width: 500px;
        height: 50px;
        @include font(30px, 45px, 500);
      }
      .heightMore{
        height: 200px;
        padding: 20px;
      }
      .button{
        width: 500px;
        height: 60px;
        margin-top: 30px;
        @include font(20px, 30px, 400);
        border: 1px solid #8BAB94;
        border-radius: 4px;
        background-color: #8BAB9444;
        transition: 300ms;
        &:hover{
          cursor: pointer;
          background-color: #8BAB94;
          transition: 300ms;
        }
      }
    }
  }
</style>
