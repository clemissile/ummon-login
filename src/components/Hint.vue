<template>
  <transition name="fade" mode="out-in" appear>
    <div style="margin-top: 10px" v-if="!show">
      <CustomButton text="Show Hint" @click="show = true" />
    </div>
    <div class="hint" v-else>
      <div>
        toto@example.com
        <CustomButton text="🏷️" @click.prevent="copy('toto@example.com')" />
      </div>
      <div>
        1234
        <CustomButton text="🏷️" @click.prevent="copy('1234')" />
      </div></div
  ></transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useClipboard from 'vue-clipboard3';
import CustomButton from './CustomButton.vue';
const { toClipboard } = useClipboard();

export default defineComponent({
  name: 'Hint',

  components: { CustomButton },

  data() {
    return {
      show: false,
    };
  },

  methods: {
    async copy(text: string) {
      try {
        await toClipboard(text);
        this.$notify({
          group: 'copy',
          text: 'Copied to clipboard',
          type: 'info',
        });
      } catch (e) {
        this.$notify({
          group: 'copy',
          text: 'Error',
          type: 'error',
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.hint {
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    button {
      margin-left: 20px;
    }
  }
}
</style>
