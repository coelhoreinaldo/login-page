<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useStore } from 'vuex'
import type { User } from '../interfaces'

const store = useStore()
const router = useRouter()
const profileData = ref<User | null>(null)
const errorMessage = ref('')

const fetchProfile = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/profile', {
      headers: {
        Authorization: `Bearer ${store.getters.getToken}`
      }
    })
    profileData.value = response.data
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
      store.commit('setToken', '')
      localStorage.removeItem('token')
      router.push('/login')
    } else {
      errorMessage.value = 'Erro ao carregar perfil. Por favor, tente novamente.'
    }
  }
}

onMounted(() => {
  if (store.getters.isAuthenticated) {
    fetchProfile()
  } else {
    errorMessage.value = 'Email não encontrado no token. Por favor, faça login novamente.'
    store.commit('setToken', '')
    localStorage.removeItem('token')
    router.push('/login')
  }
})
</script>

<template>
  <main>
    <h1>Profile Page</h1>
    <div v-if="profileData">
      <p><strong>Email:</strong> {{ profileData.email }}</p>
      <p><strong>Nome:</strong> {{ profileData.name }}</p>
    </div>
    <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
  </main>
</template>

<style scoped></style>
