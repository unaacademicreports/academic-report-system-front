<script setup>
    import { ref } from 'vue';
    import { useUnaStore } from '../stores/data-una';

    const unaStore = useUnaStore();
    const isDragging = ref(false);
    const fileInput = ref(null);

    const caerrers = ref([]);
    const careers = ref({}); // Guarda el input del usuario para cada carrera

    const addCareers = async () => {
        // Preparar datos para enviar a la API
        const dataToSave = Object.keys(careers.value).map(code => ({
            code: code,
            name: careers.value[code]
        }));
        
        console.log("Carreras a guardar:", dataToSave);

        await unaStore.fetchCreateCareers(dataToSave);
        
        
        // Aquí deberías llamar a una acción de Pinia para guardar las carreras
        // await unaStore.saveCareers(dataToSave);
        
        // Opcional: Limpiar el formulario o mostrar éxito
        // alert("Nombres de carreras registrados (simulación). Verifica la consola.");
        // caerrers.value = [];
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        isDragging.value = true;
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        isDragging.value = false;
    };

    const handleDrop = (e) => {
        e.preventDefault();
        isDragging.value = false;
        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        if (files.length > 0) {
            const file = files[0];
            if (file.name.endsWith('.REP')) {
                uploadFile(file);
            } else {
                alert('Solo se permiten archivos con extensión .rep');
            }
        }
        // Reset file input to allow selecting the same file again if needed
        if (fileInput.value) {
            fileInput.value.value = '';
        }
    };

    const uploadFile = async (file) => {
        try {
            const response = await unaStore.uploadReportFile(file);
            if (response && response.data && response.data.carreras_sin_nombre) {
                caerrers.value = response.data.carreras_sin_nombre;
            } else {
                caerrers.value = [];
            }
        } catch (error) {
            // Error handling is managed by the store, but we catch it here to prevent uncaught promise rejections
            console.error('Upload failed', error);
        }
    };

    const triggerFileInput = () => {
        fileInput.value.click();
    };
</script>

<template>
    <section class="upload-container">
        <div 
            class="dropzone" 
            :class="{ 'is-dragging': isDragging }"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
            @drop="handleDrop"
            @click="triggerFileInput"
        >
            <input 
                type="file" 
                ref="fileInput" 
                accept=".rep" 
                style="display: none" 
                @change="handleFileSelect"
            >
            <div v-if="unaStore.isReportUploading" class="upload-content">
                <p>Subiendo archivo...</p>
            </div>
            <div v-else class="upload-content">
                <svg class="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p>Arrastra y suelta tu archivo <b>.REP</b> aquí</p>
                <p class="text-sm">o haz clic para seleccionar</p>
            </div>
        </div>

        <div v-if="unaStore.reportUploadMessage" :class="['status-message', unaStore.reportUploadStatus]">
            {{ unaStore.reportUploadMessage }}
        </div>
    </section>

    <section class="add-caerrers">
        <div v-if="caerrers && caerrers.length > 0" class="careers-form-container">
            <h3>Carreras sin registrar</h3>
            <p>Se han encontrado carreras sin nombre en el archivo. Por favor, asigne un nombre a cada código:</p>
            <form @submit.prevent="addCareers()">
                <ul class="careers-list">
                    <li v-for="(code, index) in caerrers" :key="code">
                        <label :for="'carrera-' + code">Código: {{ code }}</label>
                        <input :id="'carrera-' + code" type="text" v-model="careers[code]" :placeholder="'Nombre de la carrera ' + (index + 1)" required>
                    </li>
                </ul>
                <button type="submit" class="btn-submit">Guardar Carreras</button>
            </form>
        </div>
    </section>
</template>

<style scoped>
    /* .upload-container {
        width:100%;
        background: white;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        border-radius: var(--border-radius);
    } */
    .dropzone {
        border: 2px dashed #2056A0;
        border-radius: 8px;
        padding: 40px 20px;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
        transition: all 0.3s ease;
    }

    .dropzone:hover, .dropzone.is-dragging {
        background-color: #e3e3e9;
        border-color: #1a4580;
    }

    .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #424751;
    }

    .upload-icon {
        width: 48px;
        height: 48px;
        color: #2056A0;
    }

    .text-sm {
        font-size: 14px;
        color: #666;
    }

    .status-message {
        margin-top: 15px;
        padding: 10px;
        border-radius: var(--border-radius);
        text-align: center;
        font-weight: 500;
    }

    .status-message.success {
        background-color: #d4edda;
        color: #155724;
    }

    .status-message.error {
        background-color: #f8d7da;
        color: #721c24;
    }

    /* Formulario de carreras */
    .add-caerrers {
        margin-top: 20px;
    }

    .careers-form-container {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
    }

    .careers-form-container h3 {
        margin-top: 0;
        color: #111827;
        font-size: 1.125rem;
    }

    .careers-form-container p {
        color: #4b5563;
        font-size: 0.875rem;
        margin-bottom: 15px;
    }

    .careers-list {
        list-style: none;
        padding: 0;
        margin: 0 0 20px 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .careers-list li {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .careers-list label {
        font-weight: 500;
        color: #374151;
        font-size: 0.875rem;
    }

    .careers-list input {
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.2s;
        font-family: inherit;
    }

    .careers-list input:focus {
        border-color: #2056A0;
    }

    .btn-submit {
        background-color: #2056A0;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
        font-family: inherit;
    }

    .btn-submit:hover {
        background-color: #1a4580;
    }
</style>