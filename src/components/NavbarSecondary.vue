<script setup>
    import { ref } from 'vue';
    import SettingsIcon from './icons/Settings.vue';
    import LogoutIcon from './icons/Logout.vue';

    import MenuUserLoged from './MenuUserLoged.vue';
    defineProps({
        userLoged: { 
            type: Object, 
            required: true 
        }
    });
    
    // let userMenu = ref(false);
    // const toggleUserMenu = () => {
    //     userMenu.value = !userMenu.value;
    // }
</script>

<template>
    <nav class="navbar-secondary">
        <div class="options">
            <!-- <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Inicio</a></li>
            </ul> -->
        </div>
        <MenuUserLoged :user-loged="userLoged" />
    </nav>
</template>

<style scoped>
    .navbar-secondary {
        position: sticky;
        top: 0;
        z-index: 1000;
        height: 60px;
        
        padding: 0px 20px;
        display: flex;
        justify-content: end;
        align-items: center;
        background-color: var(--color-tertiary);
        border-bottom: 1px solid var(--color-border);
    }
    .navbar-secondary .options ul {
        list-style: none;
        display: flex;
        gap: 10px;
    }
    .navbar-secondary .options ul li a {
        text-decoration: none;
        color: var(--color-text-main);
    }
</style>