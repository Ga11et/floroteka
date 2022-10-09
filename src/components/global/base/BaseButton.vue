<template>
  <button @click="$emit('click', $event)" :class="['customButton', color]">
    {{ content }}
  </button>
</template>
<script lang='ts'>
export default {
  name: 'base-button',
  props: {
    content: {
      type: String,
      required: true
    },
    color: {
      type: String,
      validator: (value: string) => {
        return [
          'red'
        ].includes(value)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/variables';
.customButton {
  background-color: $mainDarkGreen;
  border: none;
  border-radius: 5px;
  @include font(18px, 30px, 500);
  padding: 15px 35px;
  transition: 400ms;

  &:hover {
    cursor: pointer;
    transition: 400ms;
    background-color: $mainDarkGreenHover;
  }
}

@media screen and (max-width: 750px) {
  .customButton {
    width: 100%;
  }
}
.red {
    background-color: $mainRed;

    &:hover {
      background-color: $secondaryRed;
    }
  }
</style>
