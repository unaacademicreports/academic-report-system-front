<script setup>
    const props = defineProps({
        data: {
            type: Array,
            default: () => []
        }
    })
</script>

<template>
    <div class="wrap-table">
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Asignatura</th>
                    <th>Condición</th>
                    <th>Objetivos Alcanzados</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="materia in data">
                    <td align="center">{{ materia.codigo_asignatura }}</td>
                    <td>{{ materia.asignatura }}</td>
                    <td align="center">{{ materia.condicion }}</td>
                    <td>{{ materia.nota_final }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    .wrap-table {
        overflow: hidden;
        overflow-x: scroll;
        border: 1px solid var(--color-border);
        border-radius: 8px;
    }
    .wrap-table table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }
    table thead {
        background-color: #f1f5f9;
    }
    table thead th {
        padding: 18px 24px;
        color: #1e293b;
        font-weight: 600;
        font-size: 14px;
    }
    table tbody tr td {
        padding: 18px 24px;
        border-top: 1px solid #e2e8f0;
        font-size: 14px;
        vertical-align: middle;
    }
</style>