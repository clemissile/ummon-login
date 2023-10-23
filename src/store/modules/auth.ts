import { ActionContext } from 'vuex/types/index.js';
import { RootState } from '@/store';
import { notify } from '@kyvg/vue3-notification';
import { Attempt } from '@/types/Attempt.type';

const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const login = process.env.VUE_APP_EMAIL as string;
const pass = process.env.VUE_APP_PASSWORD as string;

export interface AuthState {
  email: string;
  password: string;
  validEmail: boolean;
  validPassword: boolean;
  attempts: Array<Attempt>;
}

export default {
  namespaced: true,

  state: {
    email: '',
    password: '',
    validEmail: true,
    validPassword: true,
    attempts: [],
  },

  getters: {
    email: (state: AuthState) => {
      return state.email;
    },
    password: (state: AuthState) => {
      return state.password;
    },
    validEmail: (state: AuthState) => {
      return state.validEmail;
    },
    validPassword: (state: AuthState) => {
      return state.validPassword;
    },
  },

  actions: {
    test(context: ActionContext<AuthState, RootState>) {
      context.state.validEmail = true;
      context.state.validPassword = true;
      context.dispatch('logAttempts');

      const validEmail =
        context.state.email !== '' && context.state.email.match(regexEmail);
      const validPassword = context.state.password !== '';

      if (validEmail && validPassword) {
        context.dispatch('login');
      } else {
        if (!validEmail) context.state.validEmail = false;
        if (!validPassword) context.state.validPassword = false;
      }
    },

    login(context: ActionContext<AuthState, RootState>) {
      if (context.state.email === login && context.state.password === pass) {
        context.commit('SET_EMAIL', '');
        context.commit('SET_PASSWORD', '');
        notify({
          group: 'auth',
          title: 'Authorization',
          text: 'You have been logged in!',
          type: 'success',
        });
      } else {
        notify({
          group: 'auth',
          title: 'Authorization',
          text: 'Error on credentials, please try again',
          type: 'error',
        });
      }
    },

    logAttempts(context: ActionContext<AuthState, RootState>) {
      context.state.attempts.push({
        date: new Date(),
        email: context.state.email,
        password: context.state.password,
      });

      let notifText = '<table>';
      context.state.attempts.forEach(a => {
        notifText += `<tr>
          <td>${a.date.toLocaleString()}</td>
          <td>${a.email}</td>
          <td>${a.password}</td>
          </tr>`;
      });
      notifText += '</table>';

      notify({
        group: 'attempts',
        title: 'Attempts',
        text: notifText,
        type: 'info',
        duration: 5000,
      });
    },
  },

  mutations: {
    SET_EMAIL(state: AuthState, email: string) {
      state.email = email;
    },

    SET_PASSWORD(state: AuthState, password: string) {
      state.password = password;
    },
  },
};
