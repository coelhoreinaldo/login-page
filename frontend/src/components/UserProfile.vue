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
  <main class="profile-container">
    <h1 class="profile-title">Perfil</h1>
    <div v-if="profileData" class="profile-info">
      <p><strong>Email:</strong> {{ profileData.email }}</p>
      <p><strong>Nome:</strong> {{ profileData.name }}</p>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </main>
</template>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.profile-title {
  font-size: 2.5rem;
  color: rgb(142, 95, 207);
  margin-bottom: 2rem;
}

.profile-info {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: left;
}

.profile-info p {
  font-size: 1.1rem;
  margin: 0.8rem 0;
}

strong {
  color: rgb(124, 55, 221);
}

.error-message {
  color: red;
  margin-top: 1.5rem;
  font-size: 1rem;
  text-align: center;
}

@media (max-width: 600px) {
  .profile-title {
    font-size: 2rem;
  }

  .profile-info {
    padding: 1.5rem;
  }
}
</style>
