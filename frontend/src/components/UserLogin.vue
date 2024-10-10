<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { State } from '../interfaces'

const store = useStore<State>()
const router = useRouter()

const email = ref<string>('')
const password = ref<string>('')

const errorMessage = computed(() => store.getters.getErrorMessage)

const login = async () => {
  try {
    await store.dispatch('login', { email: email.value, password: password.value })
    if (store.getters.isAuthenticated) router.push('profile')
  } catch (err) {
    console.error('Erro no login:', err)
  }
}
</script>

<template>
  <div class="login-container">
    <form class="login-form">
      <h2 class="login-title">Login</h2>
      <div class="input-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" class="input-field" />
      </div>

      <div class="input-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" class="input-field" />
      </div>

      <button @click.prevent="login" class="login-btn">Entrar</button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 2rem;
}

.login-form {
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
}

.login-title {
  font-size: 2rem;
  color: rgb(142, 95, 207);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.input-group {
  margin-bottom: 1.2rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #beb2b2;
}

.input-field {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: rgb(142, 95, 207);
  outline: none;
}

.login-btn {
  width: 100%;
  padding: 0.9rem;
  background-color: rgb(142, 95, 207);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
}

.login-btn:hover {
  background-color: rgb(124, 55, 221);
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .login-form {
    padding: 1.5rem;
  }
}
</style>
