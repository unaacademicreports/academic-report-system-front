<script setup>
// import
import { useAuthStore } from '../stores/auth';

// icons
import SettingsIcon from './icons/Settings.vue';
import LogoutIcon from './icons/Logout.vue';
import ArrowDown1 from './icons/ArrowDown1.vue';

defineProps({
    userLoged: { 
        type: Object, 
        required: true 
    }
});

const authStore = useAuthStore();

const handleLogout = async () => {
    await authStore.logOut();
};
</script>

<template>
    <div class="user">
        <div class="avatar">
            <span>{{ (userLoged?.firstname?.[0] || '') + (userLoged?.lastname?.[0] || '') }}</span>
        </div>
        <div class="data">
            <span class="name">{{ (userLoged?.firstname || '') + ' ' + (userLoged?.lastname || '') }}</span class="name">
            <span class="role">{{ userLoged?.role?.toUpperCase() || '' }}</span>
        </div>
        <ul class="user-menu">
            <li>
                <router-link :to="{ name: 'EditUser', params: { id: userLoged?.id || userLoged?.sub || userLoged?.user_id || userLoged?.id_user || '' } }">
                    <SettingsIcon /> Configuración de Usuario
                </router-link>
            </li>
            <li>
                <a @click.prevent="handleLogout">
                    <LogoutIcon /> Cerrar Sesión
                </a>
            </li>
        </ul>
        <ArrowDown1 />
    </div>
</template>

<style scoped>
    .user {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        user-select: none;
    }
    .user .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--color-primary);
        color: var(--color-tertiary);
        text-transform: uppercase;
    }
    .user .data {
        position: relative;
        display: flex;
        flex-direction: column;
    }
    /*  */
    .user .user-menu {
        position: absolute;
        opacity: 0;
        top: -500px;
        right: 0px;
        width: 220px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        list-style: none;
        padding: 12px;
        background-color: var(--color-tertiary);
        border: 1px solid var(--color-border);
        border-radius: 4px;

        transition: opacity 0.2s ease;
    }
    .user:hover .user-menu,
    .user .user-menu:hover {
        top: 99%;
        opacity: 1;
    }
    .user .user-menu::before {
        content: '';
        position: absolute;
        top: -5px;
        right: 15px;
        width: 8px;
        height: 8px;
        border: 1px solid var(--color-border);
        border-radius: 2px;
        border-bottom: none;
        border-right: none;
        transform: rotate(45deg);
        background-color: var(--color-tertiary);
    }
    .user .user-menu a {
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 12px;
        
        padding: 8px;
        border-radius: 4px;
        font-weight: 500;
        text-decoration: none;
        color: var(--color-neutral);
        transition: all 0.2s ease;
    }
    .user .user-menu a:hover {
        background-color: rgba(0, 0, 0, .1);
    }
    .user .user-menu a svg.logout-icon path {
        stroke: var(--color-neutral);
        fill: var(--color-neutral);
    }
    /*  */
    .user .name {
        font-weight: 600;
    }
    .user .role {
        font-size: 12px;
        color: var(--color-text-muted);
    }
</style>