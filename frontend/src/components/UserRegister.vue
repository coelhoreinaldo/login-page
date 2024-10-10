<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { State } from '../interfaces'

const store = useStore<State>()
const router = useRouter()

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const register = async () => {
  try {
    await store.dispatch('register', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (store.getters.getUser) router.push('/login')
  } catch (err) {
    console.error('Erro no registro:', err)
  }
}
</script>

<template>
  <h1>Registrar</h1>
  <form @submit.prevent="register">
    <div>
      <label for="name">Nome:</label>
      <input type="text" id="name" v-model="name" required />
    </div>
    <div>
      <label for="email">E-mail:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">Registrar</button>
  </form>
</template>
