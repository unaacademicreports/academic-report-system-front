<script setup>
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';

  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await authStore.logOut();
    router.push({ name: 'Login' });
  };
</script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Dashboard</RouterLink></li>
      <li><RouterLink to="/search-student">Buscar Estudiante</RouterLink></li>
      
      <!-- Ejemplo: Solo mostrar "Buscar Periodo" si el usuario es administrador -->
      <li v-if="authStore.authData?.roles[0] === 'Admin'">
        <RouterLink to="/search-period">Buscar Periodo</RouterLink>
      </li>
    </ul>
    
    <div class="menu-secondary">
      <ul>
        <!-- Como el Navbar solo se muestra si el usuario está logueado, 
             aquí deberíamos tener un botón de Cerrar Sesión en lugar de Login/Registro -->
        <li v-if="authStore.authData?.roles[0] === 'Admin'">
          <RouterLink to="/register">Registro</RouterLink>
        </li>
        <li>
          <a href="#" @click.prevent="handleLogout">Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
    nav {
        padding: 20px 0px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }
    nav ul li {
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: start;
    }
    nav ul li a {
        width: 100%;
        height: 100%;
        padding: 20px;
        border-right: 3px solid transparent;
        /* border-radius: 0 4px 4px 0; */
        transition: border-color .2s ease, background-color .2s ease;

        text-decoration: none;
        color: #1f1f1f;
    }
    nav ul li a:hover {
        background-color: #f3f3f3;
        /* border-right: 3px solid #2056A0; */
    }
</style>