<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import UserGreetings from './components/UserGreetings.vue'
import { useStore } from 'vuex'
import { ref, watch } from 'vue'

const store = useStore()
const isAuthenticated = ref(store.getters.isAuthenticated)

watch(
  () => store.getters.isAuthenticated,
  (newValue) => {
    isAuthenticated.value = newValue
  }
)

const logout = () => {
  store.commit('setToken', '')
  localStorage.removeItem('token')
  isAuthenticated.value = false
  window.location.href = '/login'
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.png" />
    <div class="wrapper">
      <UserGreetings msg="Bem vindo!" />
      <nav>
        <RouterLink to="/login" v-if="!isAuthenticated">Login</RouterLink>
        <RouterLink to="/register" v-if="!isAuthenticated">Cadastre-se</RouterLink>
        <a href="#" v-if="isAuthenticated" @click.prevent="logout">Logout</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.logo {
  height: 8em;
  object-fit: cover;
}

nav {
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
  padding-left: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
    justify-content: center;
    align-items: center;
  }

  .logo {
    margin: 0 auto 0 -2.5em;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
