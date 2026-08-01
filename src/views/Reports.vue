<script setup>
    //import
    import { onMounted, ref } from 'vue';
    import { useUnaStore } from '../stores/data-una.js';
    //components
    import UploadArchive from '../components/UploadArchive.vue';

    //store
    const unaStore = useUnaStore();

    //state
    const reports = ref([]);

    //mounted
    onMounted(async () => {
        try {
            await unaStore.fetchAcademicPeriods();
            reports.value = unaStore.academicPeriods;
        } catch (error) {
            console.log(error);
        } finally {
            reports.value = unaStore.academicPeriods;
        }
    });

    const deleteReport = async (code) => {
        if(confirm("¿Está seguro de que desea eliminar este periodo académico y todos sus registros asociados?")) {
            try {
                await unaStore.deleteReport(code);

                reports.value = unaStore.academicPeriods;
            } catch (error) {
                console.log(error);
            } finally {
                reports.value = unaStore.academicPeriods;
            }
        }
    }
</script>

<template>
    <div id="reports">
        <section class="hero">
            <h2>Reportes Académicos</h2>
            <p>Información general de los reportes académicos registrados en el sistema.</p>
        </section>

        <section class="upload-reports">
            <UploadArchive />
            <div class="instructions">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 15H11V9H9V15V15M10 7C10.2833 7 10.5208 6.90417 10.7125 6.7125C10.9042 6.52083 11 6.28333 11 6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6C9 6.28333 9.09583 6.52083 9.2875 6.7125C9.47917 6.90417 9.71667 7 10 7V7M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20V20M10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18V18M10 10V10V10V10V10V10V10V10V10V10" fill="#00408A"/>
                </svg>
                <div class="content">
                    <h3>Instrucciones de formato</h3>
                    <ul>
                        <li>
                            <p>Los archivos deben ser de un formato válido <b>.rep</b></p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="wrap-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre de Archivo</th>
                        <th>Codigo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="report in reports" :key="report.id">
                        <td>{{ report.id }}</td>
                        <td>{{ report.source_file }}</td>
                        <td>{{ report.code }}</td>
                        <td><button class="action-button" @click="deleteReport(report.code)">Eliminar</button></td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>

<style scoped>
    #reports {
        padding: 20px;
        display: grid;
        grid-gap: 20px;
    }
    #reports .upload-reports {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
    }
    #reports .upload-reports .instructions {
        background-color: #EFF4FF;
        border: 1px solid var(--color-border);
        padding: 20px;
        border-radius: 8px;
        
        display: grid;
        grid-template-columns: 20px 1fr;
        grid-gap: 12px;
    }
    #reports .upload-reports .instructions .content {
        display: grid;
        grid-gap: 12px;
    }
    #reports .upload-reports .instructions h3 {
        font-family: var(--font-body);
        font-size: 14px;
        font-weight: 700;
        color: #0D1C2E;
    }
    #reports .upload-reports .instructions ul {
        list-style-type: none;
        padding-left: 20px;
        display: grid;
        grid-gap: 12px;
    }
    #reports .upload-reports .instructions ul li p {
        font-size: 14px;
        font-weight: 400;
        color: #424751;
    }
</style>