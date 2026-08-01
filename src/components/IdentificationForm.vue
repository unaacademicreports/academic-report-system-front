<script setup>
    import { ref } from 'vue';
    
    // Icons
    import SearchUser from './icons/SearchUser.vue'; 
    import Identity from './icons/Identity.vue';

    const emit = defineEmits(['submit-identification']);

    const identificationType = ref('V');
    const identificationNumber = ref('');

    const handleIdentification = () => {
        if (!identificationType.value || !identificationNumber.value.trim())
            return alert("Debe ingresar todos los datos");

        emit('submit-identification', {
            identification: `${identificationType.value}-${ identificationNumber.value.trim() }`
        });
    }
</script>

<template>
    <form @submit.prevent="handleIdentification">
        <div class="wrap-input">
            <label for="identification-type">Tipo de Identificación:</label>
            <Identity />
            <select id="identification-type" v-model="identificationType">
                <option value="V">V</option>
                <option value="E">E</option>
            </select>
        </div>
        <div class="wrap-input">
            <label for="identification-number">Identificación:</label>
            <SearchUser />
            <input type="text" id="identification-number" v-model="identificationNumber" placeholder="ej. 12345678" required>
        </div>
        <button type="submit">Buscar</button>
    </form>
</template>
<style scoped>
    form {
        display: flex;
        align-items: end;
        gap: 20px;
    }
    .wrap-input {
        display: flex;
        flex-direction: column;
    }
    @media (max-width: 820px) {
        form {
            display: grid;
            grid-template-columns: repeat(1,1fr);
        }
    }
</style>