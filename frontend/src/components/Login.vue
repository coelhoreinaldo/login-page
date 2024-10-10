<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { State } from '../interfaces'

const store = useStore<State>();
const router = useRouter();

const email = ref<string>('');
const password = ref<string>('');

const errorMessage = computed(() => store.getters.getErrorMessage);

const login = async () => {
  try {
    await store.dispatch('login', { email: email.value, password: password.value });
    if (store.getters.isAuthenticated)
      router.push("profile");
  } catch (err) {
    console.error('Erro no login:', err);
  }
};
</script>

<template>
  <form>
    <h2>Login</h2>
    <div>
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model="email" />
    </div>

    <div>
      <label for="password">Senha</label>
      <input type="password" id="password" v-model="password" />
    </div>

    <button @click.prevent="login">Entrar</button>

    <div v-if="errorMessage" style="color: red;">{{ errorMessage }}</div>
  </form>
</template>
