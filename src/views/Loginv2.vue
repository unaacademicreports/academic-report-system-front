<script setup>
    import { ref, onMounted } from 'vue';

    // Stores
    import { useAuthStore } from '../stores/auth';

    // Components
    import LogoUnaComponent from '../components/LogoUnaComponent.vue';
    import Alerts from '../components/Alerts.vue';

    // Icons
    import Defense from '../components/icons/DefenseTemp.vue';
    import User from '../components/icons/User.vue';
    import Password from '../components/icons/Password.vue';

    const authStore = useAuthStore();

    const username = ref('');
    const password = ref('');

    const errorMessage = ref('');
    const isLoading = ref(false);

    const userRegex = /^[a-zA-Z][a-zA-Z0-9]{4,11}$/;

    const handleLogin = async () => {
        // 1. Validar campos vacíos
        if (!username.value.trim() || !password.value.trim()) {
            errorMessage.value = 'Todos los campos son obligatorios.';
            return;
        }

        // 2. Validar formato de email (básico pero suficiente)
        if (!userRegex.test(username.value.trim())) {
            errorMessage.value = 'Por favor, ingrese un nombre de usuario valido (4-12 caracteres y solo letras y numeros).';
            return;
        }

        // 3. Validar largo mínimo de contraseña (opcional, buena práctica)
        if (password.value.length < 6) {
            errorMessage.value = 'La contraseña debe tener al menos 6 caracteres.';
            return;
        }

        try {
            isLoading.value = true;
            errorMessage.value = '';

            const response = await authStore.logIn(username.value, password.value);

            if (response && response.status === 'error') {
                errorMessage.value = response.message;
            }
        }
        catch (e) {
            console.error('Error:', e);
            errorMessage.value = e.message || 'Error desconocido al iniciar sesión';
        }
        finally {
            isLoading.value = false;
        }
    }

    // ✅
    onMounted(() => {
        authStore.logOut();
    })
</script>

<template>
    <section class="login-page">
        <div class="container">
            <div class="wrap-form">
                <div class="logo">
                    <LogoUnaComponent />
                </div>
                <h1>UNA System</h1>
                <p class="text-info">Portal de Acceso para Personal Autorizado</p>
                <form @submit.prevent="handleLogin">
                    <div class="wrap-input">
                        <label for="">Username</label>
                        <User />
                        <input type="text" placeholder="Ingresa tu nombre de usuario" v-model="username">
                    </div>
                    <div class="wrap-input">
                        <label for="">Contraseña</label>
                        <Password />
                        <input type="password" placeholder="Ingresa tu contraseña" v-model="password">
                    </div>
                    <div class="info">
                        <Defense />
                        <ul>
                            <li>
                                <p>Este es un sistema de seguridad restringido a personal autorizado de la UNA, Todos lis intentos de acceso quedan registrados.</p>
                            </li>
                        </ul>
                    </div>
                    <template v-if="errorMessage">
                        <Alerts :alertMessage="errorMessage" :status="'error'" />
                    </template>
                    <button type="submit" :disabled="isLoading" :class="{ 'disabled': isLoading }">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    </section>
</template>

<style scoped>
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-page .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-page .container .wrap-form {
        max-width: 500px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: #fff;
        padding: 60px;

        box-shadow: 0px 4px 20px rgba(16, 44, 84, 0.08);
        border: 1px solid #E2E8F0;
        border-radius: 8px;
    }
    .login-page .container .wrap-form .logo {
        width: 70px;
    }
    .login-page .container .wrap-form h1 {
        font-size: 24px;
        font-weight: 600;
    }
    .login-page .container .wrap-form .text-info {
        text-align: center;
    }
    .login-page .container .wrap-form span {
        font-size: 14px;
        font-weight: 400;
    }

    .login-page .container .wrap-form form {
        display: grid;
        grid-gap: 20px;
        margin-top: 30px;
    }
    .login-page .container .wrap-form form .info {
        display: flex;
        align-items: start;
        grid-gap: 20px;
        
        padding: 20px;
        background-color: #EFF4FF;
        border-radius: 2px;
    }
    .login-page .container .wrap-form form .info svg {
        width: 30px;
        height: 30px;
        margin-top: -6px;
    }
    .login-page .container .wrap-form form .info ul {
        display: grid;
        grid-gap: 10px;
        list-style: none;
    }
    .login-page .container .wrap-form form .info ul li p {
        color: var(--color-secondary);
        font-size: 13px;
        font-weight: 300;
    }
</style>