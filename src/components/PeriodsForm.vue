<script setup>
    import { ref, defineEmits } from 'vue';

    const emit = defineEmits(['submit-period']);

    const period = ref('');

    const handlePeriodSubmit = () => {
        if (!period.value)
            return alert("Debe seleccionar un periodo");

        emit('submit-period', {
            period: period.value
        });
    }

    const props = defineProps({
        academicPeriods: {
            type: Array,
            required: true,
            default: () => []
        }
    });
</script>

<template>
    <section>
        <form @submit.prevent="handlePeriodSubmit">
            <template v-if="props.academicPeriods">
                <select v-model="period" name="academic_period" id="academic_period">
                    <option value="">-- Seleccione un periodo --</option>
                    <option v-for="period in props.academicPeriods" :key="period.id" :value="period.id">{{ period.code }}</option>
                </select>
            </template>
            <button type="submit">Buscar</button>
        </form>
    </section>
</template>

<style scoped>
    form {
        grid-template-columns: 1fr 1fr;
    }
    form #academic_period {
        grid-column: span 2;
    }
</style>