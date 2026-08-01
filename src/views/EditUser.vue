<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import { useAuthStore } from '../stores/auth';

    // Components
    import Alerts from '../components/Alerts.vue';

    const authStore = useAuthStore();
    const route = useRoute();

    const user = ref({});
    const roles = ref({});
    const selectedRoleIds = ref([]);

    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const getLoggedUserId = () => {
        return authStore.authData?.id || authStore.authData?.sub || authStore.authData?.user_id || authStore.authData?.id_user;
    };

    onMounted(async()=>{
        try {
            const loggedUserId = getLoggedUserId();
            // 1. Verificación al cargar: evitar que carguen datos de un ID ajeno
            if (loggedUserId && String(route.params.id) !== String(loggedUserId)) {
                errorMessage.value = "Seguridad: No estás autorizado para ver o editar los datos de otro usuario.";
                return;
            }

            user.value = await authStore.getUserById(route.params.id);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    });

    const handleUpdate = async () =>{
        isLoading.value = true;
        errorMessage.value = "";
        successMessage.value = "";
        
        const loggedUserId = getLoggedUserId();
        // 2. Verificación al enviar: garantizar que ni la URL ni el objeto en memoria apunten a otro usuario
        if (loggedUserId && (String(route.params.id) !== String(loggedUserId) || String(user.value.id) !== String(loggedUserId))) {
            errorMessage.value = "Violación de seguridad: No puedes modificar los datos de otro usuario.";
            isLoading.value = false;
            return;
        }

        try {
            const payload = {
                firstname: user.value.firstname,
                lastname: user.value.lastname,
                email: user.value.email,
                phone: user.value.phone
            };

            // Validar contraseñas si el usuario ingresó una nueva
            if (user.value.new_password) {
                if (user.value.new_password !== user.value.new_password_confirmation) {
                    errorMessage.value = "La nueva contraseña y su confirmación no coinciden.";
                    isLoading.value = false;
                    return;
                }
                payload.password = user.value.new_password;
            }

            const response = await authStore.updateUser(user.value.id, payload);
            if(response.status === 'success'){
                successMessage.value = response.message;
                // Limpiar campos de contraseña
                user.value.new_password = "";
                user.value.new_password_confirmation = "";
            }
        } catch (error) {
            errorMessage.value = error.message || 'Error actualizando usuario';
        } finally {
            isLoading.value = false;
        }
    }
</script>

<template>
    <div id="configuracion-user">
        <section class="hero">
            <h2>Configuracion de usuario</h2>    
        </section>

        <section class="config-user-form">
            <template v-if="user">
                <form @submit.prevent="handleUpdate">
                    <div class="personal-data">
                        <h3>Datos personales</h3>
                        <div class="wrap-input">
                            <label for="f-firstname">Nombre</label>
                            <input type="text" v-model="user.firstname" id="f-firstname">
                        </div>
                        <div class="wrap-input">
                            <label for="f-lastname">Apellido</label>
                            <input type="text" v-model="user.lastname" id="f-lastname">
                        </div>
                        <div class="wrap-input">
                            <label for="username">Nombre de usuario</label>
                            <input type="text" v-model="user.username" id="f-username">
                        </div>
                        <div class="wrap-input">
                            <label for="f-email">Correo electrónico</label>
                            <input type="email" v-model="user.email" id="f-email">
                        </div>
                        <div class="wrap-input">
                            <label for="f-phone">Teléfono</label>
                            <input type="tel" v-model="user.phone" id="f-phone">
                        </div>
                    </div>
                    <div class="security-data">
                        <h3>Datos de seguridad</h3>
                        <div class="wrap-input">
                            <label for="f-new-password">Contraseña nueva</label>
                            <input type="password" v-model="user.new_password" id="f-new-password">
                        </div>
                        <div class="wrap-input">
                            <label for="f-new-password-confirmation">Confirmación de contraseña nueva</label>
                            <input type="password" v-model="user.new_password_confirmation" id="f-new-password-confirmation">
                        </div>
                    </div>
                    <template v-if="errorMessage">
                        <Alerts :alertMessage="errorMessage" :status="'error'" />
                    </template>
                    <template v-if="successMessage">
                        <Alerts :alertMessage="successMessage" :status="'success'" />
                    </template>
        
                    <button v-if="!isLoading" type="submit" @click="handleUpdate">Actualizar</button>
                    <button v-if="isLoading" type="submit" disabled>Actualizando...</button>
                </form>
            </template>
            <template v-else>
                <p>No se encontro el usuario</p>
            </template>
        </section>
    </div>
</template>

<style scoped>
    #configuracion-user {
        padding: 20px;
        display: grid;
        grid-gap: 20px;
    }
    #configuracion-user form {
        display: grid;
        gap: 20px;
    }
    #configuracion-user form .personal-data, 
    #configuracion-user form .security-data {
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 20px;
        background-color: #fff;
        color: var(--color-secondary);
        display: grid;
        gap: 20px;
    }
</style>