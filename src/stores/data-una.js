import { ref } from 'vue';
import { defineStore } from 'pinia'

import apiFetch, { BASE_URL } from '../services/api';

export const useUnaStore = defineStore('UNA', () => {
    const academicPeriods = ref([]);
    const periodsIsLoading = ref(false);
    const periodsErrorMessage = ref(null);

    ////
    //
    // ✅ Academic Periods
    //
    ////
    const fetchAcademicPeriods = async () => {
        periodsIsLoading.value = true;
        periodsErrorMessage.value = null;

        try {
            const response = await apiFetch('/academic-periods', {
                method: 'GET',
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                academicPeriods.value = data.data.academic_periods;
            } else {
                throw new Error(data.message || 'Error fetching academic periods');
            }
        }
        catch (error) {
            console.error('Error fetching academic periods:', error);
            periodsErrorMessage.value = error.message;
        }
        finally {
            periodsIsLoading.value = false;
        }
    }

    ////
    //
    // ✅ Reports
    //
    ////
    const isReportUploading = ref(false);
    const reportUploadStatus = ref(null);
    const reportUploadMessage = ref("");

    const uploadReportFile = async (file) => {
        isReportUploading.value = true;
        reportUploadStatus.value = null;
        reportUploadMessage.value = "";

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${BASE_URL}/reports`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const responseData = await response.json();

            if (response.ok /*&& responseData.status === 'success'*/) {
                reportUploadStatus.value = 'success';
                reportUploadMessage.value = responseData.message || 'Completado.';
                return responseData;
            } else {
                throw new Error(responseData.message || 'Error al cargar el archivo');
            }
        } catch (error) {
            console.error('Error uploading report:', error);
            reportUploadStatus.value = 'error';
            reportUploadMessage.value = error.message || 'Ocurrió un error al subir el archivo.';
            throw error;
        } finally {
            isReportUploading.value = false;
        }
    };

    ////
    //
    // ✅List Reports
    //
    ////
    const listReports = async () => {
        try {
            const response = await apiFetch(`/reports`, {
                method: 'GET',
            });
            const data = await response.json();

            if (response.ok /*&& data.status === 'success'*/) {
                return data.data.reports;
            } else {
                throw new Error(data.message || 'Error fetching reports');
            }
        }
        catch (error) {
            console.error('Error fetching reports:', error);
            throw error;
        }
    }

    ////
    //
    // ✅Delete Report
    //
    ////
    const deleteReportIsLoading = ref(false);

    const deleteReport = async (code) => {
        deleteReportIsLoading.value = true;
        try {
            const response = await apiFetch(`/academic-periods/${code}`, {
                method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                return data;
            } else {
                throw new Error(data.message || 'Error deleting report');
            }
        }
        catch (error) {
            console.error('Error deleting report:', error);
            throw error;
        }
    }

    ////
    //
    // ✅Careers
    //
    ////
    const careers = ref([]);
    const careersIsLoading = ref(false);
    const careersErrorMessage = ref(null);

    const fetchCareers = async () => {
        careersIsLoading.value = true;
        careersErrorMessage.value = null;
        try {
            const response = await apiFetch('/careers', {
                method: 'GET',
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                careers.value = data.data.careers;
                careersIsLoading.value = false;
            } else {
                careersIsLoading.value = false;
                throw new Error(data.message || 'Error fetching careers');
            }
        }
        catch (error) {
            console.error('Error fetching careers:', error);
            careersErrorMessage.value = error.message;
            careersIsLoading.value = false;
        }
    }

    ////
    //
    // ✅Create Careers
    //
    ////
    const createCareersIsLoading = ref(false);
    const createCareersErrorMessage = ref(null);

    const fetchCreateCareers = async (careers) => {
        createCareersIsLoading.value = true;
        createCareersErrorMessage.value = null;
        try {
            const response = await apiFetch(`/careers`, {
                method: 'POST',
                body: JSON.stringify(careers),
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                return data.data.careers;
            } else {
                throw new Error(data.message || 'Error creating careers');
            }
        }
        catch (error) {
            console.error('Error creating careers:', error);
            throw error;
        }
    }

    ////
    //
    // ✅Update Career
    //
    ////
    const updateCareerIsLoading = ref(false);
    const updateCareerErrorMessage = ref(null);

    const updateCareer = async (id, payload) => {
        updateCareerIsLoading.value = true;
        updateCareerErrorMessage.value = null;
        try {
            const response = await apiFetch(`/careers/${id}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });
            const data = await response.json();

            if (response.ok && data.status === 'success') {
                return data;
            } else {
                throw new Error(data.message || 'Error updating career');
            }
        } catch (error) {
            console.error('Error updating career:', error);
            updateCareerErrorMessage.value = error.message;
            return { status: 'error', message: error.message || 'Error desconocido al actualizar la carrera' };
        } finally {
            updateCareerIsLoading.value = false;
        }
    }

    ////
    //
    // ✅Delete Career
    //
    ////
    const deleteCareerIsLoading = ref(false);
    const deleteCareerErrorMessage = ref(null);
    const deleteCareerSuccessMessage = ref(null);

    const deleteCareer = async (id) => {
        deleteCareerIsLoading.value = true;
        deleteCareerErrorMessage.value = null;
        deleteCareerSuccessMessage.value = null;
        try {
            const response = await apiFetch(`/careers/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                deleteCareerSuccessMessage.value = data.message;
                return data;
            } else {
                throw new Error(data.message || 'Error deleting career');
            }
        } catch (error) {
            console.error(error);
            deleteCareerErrorMessage.value = error.message;
            return { status: 'error', message: error.message || 'Error desconocido al eliminar la carrera' };
        } finally {
            deleteCareerIsLoading.value = false;
        }
    }

    return {
        // Academics Periods
        academicPeriods,
        periodsIsLoading,
        periodsErrorMessage,
        fetchAcademicPeriods,
        // Reports
        isReportUploading,
        reportUploadStatus,
        reportUploadMessage,
        uploadReportFile,
        // List reports
        listReports,
        // Delete Report
        deleteReport,
        deleteReportIsLoading,
        // Careers
        fetchCareers,
        careers,
        careersIsLoading,
        careersErrorMessage,
        // Create Careers
        createCareersIsLoading,
        createCareersErrorMessage,
        fetchCreateCareers,
        // Update Career
        updateCareerIsLoading,
        updateCareerErrorMessage,
        updateCareer,
        // Delete Career
        deleteCareerIsLoading,
        deleteCareerErrorMessage,
        deleteCareer
    }
})
