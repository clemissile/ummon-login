<template>
  <notifications group="auth" position="top center" />
  <notifications group="attempts" position="bottom left" width="30%">
    <template #body="props">
      <div class="vue-notification">
        <h3 class="title">
          {{ props.item.title }}
        </h3>
        <div v-html="props.item.text" />
      </div>
    </template>
  </notifications>
  <LoginView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginView from './views/LoginView.vue';

export default defineComponent({
  name: 'App',

  components: {
    LoginView,
  },
});
</script>
