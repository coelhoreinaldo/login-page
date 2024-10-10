<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isAuthenticated = computed(() => store.getters.isAuthenticated)
</script>

<template>
  <div class="greetings">
    <h1 class="purple">Bem vindo!</h1>
    <h3 v-if="!isAuthenticated">
      Faça login para acessar o sistema ou clique em registrar para criar uma conta.
    </h3>
    <h3 v-else>Você está logado! Este é o seu perfil.</h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
