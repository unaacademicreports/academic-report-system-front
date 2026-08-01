<script setup>
    const props = defineProps({
        tableTitles: {
            type: Array,
            required: true
        },
        data: {
            type: Array,
            default: () => []
        },
        isLoading: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: ''
        }
    })
</script>

<template>
    <section class="table-periods">
        <div v-if="isLoading">
            <table>
                <thead>
                    <tr>
                        <th class="th-center">Cargando...</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div v-else-if="errorMessage">
            <table>
                <thead>
                    <tr>
                        <th class="th-center">{{ errorMessage }}</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div v-else>
            <table>
                <thead>
                    <template v-if="tableTitles && tableTitles.length > 0">
                        <tr>
                            <th v-for="title in tableTitles" :key="title">{{ title }}</th>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <th :colspan="tableTitles?.length || 2">No hay títulos</th>
                        </tr>
                    </template>
                </thead>
                <tbody>
                    <template v-if="data && data.length > 0">
                        <tr v-for="item in data" :key="item.id">
                            <td>{{ item.code }}</td>
                            <td>Opciones</td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td :colspan="tableTitles?.length || 2">No hay periodos académicos disponibles</td>
                        </tr>
                    </template>
                    <tr>
                        <td class="td-center" :colspan="tableTitles?.length || 2">footer table</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
    section {
        width: 100%;
    }
</style>