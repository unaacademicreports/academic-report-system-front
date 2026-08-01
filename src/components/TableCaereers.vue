<script setup>
    import { onMounted, ref } from 'vue';

    import { useAuthStore } from '../stores/auth';
    import { useUnaStore } from '../stores/data-una';

    import ModalEditCaereer from './ModalEditCaereer.vue';

    const authStore = useAuthStore();
    const unaStore = useUnaStore();

    const isEditModalOpen = ref(false);
    const selectedCareerId = ref(null);

    const careers = ref([]);

    const openEditModal = (id) => {
        selectedCareerId.value = id;
        isEditModalOpen.value = true;
    };

    onMounted(async () => {
        try {
            await unaStore.fetchCareers();
            careers.value = unaStore.careers;
        } catch (error) {
            console.log(error);
        } finally {
            careers.value = unaStore.careers;
        }
    });
</script>

<template>
    <ModalEditCaereer :isOpen="isEditModalOpen" :careerId="selectedCareerId" @close="isEditModalOpen = false" />

    <section v-if="unaStore.careersIsLoading">
        <p>Cargando carreras...</p>
    </section>

    <section v-else-if="unaStore.careersErrorMessage">
        <p>{{ unaStore.careersErrorMessage }}</p>
    </section>

    <section v-else-if="careers.length === 0">
        <p>No hay carreras registradas</p>
    </section>

    <section v-else-if="careers.length > 0" class="wrap-table">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th v-if="['Admin'].includes(authStore.authData?.role)">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="career in unaStore.careers" :key="career.id">
                    <td>{{ career.id }}</td>
                    <td>{{ career.code }}</td>
                    <td>{{ career.name }}</td>
                    <td v-if="['Admin'].includes(authStore.authData?.role)">
                        <button class="action-button" @click="openEditModal(career.id)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<style scoped>
</style>