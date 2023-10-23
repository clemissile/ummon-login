<template>
  <div class="custom-input">
    <div class="custom-input--label">
      {{ label }}
      <span class="required" v-if="required">*</span>
    </div>
    <input
      :class="!valid ? 'error' : ''"
      :placeholder="placeholder"
      :type="type"
      v-model="value"
      @input="$emit('changed', value)"
    />
    <div class="custom-input--error" v-if="!valid">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActionPayload } from 'vuex';

export default defineComponent({
  name: 'CustomInput',

  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    error: {
      type: String,
      required: true,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      value: null,
    };
  },

  mounted() {
    this.$store.subscribeAction({
      after: (action: ActionPayload) => {
        if (action.type === 'auth/login') {
          this.value = null;
        }
      },
    });
  },
});
</script>

<style lang="scss" scoped>
.custom-input {
  color: $gray;
  margin-bottom: 20px;

  input {
    background-color: $bg-input;
    border: none;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    color: inherit;

    &:hover {
      box-shadow: 0 0 5pt 0.5pt $primary;
      transition: 200ms ease-in-out;
    }

    &:focus,
    &:focus-within,
    &:focus-visible {
      box-shadow: 0 0 5pt 2pt $primary;
      outline-width: 0px;
      transition: 200ms ease-in-out;
    }

    &.error {
      border: 1px solid $error;
      transition: 200ms ease-in-out;
    }
  }

  &--label {
    margin-top: 20px;
    margin-bottom: 5px;
  }

  &--error {
    margin-top: 5px;
    color: $error;
    font-size: 10pt;
  }

  .required {
    color: red;
  }
}
</style>
