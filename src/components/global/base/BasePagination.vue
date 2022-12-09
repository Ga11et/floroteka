<template>
  <base-adaptive class="pagination">
    <button class="pageButton notMobile" @click="$emit('setActive', activeItem - 1)">
      <base-svg type="dropdown" class="arrow left" />
    </button>
    <template v-if="Math.ceil(itemCount / itemsInPage) <= 7">
      <button :class="['pageButton', { active: index === activeItem }]" v-for="index in Math.ceil(itemCount / itemsInPage)"
        @click="$emit('setActive', index)" :key="index + 'left'">{{ index }}</button>
    </template>
    <template v-else-if="activeItem < 3 || activeItem > Math.ceil(itemCount / itemsInPage) - 2">
      <button :class="['pageButton', { active: index === activeItem }]" v-for="index in 3"
        @click="$emit('setActive', index)" :key="index + 'left'">{{ index }}</button>
      <button class="pageButton" disabled="true">...</button>
      <button :class="['pageButton', { active: index + Math.ceil(itemCount / itemsInPage) - 3 === activeItem }]" v-for="index in 3"
        @click="$emit('setActive', index + Math.ceil(itemCount / itemsInPage) - 3)"
        :key="index + 'right'">{{ index + Math.ceil(itemCount / itemsInPage) - 3 }}</button>
    </template>
    <template v-else-if="activeItem < 5">
      <button :class="['pageButton', { active: index === activeItem }]" v-for="index in 5"
        @click="$emit('setActive', index)" :key="index + 'left'">{{ index }}</button>
      <button class="pageButton" disabled="true">...</button>
      <button :class="['pageButton', { active: index + Math.ceil(itemCount / itemsInPage) - 1 === activeItem }]" v-for="index in 1"
        @click="$emit('setActive', index + Math.ceil(itemCount / itemsInPage) - 1)"
        :key="index + 'right'">{{ index + Math.ceil(itemCount / itemsInPage) - 1 }}</button>
    </template>
    <template v-else-if="activeItem < Math.ceil(itemCount / itemsInPage) - 3">
      <button :class="['pageButton', { active: index === activeItem }]" v-for="index in 1"
        @click="$emit('setActive', index)" :key="index + 'left'">{{ index }}</button>
      <button class="pageButton" disabled="true">...</button>
      <button :class="['pageButton', { active: activeItem - 2 + index === activeItem }]" v-for="index in 3"
        @click="$emit('setActive', activeItem - 2 + index)"
        :key="index + 'center'">{{ activeItem - 2 + index }}</button>
      <button class="pageButton" disabled="true">...</button>
      <button :class="['pageButton', { active: Math.ceil(itemCount / itemsInPage) === activeItem }]" v-for="index in 1"
        @click="$emit('setActive', Math.ceil(itemCount / itemsInPage))"
        :key="index + 'right'">{{ Math.ceil(itemCount / itemsInPage) }}</button>
    </template>
    <template v-else>
      <button :class="['pageButton', { active: index === activeItem }]" v-for="index in 1"
        @click="$emit('setActive', index)" :key="index + 'left'">{{ index }}</button>
      <button class="pageButton" disabled="true">...</button>
      <button :class="['pageButton', { active: index + Math.ceil(itemCount / itemsInPage) - 5 === activeItem }]" v-for="index in 5"
        @click="$emit('setActive', index + Math.ceil(itemCount / itemsInPage) - 5)"
        :key="index + 'right'">{{ index + Math.ceil(itemCount / itemsInPage) - 5 }}</button>
    </template>
    <button class="pageButton notMobile" @click="$emit('setActive', activeItem + 1)">
      <base-svg type="dropdown" class="arrow right" />
    </button>
  </base-adaptive>
</template>
<script lang='ts'>
export default {
  name: 'base-pagination',
  props: {
    itemCount: {
      type: Number,
      required: true
    },
    itemsInPage: {
      type: Number,
      required: true
    },
    activeItem: {
      type: Number,
      required: true
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/variables';
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  .pageButton {
    width: 40px;
    height: 40px;
    background-color: transparent;
    color: $mainVeryDarkGreen;
    margin: 5px;
    border: 1px solid $mainBackDarkGreen;
    border-radius: 4px;
    font-size: 17px;
    box-shadow: 0 2px 3px $mainVeryDarkGreen;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }
    .arrow{
      width: 20px;
      height: 20px;
      stroke: $mainVeryDarkGreen;
    }
    .left{
      transform: rotateZ(90deg);
    }
    .right{
      transform: rotateZ(-90deg);
    }
  }
  .active {
    color: white;
    background-color: $mainVeryDarkGreen;
    box-shadow: 0 2px 3px $mainVeryDarkGreen;
  }
}
@media (max-width: 750px) {
  .pagination{
    .notMobile{
      display: none;
    }
  }
}
</style>
