<script setup>
    import { ref, onMounted } from 'vue';
    import { storeToRefs } from 'pinia';

    import { BASE_URL } from '../services/api.js';

    // Components
    import IdentificationForm from '../components/IdentificationForm.vue';

    //Store
    import { useStudentStore } from '../stores/student';
    import TableAcademicReport from '../components/TableAcademicReport.vue';

    const studentStore = useStudentStore();
    const { studentData, isLoading, error } = storeToRefs(studentStore);
    
    // ✅
    const getPdf = () => {
        if (!selectedPeriod.value) return;

        const url = `${BASE_URL}/exports/pdf/${studentData.value.cedula}/${selectedPeriod.value.id}`;
        
        window.open(url, '_blank');
    }

    const selectedPeriod = ref(null);
    // ✅
    const showDetailsPeriod = (period) => {
        selectedPeriod.value = period;
    }

    // ✅
    const handleIdentificationSubmit = async ({ identification }) => {
        selectedPeriod.value = null;
        await studentStore.fetchStudent(identification);
    }

    // ✅
    onMounted(() => {
        studentStore.clearStudent();
    })
</script>

<template>
    <div id="serch-students">
        <section class="hero">
            <h2>Búsqueda de Estudiantes</h2>
            <p>Información general del estudiante.</p>
        </section>

        <section class="identification-form">
            <IdentificationForm @submit-identification="handleIdentificationSubmit" />
        </section>

        <section class="student">
            <div v-if="isLoading" class="loading-message">
                <h3>Cargando...</h3>
            </div>

            <div v-else-if="error" class="error-message">
                <h3>{{ error }}</h3>
            </div>

            <div v-else-if="studentData" class="wrap-data">
                <div class="student-data">
                    <div class="avatar">
    
                    </div>
                    <h5>{{ studentData.nombre }}</h5>
                    <p>{{ studentData.cedula }}</p>
    
                    <div class="info-box">
                        <p class="small-title">Carrera</p>
                        <h6 class="big-text">{{ studentData.carrera }}</h6>
                    </div>
                </div>
                <div class="academic-data">
                    <h5>Periodos Académicos Disponibles</h5>

                    <ul>
                        <li v-for="period in studentData.periodos">
                            <a @click="showDetailsPeriod(period)" :class="{ selected: selectedPeriod === period }">
                                <span>{{ period.codigo }}</span>
                            </a>
                        </li>
                    </ul>

                    <TableAcademicReport :data="selectedPeriod.materias" v-if="selectedPeriod" />

                    <button v-if="selectedPeriod" @click="getPdf">Descargar Ficha Académica</button>
                </div>
            </div>
        </section>
    </div>

</template>

<style scoped>
    #serch-students {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;

    }
    #serch-students .identification-form {
        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 20px;
    }
    #serch-students .student {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
    }
    #serch-students .student .wrap-data {
        /* display: grid;
        grid-template-columns: 300px 1fr;
        grid-gap: 20px; */
        display: flex;
        align-items: start;
        gap: 20px;
    }
    #serch-students .student .student-data {
        min-width: 280px;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 12px;

        align-items: center;
        padding: 20px;
        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;

        text-align: center;
    }
    #serch-students .student .student-data .avatar {
        border-radius: 50%;
        width: 64px;
        height: 64px;
        background-color: #EFF4FF;
    }
    #serch-students .student .student-data h5 {
        font-family: var(--font-body);
        font-size: 20px;
        font-weight: 600;
        color: var(--color-secondary);
    }
    #serch-students .student .student-data p {
        font-family: var(--font-body);
        font-size: 14px;
        color: #424751;
    }
    #serch-students .student .student-data .info-box {
        display: grid;
        justify-content: start;
        width: 100%;
        grid-gap: 5px;
        background-color: #EFF4FF;
        border-radius: 8px;
        padding: 20px;
    }
    #serch-students .student .student-data .info-box .small-title {
        display: grid;
        grid-gap: 5px;
        font-size: 12px;
        font-weight: 400;
        color: #737783;
    }
    #serch-students .student .student-data .info-box .big-text {
        display: grid;
        grid-gap: 5px;
        font-size: 16px;
        font-weight: 500;
        color: #0D1C2E;
    }
    /*  */
    #serch-students .student .academic-data {
        background-color: #fff;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        padding: 20px;
        width: 100%;

        display: grid;
        grid-gap: 20px;
    }
    #serch-students .student .academic-data h5 {
        font-family: var(--font-body);
        font-size: 20px;
        font-weight: 600;
        color: var(--color-secondary);
    }
    #serch-students .student .academic-data ul {
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;

    }
    
    #serch-students .student .academic-data ul li a {
        display: block;
        padding: 20px 15px;
        border: 1px solid var(--color-border);
        border-radius: 8px;

        color: #0D1C2E;
        text-decoration: none;
        cursor: pointer;

        transition: all 0.3s ease;
    }
    #serch-students .student .academic-data ul li a:hover {
        background-color: #D7E2FF;
        border-color: #2158A9;
        color: #0D1C2E;
    }
    #serch-students .student .academic-data ul li a.selected {
        border-color: var(--color-primary);
    }
    @media (max-width: 980px) {
        #serch-students .student .wrap-data {
            display: grid;
            grid-template-columns: repeat(1,1fr);
        }
    }
</style>