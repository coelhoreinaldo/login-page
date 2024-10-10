import { createStore } from 'vuex'
import axios from 'axios'
import type { State, User } from '@/interfaces'

const store = createStore({
  state(): State {
    return {
      token: localStorage.getItem('token') || null,
      errorMessage: '',
      user: null
    }
  },
  mutations: {
    setToken(state: State, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setErrorMessage(state: State, message: string) {
      state.errorMessage = message
    },
    clearErrorMessage(state: State) {
      state.errorMessage = ''
    },
    setUser(state: State, user: User) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, payload: { email: string; password: string }) {
      try {
        commit('clearErrorMessage')
        const response = await axios.post('http://localhost:3001/api/login', payload)
        const token: string = response.data.token
        commit('setToken', token)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          commit('setErrorMessage', error.response?.data?.message || 'Erro ao realizar login')
        } else {
          commit('setErrorMessage', 'Erro ao realizar login')
        }
      }
    },
    async register({ commit }, payload: { email: string; password: string; name: string }) {
      try {
        commit('clearErrorMessage')
        const response = await axios.post('http://localhost:3001/api/register', payload)
        const user = response.data
        commit('setUser', user)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          commit('setErrorMessage', error.response?.data?.message || 'Erro ao realizar cadastro')
        } else {
          commit('setErrorMessage', 'Erro ao realizar cadastro')
        }
      }
    }
  },
  getters: {
    getErrorMessage(state: State): string {
      return state.errorMessage
    },
    isAuthenticated(state: State): boolean {
      return !!state.token
    },
    getUser(state: State): User | null {
      return state.user
    },
    getToken(state: State): string | null {
      return state.token
    }
  }
})

export default store
