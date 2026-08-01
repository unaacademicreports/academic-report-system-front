import { defineStore } from "pinia";
import { ref } from "vue";

import apiFetch from '../services/api';

export const useAuditStore = defineStore('audit', () => {

    ////
    //
    // ✅ REPORTS ACTIVITIES
    //
    ////
    const isLoadingReports = ref(true);
    const errorReports = ref(null);
    const activitiesReports = ref(null);
    const fetchActivitiesReports = async (page = 1) => {
        isLoadingReports.value = true;
        errorReports.value = null;
        try {
            // const request = await apiFetch('/reports/audit/reports', {
            const request = await apiFetch(`/reports?page=${page}`, {
                method: 'GET',
            });

            if (!request.ok) {
                if (request.status === 404) throw new Error("Actividades no encontradas.");
                throw new Error("Error de conexión con el servidor.");
            }

            const jsonResponse = await request.json();
            activitiesReports.value = jsonResponse.data;

        } catch (err) {
            console.error("Error en la búsqueda:", err);
            errorReports.value = err.message;
        } finally {
            isLoadingReports.value = false;
        }
    }


    const activities = ref(null);
    const isLoading = ref(false);
    const error = ref(null);
    const fetchActivities = async (page = 1) => {
        isLoading.value = true;
        error.value = null;

        try {
            const request = await apiFetch(`/reports/audit/users?page=${page}`, {
                method: 'GET',
            });

            if (!request.ok) {
                if (request.status === 404) throw new Error("Actividades no encontradas.");
                throw new Error("Error de conexión con el servidor.");
            }

            const jsonResponse = await request.json();
            activities.value = jsonResponse.data;

        } catch (err) {
            console.error("Error en la búsqueda:", err);
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    return {
        activities,
        isLoading,
        error,
        fetchActivities,

        activitiesReports,
        isLoadingReports,
        errorReports,
        fetchActivitiesReports,
    };
});