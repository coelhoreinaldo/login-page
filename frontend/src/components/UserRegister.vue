<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import type { State } from '../interfaces'

const store = useStore<State>()
const router = useRouter()

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')

const errorMessage = computed(() => store.getters.getErrorMessage)

const register = async () => {
  try {
    await store.dispatch('register', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    if (store.getters.getUser) {
      router.push('/login')
    }
  } catch (err) {
    console.error('Erro no registro:', err)
  }
}
</script>

<template>
  <div class="register-container">
    <h1 class="register-title">Registrar</h1>
    <form @submit.prevent="register" class="register-form">
      <div class="input-group">
        <label for="name">Nome:</label>
        <input type="text" id="name" v-model="name" required class="input-field" />
      </div>
      <div class="input-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required class="input-field" />
      </div>
      <div class="input-group">
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required class="input-field" />
      </div>
      <button type="submit" class="register-btn">Registrar</button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.register-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: rgb(142, 95, 207);
}

.register-form {
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
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

.register-btn {
  width: 100%;
  padding: 0.9rem;
  background-color: rgb(142, 95, 207);
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-btn:hover {
  background-color: rgb(124, 55, 221);
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .register-form {
    padding: 1.5rem;
  }
}
</style>
