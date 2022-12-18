<template>
  <section class="addingFormContaner">
    <side-path :path="`Добавить пост ${heading}`" />
    <form class="addingForm">
      <h2 class="heading">{{ `Зарегистрировать новый пост "${heading}"` }}</h2>
      <span class="originError" v-if="errorMessage">
        {{ errorMessage }}
      </span>
      <slot name="content"></slot>
      <div class="buttons">
        <slot name="actions"></slot>
      </div>
    </form>
  </section>
</template>
<script lang="ts">
export default {
  name: 'form-container',
  props: {
    errorMessage: String,
    heading: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/variables';
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
      gap: 20px;
      .suspense {
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
      .buttons {
        justify-content: space-between;
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
      .buttons {
        position: relative;
        flex-direction: column;
        .suspense {
          position: absolute;
          top: 60px;
          left: 0;
        }
      }
    }
  }
}
</style>
