import { createStore } from 'vuex';

// import modules
import auth, { AuthState } from './modules/auth';

export type RootState = {
  auth: AuthState;
};

export default createStore<RootState>({
  state: {} as RootState,
  mutations: {},
  actions: {},
  modules: { auth },
});
