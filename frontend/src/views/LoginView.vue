<script setup lang="ts">
import Login from '@/components/UserLogin.vue'
</script>

<template>
  <main class="container">
    <Login />
  </main>
</template>

<style>
.container {
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.055);
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(146, 2, 230, 0.151);
}
</style>
