<template>
  <div class="notFoundThing">
    <p class="text desktop">Ничего</p>
    <span class="span404">
      <p class="text mobile">Ничего</p>
      404
      <p class="text mobile">Нет</p>
    </span>
    <p class="text desktop">Нет</p>
  </div>
</template>
<script lang='ts'>
export default {
  name: 'found-nothing-placeholder'
}
</script>
<style lang='scss' scoped>
@import '@/variables';
.notFoundThing{
  width: 1280px;
  height: 500px;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 500px 1fr;
  .text{
    @include font(44px, 56px, 500);
    @include flex(row, center, center);
    color: $mainDarkGreen;
  }
  .span404{
    @include font(54px, 66px, 700);
    @include flex(column, center, space-evenly);
    padding: 50px 0;
    color: $mainDarkGreen;
    border: 5px solid $mainDarkGreen;
    border-radius: 50%;
    .mobile{
      display: none;
    }
  }
}
@media screen and (max-width: 1400px) {
  .notFoundThing{
    width: 100%;
  }
}
@media screen and (max-width: 1200px) {
  .notFoundThing{
    height: 400px;
    grid-template-columns: 1fr 400px 1fr;
  }
}
@media screen and (max-width: 1000px) {
  .notFoundThing{
    height: 350px;
    grid-template-columns: 1fr 350px 1fr;
    .text{
      font-size: 34px;
    }
  }
}
@media screen and (max-width: 750px) {
  .notFoundThing{
    @include flex(row, center, center);
    margin-top: 50px;

    .text{
      font-size: 34px;
    }
    .span404{
      width: 350px;
      height: 350px;
      .mobile{
        display: block;
        font-weight: 700;
      }
    }
    .desktop{
      display: none;
    }

  }
}
</style>
