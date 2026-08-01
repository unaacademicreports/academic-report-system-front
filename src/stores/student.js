import { defineStore } from "pinia";
import { ref } from "vue";

import apiFetch from '../services/api.js';

export const useStudentStore = defineStore('student', () => {
    const studentData = ref(null);
    const isLoading = ref(false);
    const error = ref(null);

    const fetchStudent = async (identification) => {
        isLoading.value = true;
        error.value = null;
        studentData.value = null;

        try {
            const response = await apiFetch(`/students/${identification}`, {
                method: 'GET',
            });

            if (!response.ok) {
                if (response.status === 404) throw new Error("Estudiante no encontrado.");
                throw new Error("Error de conexión con el servidor.");
            }

            const jsonResponse = await response.json();
            studentData.value = jsonResponse.data;

        } catch (err) {
            console.error("Error en la búsqueda:", err);
            error.value = err.message;
        } finally {
            isLoading.value = false;
        }
    };

    // 3. Limpiar datos (útil si quieres un botón de "Nueva Búsqueda")
    const clearStudent = () => {
        studentData.value = null;
        error.value = null;
    };

    return {
        studentData,
        isLoading,
        error,
        fetchStudent,
        clearStudent
    };
});