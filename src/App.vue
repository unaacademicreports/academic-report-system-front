<script setup>
  import { RouterView, useRoute } from 'vue-router'
  import { useAuthStore } from './stores/auth';
  
  // Components
  import NavbarOptions from './components/NavbarOptions.vue';
  import NavbarSecondary from './components/NavbarSecondary.vue';

  const authStore = useAuthStore();
  const route = useRoute();
</script>

<template>
  <template v-if="authStore.authData && route.name !== 'Login'">
    <div class="wrap-body">
      <NavbarOptions />
      <div class="wrap-main">
        <NavbarSecondary :userLoged="authStore.authData" />
        <RouterView />
      </div >
    </div>
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped>
  .wrap-body {
    display: flex;
  }
  .wrap-main {
    width: 100%;
    height: 100dvh;
    overflow-y: scroll;
    background-color: #F8F9FF;
  }
</style>