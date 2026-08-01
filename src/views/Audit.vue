<script setup>
    import { onMounted, ref } from 'vue';
    import { useAuditStore } from '../stores/audit';

    // Components
    import TableAuditUsers from '../components/TableAuditUsers.vue';
    import TableAuditReports from '../components/TableAuditReports.vue';

    const auditStore = useAuditStore();

    const historySelected = ref('users_activity');

    const activitiesUsers = ref([]);
    const paginationUsers = ref(null);
    const activitiesUsersLoading = ref(false);
    const activitiesUsersErrorMessage = ref('');

    const activitiesReports = ref([]);
    const paginationReports = ref(null);
    const activitiesReportsLoading = ref(false);
    const activitiesReportsErrorMessage = ref('');

    const fetchUsersPage = async (page = 1) => {
        activitiesUsersLoading.value = true;
        activitiesUsersErrorMessage.value = '';
        try {
            await auditStore.fetchActivities(page);
            activitiesUsers.value = auditStore.activities?.audit_records || [];
            paginationUsers.value = auditStore.activities || null;
        } catch (error) {
            console.error('Error al obtener la página de actividades de usuarios:', error);
            activitiesUsersErrorMessage.value = 'Ocurrió un error al obtener la lista de actividades';
        } finally {
            activitiesUsersLoading.value = false;
        }
    };

    const fetchReportsPage = async (page = 1) => {
        activitiesReportsLoading.value = true;
        activitiesReportsErrorMessage.value = '';
        try {
            await auditStore.fetchActivitiesReports(page);
            activitiesReports.value = auditStore.activitiesReports?.audit_records || [];
            paginationReports.value = auditStore.activitiesReports || null;
        } catch (error) {
            console.error('Error al obtener la página de actividades de reportes:', error);
            activitiesReportsErrorMessage.value = 'Ocurrió un error al obtener la lista de actividades';
        } finally {
            activitiesReportsLoading.value = false;
        }
    };

    onMounted(async () => {
        await Promise.all([
            fetchUsersPage(1),
            fetchReportsPage(1)
        ]);
    });
</script>

<template>
  <div id="audit">
    <section class="hero">
        <h2>Auditoria & Historico de Actividades</h2>
        <p>Registro inmutable de acciones administrativas y actividad de usuarios para cumplimiento institucional.</p>
    </section>

    <section>
        <ul class="audit-menu">
            <li>
                <button data-history="users_activity" :class="historySelected === 'users_activity' ? 'selected' : ''" @click="historySelected = 'users_activity'">Actividad de Usuarios</button>
            </li>
            <li>
                <button data-history="reports_activity" :class="historySelected === 'reports_activity' ? 'selected' : ''" @click="historySelected = 'reports_activity'">Carga de Reportes y Notas</button>
            </li>
        </ul>
    </section>

    <template v-if="historySelected === 'reports_activity'">
        <TableAuditReports 
            :activities="activitiesReports" 
            :pagination="paginationReports" 
            :loading="activitiesReportsLoading" 
            @changePage="fetchReportsPage" 
        />
    </template>

    <template v-if="historySelected === 'users_activity'">
        <TableAuditUsers 
            :activities="activitiesUsers" 
            :pagination="paginationUsers" 
            :loading="activitiesUsersLoading" 
            @changePage="fetchUsersPage" 
        />
    </template>
    
  </div>
</template>

<style scoped>
    #audit {
        padding: 20px;
        display: grid;
        grid-gap: 20px;
    }
    #audit ul.audit-menu {
        width: 100%;
        list-style: none;
        display: flex;
        gap:5px;

        border-bottom: 1px solid var(--color-border);
    }
    #audit ul.audit-menu li button {
        background-color: transparent;
        color: var(--color-neutral);
        border-radius: 0;
        border: 1px solid transparent;
        border-bottom: 2px solid transparent;

        transition: border-color .2s ease;
    }
    #audit ul.audit-menu li button.selected {
        border-bottom: 2px solid var(--color-primary);
        color: var(--color-primary);
    }
</style>