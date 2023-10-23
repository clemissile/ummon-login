<template>
  <button
    :class="['custom-btn', background ? 'btn-filled' : '']"
    :disabled="disabled"
  >
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
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    background: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-btn {
  background: transparent;
  color: $white;
  width: 100%;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.btn-filled {
    background-color: $primary;

    &:hover {
      background-color: darken($primary, 5%);
      transition: 200ms ease-in-out;
    }
  }

  &:disabled,
  &[disabled] {
    background-color: lighten($primary, 20%);
    cursor: auto;
  }
}
</style>
