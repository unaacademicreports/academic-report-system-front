<script setup>
    import TableCaereers from '../components/TableCaereers.vue';
</script>

<template>
    <div id="Caereers">
        <section class="hero">
            <h2>Carreras</h2>
            <p>Lista de carreras registradas</p>
        </section>

        <TableCaereers />

    </div>
</template>

<style scoped>
    #Caereers {
        padding: 20px;
        display:grid;
        grid-gap: 20px;
    }
</style>