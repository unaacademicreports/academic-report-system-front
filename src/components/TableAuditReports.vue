<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import Tags from './Tags.vue';
import Pagination from './Pagination.vue';

const props = defineProps({
    activities: {
        type: [Array, Object],
        required: true,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    pagination: {
        type: Object,
        default: () => null
    }
});

const emit = defineEmits(['changePage']);

const recordsList = computed(() => {
    if (Array.isArray(props.activities)) {
        return props.activities;
    }
    if (props.activities && Array.isArray(props.activities.audit_records)) {
        return props.activities.audit_records;
    }
    return [];
});

const paginationData = computed(() => {
    if (props.pagination) {
        return props.pagination;
    }
    if (props.activities && !Array.isArray(props.activities) && typeof props.activities === 'object') {
        return {
            page: props.activities.page ?? 1,
            pages: props.activities.pages ?? 1,
            has_next: props.activities.has_next ?? false,
            has_prev: props.activities.has_prev ?? false,
            total: props.activities.total ?? 0,
            per_page: props.activities.per_page ?? 30
        };
    }
    return null;
});

const onChangePage = (page) => {
    emit('changePage', page);
};
</script>

<template>
    <section v-if="loading">
        <p>Cargando...</p>
    </section>
    
    <section v-else-if="recordsList?.length === 0">
        <p>No hay actividades</p>
    </section>
    
    <section v-else-if="recordsList?.length > 0" class="wrap-table">
        <table>
            <thead>
                <tr>
                    <th>Fecha/Hora</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Acción</th>
                    <th>Descripción</th>
                    <th>IP</th>
                    <!-- <th>Acciones</th> -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="activity in recordsList" :key="activity._id || activity.operation_at + activity.user_email">
                    <td>{{ activity.operation_at }}</td>
                    <td>{{ activity.user_fullname || activity.user_modify || '-' }}</td>
                    <td>{{ activity.user_email }}</td>
                    <td><Tags :alert-message="activity.operation" :status="activity.operation" /></td>
                    <td>
                        <ul v-if="activity.affected_rows">
                            <li>
                                {{ activity.affected_rows.grades_deleted }} calificaciones.
                            </li>
                            <li>
                                {{ activity.affected_rows.students_deleted }} Estudiantes.
                            </li>
                        </ul>
                        <p v-else>
                            No hay registros afectados
                        </p>
                    </td>
                    <td>{{ activity.ip_address }}</td>
                </tr>
            </tbody>
        </table>
    </section>
    <Pagination 
        v-if="paginationData" 
        :pagination="paginationData" 
        @changePage="onChangePage" 
    />
</template>