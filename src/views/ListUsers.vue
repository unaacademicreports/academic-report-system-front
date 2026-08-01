<script setup>
    import { onMounted, ref } from 'vue';
    import { useAuthStore } from '../stores/auth';
    import { useRouter } from 'vue-router';

    // Components
    import Tags from '../components/Tags.vue';
    import RegisterUserModal from '../components/RegisterUserModal.vue';
    import ModalEditUser from '../components/ModalEditUser.vue';
    import Pagination from '../components/Pagination.vue';

    // Icons
    import EditIcon from '../components/icons/old/EditIcon.vue'
    import DeleteIcon from '../components/icons/old/DeleteIcon.vue'

    const authStore = useAuthStore();
    const router = useRouter();

    const users = ref([]);
    const pagination = ref(null);
    const isLoading = ref(false);
    const errorMessage = ref('');

    const isModalOpen = ref(false);
    const isEditModalOpen = ref(false);
    const selectedUserId = ref(null);

    const openEditModal = (id) => {
        selectedUserId.value = id;
        isEditModalOpen.value = true;
    };

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            try {
                const response = await authStore.deleteUser(id);
                if (response && response.status === 'success') {
                    users.value = users.value.filter(user => user.id !== id);
                    alert("Usuario eliminado con éxito");
                } else {
                    alert(response?.message || response?.mensaje || "Hubo un error al eliminar el usuario");
                }
            } catch (error) {
                console.error("Error al eliminar el usuario", error);
                alert("Hubo un error al eliminar el usuario");
            }
        }
    };

    const fetchUsers = async (page = 1) => {
        isLoading.value = true;
        errorMessage.value = '';
        try {
            const response = await authStore.getUsers(page);
            if (response && response.status === 'error') {
                errorMessage.value = response.mensaje || 'Error al cargar los usuarios';
            } else if (response && response.users && Array.isArray(response.users)) {
                users.value = response.users;
                pagination.value = response;
            } else if (response && response.data && Array.isArray(response.data)) {
                users.value = response.data;
                pagination.value = response;
            } else if (Array.isArray(response)) {
                users.value = response;
                pagination.value = null;
            } else {
                errorMessage.value = 'Formato de respuesta inesperado';
            }
        } catch (error) {
            console.error('Error al obtener los usuarios en la vista:', error);
            errorMessage.value = 'Ocurrió un error al obtener la lista de usuarios';
        } finally {
            isLoading.value = false;
        }
    };

    onMounted(async () => {
        await fetchUsers(1);
    });
</script>

<template>
    <RegisterUserModal :isOpen="isModalOpen" @close="isModalOpen = false" />
    <ModalEditUser :isOpen="isEditModalOpen" :userId="selectedUserId" @close="isEditModalOpen = false" />
    <div id="user-administration">
        <section class="hero">
            <h2>Administración de Usuarios</h2>
            <p>Información general de los usuarios administrativos registrados en el sistema.</p>
        </section>

        <section class="options">
            <div class="register-button">
                <button @click="isModalOpen = true" class="open-btn">
                Registrar Usuario
                </button>
            </div>
        </section>

        <section v-if="isLoading" class="">
            <p>Cargando usuarios...</p>
        </section>

        <section v-else-if="users.length === 0" class="">
            <p>No hay usuarios</p>
        </section>

        <section v-else-if="users.length > 0" class="wrap-table">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Roles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id || user.email || user.username">
                        <td>{{ user.firstname }} {{ user.lastname }}</td>
                        <td>{{ user.username }}</td>
                        <td>{{ user.email }}</td>
                        <td><Tags :alertMessage="user.is_active ? 'Activo' : 'Inactivo'" :status="user.is_active ? 'success' : 'error'" /></td>
                        <td>{{ user.roles }}</td>
                        <td>
                            <button :class="'action-button'" @click="openEditModal(user.id)" style="cursor: pointer; background: none;">
                                Editar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <Pagination 
            v-if="pagination" 
            :pagination="pagination" 
            @changePage="fetchUsers" 
        />
    </div>
</template>

<style scoped>
    #user-administration {
        padding: 20px;
        display: grid;
        grid-gap: 20px;
    }
</style>
