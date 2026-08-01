<script setup>
    const props = defineProps({
        data: {
            type: Array,
            default: () => []
        }
    })
    console.log(props.data)
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

</style>