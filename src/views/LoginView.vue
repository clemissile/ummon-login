<template>
  <div
    class="container"
    :style="{
      'background-image': 'url(' + require('@/assets/img/background.png') + ')',
    }"
  >
    <div class="login-card">
      <img src="@/assets/img/logo.png" alt="Logo" width="100" />
      <h1>👋 Welcome back !</h1>
      <p>Sign in to access to our app and your profile.</p>
      <Hint />
      <form ref="loginForm" class="login-form">
        <CustomInput
          label="E-mail"
          placeholder="Type your e-mail"
          type="email"
          error="Wrong e-mail format"
          :valid="validEmail"
          @changed="handleEmail"
          background
          required
        />
        <CustomInput
          label="Password"
          placeholder="Type your password"
          type="password"
          error="Password is required"
          :valid="validPassword"
          @changed="handlePassword"
          background
          required
        />
        <CustomButton text="Login" background @click.prevent="login()" />
      </form>
      <a href="#" style="margin-top: 20px">Mot de passe oublié ?</a>
      <div class="sign-up">Don't have an account ? <a href="#">Sign up</a></div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import CustomButton from '@/components/CustomButton.vue';
import CustomInput from '@/components/CustomInput.vue';
import { defineComponent } from 'vue';
import Hint from '@/components/Hint.vue';

export default defineComponent({
  name: 'LoginView',

  components: { CustomInput, CustomButton, Hint },

  computed: {
    ...mapGetters({
      email: 'auth/email',
      validEmail: 'auth/validEmail',
      password: 'auth/password',
      validPassword: 'auth/validPassword',
    }),
  },

  methods: {
    ...mapActions({
      login: 'auth/test',
    }),

    handleEmail(value: string) {
      this.$store.commit('auth/SET_EMAIL', value);
    },

    handlePassword(value: string) {
      this.$store.commit('auth/SET_PASSWORD', value);
    },
  },
});
</script>

<style lang="scss">
.container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 60%;

    @media (max-width: 959px) {
      width: 80%;
    }
  }

  .login-card {
    position: relative;
    background-color: $bg-navy;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 0;
    border-radius: 20px;

    @media (max-width: 959px) {
      width: 90%;
      padding: 50px 0;
    }

    .sign-up {
      position: absolute;
      bottom: 20px;
    }

    h1 {
      margin-top: 10px;
    }

    p {
      text-align: center;
      margin-top: 10px;
      width: 70%;
    }
  }
}
</style>
