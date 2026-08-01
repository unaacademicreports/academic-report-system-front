<script setup>
    const props = defineProps({
        academicPeriods: {
            type: Array,
            required: true,
            default: () => []
        }
    });
</script>

<template>
    <section class="container-cards-periods">
        <template v-for="period in props.academicPeriods" :key="period.id">
            <div class="card-period">
                <span>Periodo:</span>
                <h3>{{ period.code }}</h3>
                <p>{{ period.status }}</p>
            </div>
        </template>
    </section>
</template>

<style scoped>
    .container-cards-periods {
        display: flex;
        gap: 10px;
    }

    .card-period {
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .card-period span {
        font-size: 12px;
        font-style: italic;
    }
    .card-period h3 {
        font-weight: bold;
        font-size: 20px;
        margin-top: 8px;
    }
</style>