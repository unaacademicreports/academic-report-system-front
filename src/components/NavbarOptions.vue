<script setup>
    //import
    import { useAuthStore } from '../stores/auth';

    //components
    import LogoUnaComponent from './LogoUnaComponent.vue';
    
    //icons
    import DashboardIcon from './icons/Dashboard.vue';
    import SearchUserIcon from './icons/SearchUser.vue';
    import SearchPeriod from './icons/SearchPeriod.vue';
    import UploadIcon from './icons/Upload.vue';
    import CaerrerIcon from './icons/Caerrer.vue';
    import AuditIcon from './icons/Audit.vue';
    import UsersIcon from './icons/Users.vue';
    import LogoutIcon from './icons/Logout.vue';

    const authStore = useAuthStore();

    const handleLogout = async () => {
        await authStore.logOut();
    };
</script>

<template>
    <nav class="navbar-options">
        <div class="header">
            <div class="logo">
                <LogoUnaComponent />
            </div>
            <div class="wrap-title">
                <h1>UNA System</h1>
                <p>Portal Administrativo</p>
            </div>
        </div>
        <div class="primary">
            <ul class="menu-list">
                <li>
                    <RouterLink :to="{ name: 'Dashboard' }"><DashboardIcon /><span>Dashboard</span></RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'SearchStudent' }"><SearchUserIcon /><span>Busqueda de Estudiantes</span></RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'SearchPeriod' }"><SearchPeriod /><span>Búsqueda de Periodos Académicos</span></RouterLink>
                </li>
                <li v-if="['Admin', 'Editor'].includes(authStore.authData?.role)">
                    <RouterLink :to="{ name: 'Reports' }"><UploadIcon /><span>Reportes Académicos</span></RouterLink>
                </li>
                <li v-if="['Admin', 'Editor'].includes(authStore.authData?.role)">
                    <RouterLink :to="{ name: 'Careers' }"><CaerrerIcon /><span>Carreras</span></RouterLink>
                </li>
                <li v-if="['Admin'].includes(authStore.authData?.role)">
                    <RouterLink :to="{ name: 'Audit' }"><AuditIcon /><span>Auditoria & Historico de Actividades</span></RouterLink>
                </li>
                <li v-if="['Admin'].includes(authStore.authData?.role)">
                    <RouterLink :to="{ name: 'ListUsers' }"><UsersIcon /><span>Administrador de Usuarios</span></RouterLink>
                </li>
            </ul>
        </div>
        <div class="secondary">
            <ul class="menu-list">
                <li>
                    <a @click.prevent="handleLogout"><LogoutIcon /><span>Cerrar Sesión</span></a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<style scoped>
    .navbar-options {
        height: 100dvh;
        max-width: 255px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        background-color: #EFF4FF;
        border-right: 1px solid var(--color-border);
    }
    /*  */
    .navbar-options div:last-child {
        margin-top: auto;
        margin-bottom: 0px;
    }
    .navbar-options .header,
    .navbar-options .primary,
    .navbar-options .secondary {
        width: 100%;
        padding: 20px;
    }
    .navbar-options .secondary {
        border-top: 1px solid var(--color-border);
    }
    /*  */
    .navbar-options .header {
        display: flex;
        align-items: end;
        gap: 15px;
        padding-bottom: 20px;
    }
    .navbar-options .header .logo {
        width: 25px;
    }
    .navbar-options .header .wrap-title h1 {
        font-size: 20px;
        font-weight: 700;
        color: #0D1C2E;
    }
    .navbar-options .header .wrap-title p {
        font-family: var(--font-body);
        font-size: 12px;
        font-weight: 700;
        color: #424751;
    }
    /*  */
    .navbar-options ul.menu-list {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 8px;
        list-style: none;
        width: 100%;
    }
    .navbar-options ul.menu-list li {
        width: 100%;
    }
    .navbar-options ul.menu-list li a {
        display: grid;
        grid-template-columns: 25px auto;
        align-items: center;
        gap: 10px;
        width: 100%;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        line-height: 14px;
        color: #424751;
        background-color: transparent;
        padding: 10px 18px;
        border-radius: 12px;
        cursor: pointer;

        transition: 
            background-color .2s ease,
            background-color .2s ease;
    }
    .navbar-options ul.menu-list li a:hover {
        color: #BED2FF;
        background-color: var(--color-primary);
    }

    @media( max-width: 767px ) {
        .navbar-options {
            max-width: 100px;
        }
        .navbar-options .header .wrap-title {
            display: none;
        }
        .navbar-options ul.menu-list li a {
            border-radius: 0px;
            justify-content: center;
            align-items: center;
            padding-top: 12px;
            padding-bottom: 12px;
            gap: 0;
        }
        .navbar-options ul.menu-list li a span {
            display: none;
        }
        .navbar-options .header,
        .navbar-options .primary,
        .navbar-options .secondary {
            padding-left: 0px;
            padding-right: 0px;
        }
        .navbar-options .header {
            display: flex;
            justify-content: center;
        }
        .navbar-options ul.menu-list li a svg {
            margin: auto;
        }
    }
</style>
<style>
    .navbar-options ul.menu-list li a svg {
        max-height: 18px;
        max-width: 20px;
    }
    .navbar-options ul.menu-list li a svg path {
        fill: #424751;
    }
    .navbar-options ul.menu-list li a:hover svg path {
        fill: #BED2FF;
    }
</style>