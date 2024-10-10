import { createStore } from 'vuex';
import axios from 'axios';

interface State {
  token: string | null;
  errorMessage: string;
}

const store = createStore({
  state(): State {
    return {
      token: localStorage.getItem('token') || null,
      errorMessage: ''
    }
  },
  mutations: {
    setToken(state: State, token: string) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setErrorMessage(state: State, message: string) {
      state.errorMessage = message;
    },
    clearErrorMessage(state: State) {
      state.errorMessage = '';
    }
  },
  actions: {
    async login({ commit }, payload: { email: string; password: string }) {
      try {
        commit('clearErrorMessage');
        const response = await axios.post('http://localhost:3001/api/login', payload);

        const token: string = response.data.token;
        commit('setToken', token);
      } catch (error) {
        commit('setErrorMessage', String(error.response?.data?.message || 'Erro ao realizar login'));
      }
    },
  },
  getters: {
    getErrorMessage(state: State): string {
      return state.errorMessage;
    },
    isAuthenticated(state: State): boolean {
      return !!state.token;
    },
  },
})


export default store