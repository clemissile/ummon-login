<template>
  <button class="custom-btn" :disabled="disabled">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CustomButton',

  props: {
    text: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-btn {
  background-color: $primary;
  color: $white;
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
  margin: 20px 0;
  cursor: pointer;

  &:hover {
    background-color: darken($primary, 5%);
    transition: 200ms ease-in-out;
  }

  &:disabled,
  &[disabled] {
    background-color: lighten($primary, 20%);
    cursor: auto;
  }
}
</style>
