<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        alertMessage: String,
        status: String
    })
</script>

<template>
    <span v-if="alertMessage" :class="`tag tag-${status}`">
        {{ alertMessage }}
    </span>
</template>

<style scoped>
    .tag {
        padding: 4px 8px;
        font-size: 10px;
        border-radius: 4px;
        text-align: center;
    }
    .tag-INSERT,
    .tag-success,
    .tag-CREACIÓN {
        background-color: var(--bg-color-success);
        color: var(--color-success);
    }
    .tag-UPDATE,
    .tag-ACTUALIZACIÓN {
        background-color: #DBEAFE;
        color: var(--color-primary);
    }
    .tag-DELETE,
    .tag-ELIMINACIÓN {
        background-color: var(--bg-color-alert);
        color: var(--color-alert);
    }
</style>