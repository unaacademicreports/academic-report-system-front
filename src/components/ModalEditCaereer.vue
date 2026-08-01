<script setup>
    import { ref, watch } from 'vue';
    import Alerts from './Alerts.vue';
    import { useUnaStore } from '../stores/data-una.js';

    const props = defineProps({
        isOpen: Boolean,
        careerId: [Number, String]
    });

    const emit = defineEmits(['close', 'career-updated']);
    const unaStore = useUnaStore();

    const code = ref("");
    const name = ref("");

    const isLoading = ref(false);
    const isFetching = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const closeModal = () => {
        emit('close');
        errorMessage.value = "";
        successMessage.value = "";
    };

    watch(() => props.isOpen, async (newVal) => {
        if (newVal && props.careerId) {
            isFetching.value = true;
            errorMessage.value = "";
            try {
                // Buscamos la carrera en el store
                const career = unaStore.careers.find(c => c.id === props.careerId);
                if (career) {
                    code.value = career.code || "";
                    name.value = career.name || "";
                } else {
                    errorMessage.value = "Carrera no encontrada.";
                }
            } catch (error) {
                console.error("Error al obtener carrera:", error);
                errorMessage.value = "Error al cargar los datos de la carrera.";
            } finally {
                isFetching.value = false;
            }
        }
    });

    const handleUpdate = async () => {
        if (!code.value.trim() || !name.value.trim()) {
            errorMessage.value = "Todos los campos son obligatorios.";
            return;
        }

        try {
            isLoading.value = true;
            errorMessage.value = "";
            successMessage.value = "";

            const payload = {
                name: name.value
            };

            const response = await unaStore.updateCareer(props.careerId, payload);
            
            if (response.status === 'success') {
                successMessage.value = "Carrera actualizada exitosamente.";
                emit('career-updated');
                setTimeout(() => {
                    closeModal();
                    // Refrescamos las carreras
                    unaStore.fetchCareers();
                }, 1500);
            } else {
                errorMessage.value = response.message || "Error al actualizar la carrera.";
            }
        }
        catch (error) {
            console.error('Error al actualizar la carrera:', error);
            errorMessage.value = error.message || 'Error desconocido al actualizar la carrera';
        }
        finally {
            isLoading.value = false;
        }
    };

    const handleDelete = async () => {
        if (!props.careerId) {
            errorMessage.value = "ID de carrera no válido.";
            return;
        }

        try {
            isLoading.value = true;
            errorMessage.value = "";
            successMessage.value = "";

            const response = await unaStore.deleteCareer(props.careerId);
            
            if (response.status === 'success') {
                successMessage.value = "Carrera eliminada exitosamente.";
                emit('career-updated');
                setTimeout(() => {
                    closeModal();
                    unaStore.fetchCareers();
                }, 1500);
            } else {
                errorMessage.value = response.message || "Error al eliminar la carrera.";
            }
        }
        catch (error) {
            console.error('Error al eliminar la carrera:', error);
            errorMessage.value = error.message || 'Error desconocido al eliminar la carrera';
        }
        finally {
            isLoading.value = false;
        }
    };
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-backdrop" @click.self="closeModal">
      
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        
        <section class="hero">
            <h2>Edición de Carrera</h2>
        </section>
        
        <div v-if="isFetching" class="loading-state">
            Cargando datos...
        </div>
        
        <form v-else @submit.prevent="handleUpdate">
            <div class="wrap-input">
                <label for="codeEdit">Código</label>
                <input v-model="code" type="text" name="code" id="codeEdit" placeholder="Ej. LNI" disabled>
            </div>
            <div class="wrap-input">
                <label for="nameEdit">Nombre de la Carrera</label>
                <input v-model="name" type="text" name="name" id="nameEdit" placeholder="Ej. Licenciatura en Informática">
            </div>
          
          <template v-if="errorMessage">
            <Alerts :alertMessage="errorMessage" :status="'error'" />
          </template>
          <template v-if="successMessage">
            <Alerts :alertMessage="successMessage" :status="'success'" />
          </template>

          <div class="wrap-buttons">
            <button type="button" @click="closeModal" class="white">Cancelar</button>
            <button type="submit" :disabled="isLoading">{{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}</button>
          </div>
        </form>
      </div>

    </div>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
    max-width: 560px;
    display: grid;
    grid-gap: 20px;
    background: white;
    padding: 30px;
    border-radius: 8px;
    width: 100%;
    position: relative;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

form {
    display: grid;
    grid-gap: 12px;
}
.wrap-input {
    display: flex;
    flex-direction: column;
}
.wrap-input label {
  margin-bottom: 5px;
  font-weight: bold;
}
.wrap-input input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.wrap-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-top: 10px;
}
button[type="submit"]:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
.loading-state {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: #666;
}
</style>
