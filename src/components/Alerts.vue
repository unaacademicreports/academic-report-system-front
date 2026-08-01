<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        alertMessage: String,
        status: String
    })
</script>

<template>
    <span v-if="alertMessage" :class="`alert alert-${status}`">
        {{ alertMessage }}
    </span>
</template>

<style scoped>
    .alert {
        padding: 10px 15px;
        font-size: 12px;
        border-radius: 4px;
        text-align: center;
    }
    .alert-error {
        background-color: var(--bg-color-error);
        color: var(--color-error);
    }
    .alert-success{
        background-color: var(--bg-color-success);
        color: var(--color-success);
    }
    .alert-alert {
        background-color: var(--bg-color-alert);
        color: var(--color-alert);
    }

    /*  */
    .alert-INSERT,
    .alert-UPDATE,
    .alert-DELETE {
        padding: 4px 8px;
        font-size: 10px;
    }

    .alert-INSERT {
        background-color: var(--bg-color-success);
        color: var(--color-success);
    }
    .alert-UPDATE {
        background-color: #DBEAFE;
        color: var(--color-primary);
    }
    .alert-DELETE {
        background-color: var(--bg-color-alert);
        color: var(--color-alert);
    }
</style>