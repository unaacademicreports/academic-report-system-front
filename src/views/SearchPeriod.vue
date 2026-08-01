<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { storeToRefs } from 'pinia';
    import { BASE_URL } from '../services/api.js';

    // Stores
    import { useUnaStore } from '../stores/data-una';
    import { useStudentStore } from '../stores/student';

    // Components
    // import PeriodsForm from '../components/PeriodsForm.vue';
    import IdentificationForm from '../components/IdentificationForm.vue';
    import TableAcademicReport from '../components/TableAcademicReport.vue';

    const periodSelected = ref(null);

    const handlePeriodSubmit = (payload) => {
        if (typeof payload === 'string') {
            const period = unaStore.academicPeriods.find(p => p.code === payload);
            periodSelected.value = period || { code: payload };
        } else {
            const period = unaStore.academicPeriods.find(p => p.id === payload.period);
            periodSelected.value = period || { id: payload.period };
        }
    };

    const studentStore = useStudentStore();
    const { studentData, isLoading, error } = storeToRefs(studentStore);

    const identificationSubmit = ref(null);
    const handleIdentificationSubmit = async (payload) => {
        identificationSubmit.value = payload.identification;
        await studentStore.fetchStudent(payload.identification);
    };

    const unaStore = useUnaStore();
    const { periodsIsLoading, academicPeriods, periodsErrorMessage } = storeToRefs(unaStore);
    onMounted(() => {
        unaStore.fetchAcademicPeriods();
        studentStore.clearStudent();
    });

    const studentReport = computed(() => {
        if (!studentData.value || !periodSelected.value) return null;
        // Buscar el periodo específico dentro de los datos del estudiante
        return studentData.value.periodos.find(p => p.id === periodSelected.value.id || p.codigo === periodSelected.value.code);
    });

    const getPdf = () => {
        if (!studentData.value || !periodSelected.value) return;
        const url = `${BASE_URL}/exports/pdf/${studentData.value.cedula}/${periodSelected.value.id}`;
        window.open(url, '_blank');
    };
</script>

<template>
    <div id="search-period">
        <section class="hero">
            <h2>Búsqueda de Periodos Académicos</h2>
        </section>

        <section v-if="periodsIsLoading">
            <p>Cargando Periodos Académicos...</p>
        </section>

        <section v-else-if="periodsErrorMessage">
            <p>Cargando Periodos Académicos...</p>
        </section>

        <section v-else-if="academicPeriods.length === 0">
            <p>No se encontraron periodos académicos</p>
        </section>

        <section class="periods" v-else-if="academicPeriods.length > 0">
            <div class="wrap-periods">
                <a v-for="period in academicPeriods" @click="handlePeriodSubmit(period.code)" :class="['period', { selected: periodSelected?.code === period.code }]">
                    <span>Periodo Académico</span>
                    <h3 class="period-code">{{ period.code }}</h3>
                </a>
            </div>
            <div class="report-student">
                <div v-if="periodSelected" class="search-student">
                    <IdentificationForm @submit-identification="handleIdentificationSubmit" />
                </div>

                <div v-if="studentData && studentReport" class="student">
                    <div class="student-data">
                        <h4>{{ studentData.nombre }}</h4>
                        <span>{{ studentData.cedula }}</span>
                        <div class="info-box">
                            <p class="small-title">Carrera</p>
                            <h6 class="big-text">{{ studentData.carrera }}</h6>
                        </div>
                    </div>
                    <TableAcademicReport :data="studentReport.materias" />
                    <button @click="getPdf">Descargar Ficha Académica</button>
                </div>
                <div v-if="isLoading" class="loading-section">
                    <h2>Cargando...</h2>
                </div>
                <div v-if="error" class="error-section">
                    <h2>{{ error }}</h2>
                </div>
                <div v-if="studentData && !studentReport" class="no-report-section">
                    <h2>No se encontraron registros de este estudiante en el periodo seleccionado.</h2>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
    #search-period {
        display: grid;
        grid-gap: 20px;
        padding: 20px;
    }
    
    #search-period .periods {
        display: flex;
        align-items: start;
        gap: 20px;
    }
    /*  */
    #search-period .periods .wrap-periods {
        min-width: 280px;
        display: grid;
        grid-gap: 10px;
        padding: 20px;

        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }
    #search-period .periods .wrap-periods .period {
        display: flex;
        flex-direction: column;
        align-items: center;
        grid-gap: 6px;
        width: 100%;

        padding: 20px;
        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;

        text-decoration: none;
        cursor: pointer;

        transition: all 0.3s ease;
    }
    #search-period .periods .wrap-periods .period.selected {
        border-color: var(--color-primary);
    }
    #search-period .periods .wrap-periods .period:hover {
        border-color: #00408A;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    }
    #search-period .periods .wrap-periods .period h3 {
        font-family: var(--font-body);
        font-size: 14px;
        font-weight: 600;
        color: #0D1C2E;
    }
    #search-period .periods .wrap-periods .period span {
        font-size: 12px;
        font-weight: 400;
        color: #424751;
    }
    /*  */
    #search-period .periods .search-student {
        display: grid;
        grid-gap: 20px;
        padding: 20px;
        width: 100%;
        
        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }
    #search-period .periods .student {
        display: grid;
        grid-gap: 20px;
        padding: 20px;
        width: 100%;
        
        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }
    #search-period .periods .report-student {
        width: 100%;
        display: grid;
        grid-gap: 20px;
    }
    @media (max-width: 980px) {
        #search-period .periods {
            display: grid;
            grid-template-columns: repeat(1,1fr);
        }
        #search-period .periods .wrap-periods {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: scroll;
            scroll-behavior: smooth;
        }
        #search-period .periods .wrap-periods .period {
            max-width: 200px;
        }
    }
</style>