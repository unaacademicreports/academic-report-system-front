<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
    pagination: {
        type: Object,
        default: () => null
    }
});

const emit = defineEmits(['changePage']);

const currentPage = computed(() => props.pagination?.page ?? props.pagination?.currentPage ?? 1);
const totalPages = computed(() => props.pagination?.pages ?? props.pagination?.totalPages ?? 1);
const hasPrev = computed(() => props.pagination?.has_prev ?? props.pagination?.hasPrev ?? (currentPage.value > 1));
const hasNext = computed(() => props.pagination?.has_next ?? props.pagination?.hasNext ?? (currentPage.value < totalPages.value));
const totalRecords = computed(() => props.pagination?.total ?? props.pagination?.totalRecords ?? 0);
const perPage = computed(() => props.pagination?.per_page ?? props.pagination?.perPage ?? 30);

const displayedPages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;

    if (total <= 7) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 4) {
        return [1, 2, 3, 4, 5, '...', total];
    }

    if (current >= total - 3) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
});

const changePage = (page) => {
    if (typeof page !== 'number' || page < 1 || page > totalPages.value || page === currentPage.value) {
        return;
    }
    emit('changePage', page);
};
</script>

<template>
    <section v-if="pagination && totalPages > 0" class="wrap-pagination">
        <div class="pagination-info" v-if="totalRecords > 0">
            Mostrando <span>{{ (currentPage - 1) * perPage + 1 }}</span> a <span>{{ Math.min(currentPage * perPage, totalRecords) }}</span> de <span>{{ totalRecords }}</span> registros
        </div>
        <div class="pagination-info" v-else>
            Página <span>{{ currentPage }}</span> de <span>{{ totalPages }}</span>
        </div>

        <ul class="pagination">
            <li>
                <button 
                    type="button"
                    class="btn-page nav-btn" 
                    :disabled="!hasPrev" 
                    @click="changePage(currentPage - 1)"
                    title="Página anterior"
                >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                    <span>Anterior</span>
                </button>
            </li>
            
            <li v-for="(item, index) in displayedPages" :key="index">
                <span v-if="item === '...'" class="dots">...</span>
                <button 
                    v-else 
                    type="button"
                    class="btn-page number-btn" 
                    :class="{ active: item === currentPage }" 
                    @click="changePage(item)"
                >
                    {{ item }}
                </button>
            </li>

            <li>
                <button 
                    type="button"
                    class="btn-page nav-btn" 
                    :disabled="!hasNext" 
                    @click="changePage(currentPage + 1)"
                    title="Página siguiente"
                >
                    <span>Siguiente</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </li>
        </ul>        
    </section>
</template>

<style scoped>
    .wrap-pagination {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        padding: 16px 4px;
        margin-top: 12px;
    }

    .pagination-info {
        font-size: 13px;
        color: var(--color-neutral);
    }

    .pagination-info span {
        font-weight: 600;
        color: #0D1C2E;
    }

    .wrap-pagination .pagination {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0;
        padding: 0;
    }

    .wrap-pagination .pagination .btn-page {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        height: 36px;
        padding: 0 12px;
        font-size: 13px;
        font-weight: 500;
        color: var(--color-neutral);
        background-color: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
        outline: none;
    }

    .wrap-pagination .pagination .number-btn {
        min-width: 36px;
        padding: 0 10px;
    }

    .wrap-pagination .pagination .btn-page:hover:not(:disabled):not(.active) {
        background-color: #f8fafc;
        border-color: var(--color-primary);
        color: var(--color-primary);
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(33, 88, 169, 0.08);
    }

    .wrap-pagination .pagination .btn-page.active {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        color: #ffffff;
        font-weight: 600;
        box-shadow: 0 2px 6px rgba(33, 88, 169, 0.25);
    }

    .wrap-pagination .pagination .btn-page:disabled {
        opacity: 0.45;
        cursor: not-allowed;
        background-color: #f1f5f9;
        border-color: #e2e8f0;
    }

    .wrap-pagination .pagination .nav-btn svg {
        transition: transform 0.2s ease;
    }

    .wrap-pagination .pagination .nav-btn:hover:not(:disabled) svg {
        transform: scale(1.1);
    }

    .wrap-pagination .pagination .dots {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        padding: 0 6px;
        color: #94a3b8;
        font-weight: 600;
        user-select: none;
    }

    @media (max-width: 640px) {
        .wrap-pagination {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
</style>
