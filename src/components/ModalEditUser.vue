<script setup>
    import { ref, watch } from 'vue';

    // Stores
    import { useAuthStore } from '../stores/auth.js';
    import Alerts from './Alerts.vue';

    const props = defineProps({
        isOpen: Boolean,
        userId: [Number, String]
    });

    const emit = defineEmits(['close', 'user-updated']);
    const authStore = useAuthStore();
    const roles = ref([]);

    const firstname = ref("");
    const lastname = ref("");
    const username = ref("");
    const email = ref("");
    const roleId = ref("");
    const isActive = ref(true);

    const nameRegex = /^[A-Za-z]{3,16}$/;
    const usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,16}$/;

    const isLoading = ref(false);
    const isFetching = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const closeModal = () => {
        emit('close');
        errorMessage.value = "";
        successMessage.value = "";
    };

    const handleDelete = async () => {
        if(confirm("¿Está seguro de que desea eliminar este usuario?")) {
            try {
                isLoading.value = true;
                errorMessage.value = "";
                successMessage.value = "";

                const response = await authStore.deleteUser(props.userId);
                
                if (response && response.status == 'success') {
                    successMessage.value = "Usuario eliminado exitosamente.";
        
                    emit('user-updated');
        
                    setTimeout(() => {
                        closeModal();
                        window.location.reload();
                    }, 1500);
                } else {
                    errorMessage.value = response?.message || response?.mensaje || "Error al eliminar el usuario";
                }

            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
                errorMessage.value = error.message || 'Error desconocido al eliminar el usuario';
            } finally {
                isLoading.value = false;
            }
        }
    };

    // Al abrir el modal, cargamos los datos del usuario
    watch(() => props.isOpen, async (newVal) => {
        if (newVal && props.userId) {
            isFetching.value = true;
            errorMessage.value = "";
            try {
                if (roles.value.length === 0) {
                    roles.value = await authStore.fetchAllRoles();
                }

                const user = await authStore.getUserById(props.userId);
                if (user) {
                    firstname.value = user.firstname || "";
                    lastname.value = user.lastname || "";
                    username.value = user.username || "";
                    email.value = user.email || "";
                    isActive.value = user.is_active !== undefined ? user.is_active : true;
                    // Asignamos el rol, tratando de encontrarlo por su nombre o usando el role_id si existe
                    if (user.role_id) {
                        roleId.value = user.role_id;
                    } else if (user.roles && roles.value.length > 0) {
                        // En la tabla dice user.roles, podríamos hacer match con el nombre
                        const roleName = Array.isArray(user.roles) ? user.roles[0] : user.roles;
                        const matchedRole = roles.value.find(r => r.name === roleName);
                        if (matchedRole) {
                            roleId.value = matchedRole.id;
                        }
                    }
                }
            } catch (error) {
                console.error("Error al obtener usuario:", error);
                errorMessage.value = "Error al cargar los datos del usuario.";
            } finally {
                isFetching.value = false;
            }
        }
    });

    const handleUpdate = async () => {
        if (!firstname.value.trim() || !lastname.value.trim() || !username.value.trim() || !email.value.trim() || !roleId.value) {
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

        // if(!usernameRegex.test(username.value.trim())) {
        //     errorMessage.value = "El nombre de usuario es inválido, debe contener de 6 a 16 caracteres y solo letras.";
        //     return;
        // }

        if (!email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            errorMessage.value = "El correo electrónico no es válido.";
            return;
        }

        try {
            isLoading.value = true;
            errorMessage.value = "";
            successMessage.value = "";

            const payload = {
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                is_active: isActive.value
            };

            let response = await authStore.updateUser(props.userId, payload);
            
            if ( response.status == 'success') {
                successMessage.value = "Usuario actualizado exitosamente.";
    
                emit('user-updated');

                const selectedRole = roles.value.find(r => r.id === roleId.value);
                const roleName = selectedRole ? selectedRole.name : roleId.value;

                response = await authStore.updateUserRole(props.userId, {
                    role: roleName
                });

                if ( response.status == 'success') {
                    successMessage.value = "Usuario actualizado exitosamente.";
        
                    emit('user-updated');
        
                    setTimeout(() => {
                        closeModal();
                        window.location.reload();
                    }, 1500);
                } else {
                    errorMessage.value = response.message
                }
            } else {
                errorMessage.value = response.message
            }

        }
        catch (error) {
            console.error('Error al actualizar el usuario:', error);
            errorMessage.value = error.message || 'Error desconocido al actualizar el usuario';
        }
        finally {
            isLoading.value = false;
        }
    };
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
      
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        
        <section class="hero">
            <h2>Edición de Usuario</h2>
        </section>
        
        <div v-if="isFetching" class="loading-state">
            Cargando datos...
        </div>
        
        <form v-else @submit.prevent="handleUpdate">
            <div class="wrap-column">
                <div class="wrap-input">
                    <label for="firstnameEdit">Nombre</label>
                    <input v-model="firstname" type="text" name="firstname" id="firstnameEdit">
                </div>
                <div class="wrap-input">
                    <label for="lastnameEdit">Apellido</label>
                    <input v-model="lastname" type="text" name="lastname" id="lastnameEdit">
                </div>
            </div>
            <div class="wrap-input">
                <label for="emailEdit">Correo</label>
                <input v-model="email" type="email" name="email" id="emailEdit">
            </div>
            <!-- <div class="wrap-input">
                <label for="usernameEdit">Nombre de usuario</label>
                <input v-model="username" type="text" name="username" id="usernameEdit">
            </div> -->
            <div class="wrap-input">
                <label for="isActiveEdit">Estado</label>
                <select v-model="isActive" name="isActive" id="isActiveEdit">
                    <option :value="true">Activo</option>
                    <option :value="false">Inactivo</option>
                </select>
            </div>
            <div class="wrap-input">
                <label for="roleIdEdit">Rol</label>
                <select v-model="roleId" name="roleId" id="roleIdEdit">
                    <option value="" disabled>-- Seleccione un rol --</option>
                    <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>
            </div>
          
          <template v-if="errorMessage">
            <Alerts :alertMessage="errorMessage" :status="'error'" />
          </template>
          <template v-if="successMessage">
            <Alerts :alertMessage="successMessage" :status="'success'" />
          </template>

          <div class="wrap-buttons">
            <button type="button" @click="closeModal" class="white">Cancelar</button>
            <button type="submit" :disabled="isLoading">{{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}</button>
          </div>
          <button type="button" @click="handleDelete()" class="red">Eliminar Usuario</button>
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
.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.wrap-buttons{
  display:flex;
  justify-content: space-between;
  gap: 20px;
}
.wrap-buttons button {
    width: 100%;
}
.loading-state {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: #666;
}
@media (max-width: 768px) {
    .wrap-column {
        flex-direction: column;
    }
    .wrap-buttons {
        flex-direction: column-reverse;
    }
}
</style>