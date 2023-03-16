<template>
  <button @click.prevent="$emit('click', $event)" :class="['customButton', color, type, size]">
    {{ content }}
  </button>
</template>
<script lang="ts">
export default {
  name: 'base-button',
  props: {
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      validator: (value: string) => {
        return ['red', 'accept', 'info'].includes(value)
      },
    },
    size: {
      type: String,
      validator: (value: string) => {
        return ['small'].includes(value)
      },
    },
    type: {
      type: String,
      validator: (value: string) => {
        return ['outlined', 'empty'].includes(value)
      },
    },
  },
}
</script>
<style lang="scss" scoped>
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

// sizes
.small {
  padding: 7px 23px;
  @include font(16px, 16px, 500);
}
// types
.outlined.accept {
  border: 1px solid black;
  border-radius: 4px;
  background-color: #dee6e0;
  color: black;
  border-color: black;

  &:hover {
    background-color: #8bab94;
  }
}
.empty.info {
  border: none;
  background-color: transparent;
  color: $mainBlue;
  font-weight: 700;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
}
.empty.red {
  border: none;
  background-color: transparent;
  color: $mainRed;
  font-weight: 700;
  padding: 0;

  &:hover {
    text-decoration: underline;
    background-color: transparent;
  }
}
// colors
.red {
  background-color: $mainRed;

  &:hover {
    background-color: $secondaryRed;
  }
}
</style>
