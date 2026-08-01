<script setup>
    import { onMounted, ref } from 'vue';
    import { useAuthStore } from '../stores/auth';
    import Alerts from '../components/Alerts.vue';

    const authStore = useAuthStore();
    const firstname = ref("");
    const lastname = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const nameRegex = /^[A-Za-z]{3,16}$/;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,16}$/;
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

    const isLoading = ref(false);
    const errorMessage = ref("");

    const handleRegister = async () => {
        if (!firstname.value.trim() || !lastname.value.trim() || !username.value.trim() || !email.value.trim() || !password.value.trim() || !confirmPassword.value.trim()) {
            errorMessage.value = "Todos los campos son obligatorios.";
            return;
        }

        if(!nameRegex.test(firstname.value.trim())) {
            errorMessage.value = "El nombre es inválido, debe contener de 3 a 16 caracteres y solo letras.";
            return;
        }

        if(!nameRegex.test(lastname.value.trim())) {
            errorMessage.value = "El apellido es inválido, debe contener de 3 a 16 caracteres y solo letras.";
            return;
        }

        if(!usernameRegex.test(username.value.trim())) {
            errorMessage.value = "El nombre de usuario es inválido, debe contener de 6 a 16 caracteres y solo letras.";
            return;
        }

        if (!passwordRegex.test(password.value)) {
            errorMessage.value = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&).";
            return;
        }

        if (password.value !== confirmPassword.value) {
            errorMessage.value = "Las contraseñas no coinciden.";
            return;
        }

        if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            errorMessage.value = "El correo electrónico no es válido.";
            return;
        }

        try {
            isLoading.value = true;
            errorMessage.value = "";

            console.log("firstname:", firstname.value, "lastname:", lastname.value, "username:", username.value, "email:", email.value, "password:", password.value);

            const response = await authStore.signUp(firstname.value, lastname.value, username.value, email.value, password.value);

            if (response.ok && response.status === "success") {
                console.log("✅ Usuario registrado exitosamente");
            }
            else {
                errorMessage.value = response.message || "Error desconocido al registrar el usuario";
            }
        }
        catch (error) {
            console.error('Error al registrar el usuario:', error);
            errorMessage.value = error.message || 'Error desconocido al registrar el usuario';
        }
        finally {
            isLoading.value = false;
        }
    }
</script>
<template>
    <h2>Registro de nuevo usuario</h2>
    <form @submit.prevent="handleRegister">
        <div class="wrapper-input">
            <label for="firstname">Nombre</label>
            <input v-model="firstname" type="text" name="firstname" id="firstname">
        </div>
        <div class="wrapper-input">
            <label for="lastname">Apellido</label>
            <input v-model="lastname" type="text" name="lastname" id="lastname">
        </div>
        <div class="wrapper-input">
            <label for="username">Nombre de Usuario</label>
            <input v-model="username" type="text" name="username" id="username">
        </div>
        <div class="wrapper-input">
            <label for="email">Email</label>
            <input v-model="email" type="email" name="email" id="email">
        </div>
        <div class="wrapper-input">
            <label for="password">Contraseña</label>
            <input v-model="password" type="password" name="password" id="password">
        </div>
        <div class="wrapper-input">
            <label for="password">Repetir Contraseña</label>
            <input v-model="confirmPassword" type="password" name="password" id="password">
        </div>
        <template v-if="errorMessage">
            <Alerts :alertMessage="errorMessage" :status="'error'" />
        </template>
        <button type="submit">Registrar Nuevo Usuario</button>
    </form>
</template>

<style scoped>
</style>