<script setup>
    import { ref, onMounted } from 'vue';

    // Stores
    import { useAuthStore } from '../stores/auth.js';
    import Alerts from './Alerts.vue';

    defineProps({
        isOpen: Boolean
    });

    const emit = defineEmits(['close']);
    const authStore = useAuthStore();
    const roles = ref([]);

    const firstname = ref("");
    const lastname = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const roleId = ref("");
    const isActive = ref(true);

    const nameRegex = /^[A-Za-z]{3,16}$/;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,16}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

    const isLoading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const closeModal = () => {
        emit('close');
        errorMessage.value = "";
        successMessage.value = "";
        firstname.value = "";
        lastname.value = "";
        username.value = "";
        email.value = "";
        password.value = "";
        confirmPassword.value = "";
        roleId.value = "";
        isActive.value = true;
    };

    const handleRegister = async () => {
        if (!firstname.value.trim() || !lastname.value.trim() || !username.value.trim() || !email.value.trim() || !password.value.trim() || !confirmPassword.value.trim() || !roleId.value) {
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
            successMessage.value = "";

            const response = await authStore.signUp(firstname.value, lastname.value, username.value, email.value, password.value, roleId.value);

            if (response && response.ok) {
                const data = await response.json();
                
                // Actualizar rol del usuario recién creado 
                if (roleId.value && data && data.data && data.data.id) {
                    await authStore.updateUser(data.data.id, { role_id: roleId.value });
                }

                console.log("✅ Usuario registrado exitosamente");
                successMessage.value = "Usuario registrado exitosamente.";

                setTimeout(() => {
                    closeModal();
                    window.location.reload(); // Recargar la página para ver los cambios en la tabla
                }, 1500);
            }
            else {
                const data = await response.json();
                errorMessage.value = data.message || "Error desconocido al registrar el usuario";
            }
        }
        catch (error) {
            console.error('Error al registrar el usuario:', error);
            errorMessage.value = error.message || 'Error desconocido al registrar el usuario';
        }
        finally {
            isLoading.value = false;
        }
    };

    onMounted(async () => {
        roles.value = await authStore.fetchAllRoles();
    });
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
      
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        
        <section class="hero">
            <h2>Formulario de Registro</h2>
        </section>
        
        <form @submit.prevent="handleRegister">
            <div class="wrap-column">
                <div class="wrap-input">
                    <label for="firstname">Nombre</label>
                    <input v-model="firstname" type="text" name="firstname" id="firstname">
                </div>
                <div class="wrap-input">
                    <label for="lastname">Apellido</label>
                    <input v-model="lastname" type="text" name="lastname" id="lastname">
                </div>
            </div>
            <div class="wrap-input">
                <label for="email">Correo</label>
                <input v-model="email" type="email" name="email" id="email">
            </div>
            <div class="wrap-input">
                <label for="username">Nombre de usuario</label>
                <input v-model="username" type="text" name="username" id="username">
            </div>
            <div class="wrap-column">
                <div class="wrap-input">
                    <label for="password">Contraseña</label>
                    <input v-model="password" type="password" name="password" id="password">
                </div>
                <div class="wrap-input">
                    <label for="confirmPassword">Repetir Contraseña</label>
                    <input v-model="confirmPassword" type="password" name="confirmPassword" id="confirmPassword">
                </div>
            </div>
            <div class="wrap-input">
                <label for="roleId">Rol</label>
                <select v-model="roleId" name="roleId" id="roleId">
                    <option value="" disabled>-- Seleccione un rol --</option>
                    <option v-for="role in roles" :key="role.id" :value="role.name">{{ role.name }}</option>
                </select>
            </div>
          
          <template v-if="errorMessage">
            <Alerts :alertMessage="errorMessage" :status="'error'" />
          </template>
          <template v-if="successMessage">
            <Alerts :alertMessage="successMessage" :status="'success'" />
          </template>

          <div class="wrap-buttons">
            <button type="button" @click="closeModal" class="white">Cerrar</button>
            <button type="submit" :disabled="isLoading">{{ isLoading ? 'Registrando...' : 'Registrar' }}</button>
          </div>
        </form>
      </div>

    </div>
  </Teleport>
</template>

<style scoped>
/* El fondo oscuro que cubre toda la pantalla */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Oscurece el resto */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Siempre arriba de todo */
}

/* La caja blanca del formulario */
.modal-content {
    max-width: 560px;
    display: grid;
    grid-gap: 20px;
    background: white;
    padding: 30px;
    border-radius: 8px;
    width: 100%;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Botón "X" de cerrar */
.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

/* Estilos básicos del formulario */
form{
    display: grid;
    grid-gap: 12px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.wrap-column {
    display: flex;
    gap: 20px;
    width: 100%;
}
.wrap-buttons{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>