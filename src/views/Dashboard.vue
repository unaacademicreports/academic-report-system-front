<script setup>
    import { useAuthStore } from '../stores/auth';

    const authStore = useAuthStore();
</script>

<template>
    <div id="dashboard">
        <section class="hero">
            <h2>Bienvenido, <span>{{ authStore.authData?.firstname }}</span></h2>
        </section>
        <section id="menu-options">
            <ul>
                <li v-if="['Admin', 'Editor'].includes(authStore.authData?.role)">
                    <RouterLink :to="{ name: 'Reports' }">
                        <div class="c-svg">
                            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 17H9V12.825L10.6 14.425L12 13L8 9L4 13L5.425 14.4L7 12.825V17ZM2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H10L16 6V18C16 18.55 15.8042 19.0208 15.4125 19.4125C15.0208 19.8042 14.55 20 14 20H2ZM9 7V2H2V18H14V7H9ZM2 2V7V2V7V18V2Z" fill="#424751"/>
                            </svg>
                        </div>
                        <h3>Reportes Académicos</h3>
                        <p>Carga, valida y gestiona reportes de notas.</p>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'SearchStudent' }">
                        <div class="c-svg">
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6ZM19.1 19.5L15.9 16.3C15.55 16.5 15.175 16.6667 14.775 16.8C14.375 16.9333 13.95 17 13.5 17C12.25 17 11.1875 16.5625 10.3125 15.6875C9.4375 14.8125 9 13.75 9 12.5C9 11.25 9.4375 10.1875 10.3125 9.3125C11.1875 8.4375 12.25 8 13.5 8C14.75 8 15.8125 8.4375 16.6875 9.3125C17.5625 10.1875 18 11.25 18 12.5C18 12.95 17.9333 13.375 17.8 13.775C17.6667 14.175 17.5 14.55 17.3 14.9L20.5 18.1L19.1 19.5ZM13.5 15C14.2 15 14.7917 14.7583 15.275 14.275C15.7583 13.7917 16 13.2 16 12.5C16 11.8 15.7583 11.2083 15.275 10.725C14.7917 10.2417 14.2 10 13.5 10C12.8 10 12.2083 10.2417 11.725 10.725C11.2417 11.2083 11 11.8 11 12.5C11 13.2 11.2417 13.7917 11.725 14.275C12.2083 14.7583 12.8 15 13.5 15ZM0 16V13.225C0 12.6583 0.141667 12.1333 0.425 11.65C0.708333 11.1667 1.1 10.8 1.6 10.55C2.45 10.1167 3.40833 9.75 4.475 9.45C5.54167 9.15 6.725 9 8.025 9C7.825 9.3 7.65417 9.62083 7.5125 9.9625C7.37083 10.3042 7.25833 10.6583 7.175 11.025C6.175 11.1083 5.28333 11.2792 4.5 11.5375C3.71667 11.7958 3.05833 12.0667 2.525 12.35C2.35833 12.4333 2.22917 12.5542 2.1375 12.7125C2.04583 12.8708 2 13.0417 2 13.225V14H7.175C7.25833 14.3667 7.37083 14.7167 7.5125 15.05C7.65417 15.3833 7.825 15.7 8.025 16H0Z" fill="#424751"/>
                            </svg>
                        </div>
                        <h3>Búsqueda de Estudiantes</h3>
                        <p>Consulta el historial académico y datos del estudiante.</p>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink :to="{ name: 'SearchPeriod' }">
                        <div class="c-svg">
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 12C8.71667 12 8.47917 11.9042 8.2875 11.7125C8.09583 11.5208 8 11.2833 8 11C8 10.7167 8.09583 10.4792 8.2875 10.2875C8.47917 10.0958 8.71667 10 9 10C9.28333 10 9.52083 10.0958 9.7125 10.2875C9.90417 10.4792 10 10.7167 10 11C10 11.2833 9.90417 11.5208 9.7125 11.7125C9.52083 11.9042 9.28333 12 9 12V12M5 12C4.71667 12 4.47917 11.9042 4.2875 11.7125C4.09583 11.5208 4 11.2833 4 11C4 10.7167 4.09583 10.4792 4.2875 10.2875C4.47917 10.0958 4.71667 10 5 10C5.28333 10 5.52083 10.0958 5.7125 10.2875C5.90417 10.4792 6 10.7167 6 11C6 11.2833 5.90417 11.5208 5.7125 11.7125C5.52083 11.9042 5.28333 12 5 12V12M13 12C12.7167 12 12.4792 11.9042 12.2875 11.7125C12.0958 11.5208 12 11.2833 12 11C12 10.7167 12.0958 10.4792 12.2875 10.2875C12.4792 10.0958 12.7167 10 13 10C13.2833 10 13.5208 10.0958 13.7125 10.2875C13.9042 10.4792 14 10.7167 14 11C14 11.2833 13.9042 11.5208 13.7125 11.7125C13.5208 11.9042 13.2833 12 13 12V12M9 16C8.71667 16 8.47917 15.9042 8.2875 15.7125C8.09583 15.5208 8 15.2833 8 15C8 14.7167 8.09583 14.4792 8.2875 14.2875C8.47917 14.0958 8.71667 14 9 14C9.28333 14 9.52083 14.0958 9.7125 14.2875C9.90417 14.4792 10 14.7167 10 15C10 15.2833 9.90417 15.5208 9.7125 15.7125C9.52083 15.9042 9.28333 16 9 16V16M5 16C4.71667 16 4.47917 15.9042 4.2875 15.7125C4.09583 15.5208 4 15.2833 4 15C4 14.7167 4.09583 14.4792 4.2875 14.2875C4.47917 14.0958 4.71667 14 5 14C5.28333 14 5.52083 14.0958 5.7125 14.2875C5.90417 14.4792 6 14.7167 6 15C6 15.2833 5.90417 15.5208 5.7125 15.7125C5.52083 15.9042 5.28333 16 5 16V16M13 16C12.7167 16 12.4792 15.9042 12.2875 15.7125C12.0958 15.5208 12 15.2833 12 15C12 14.7167 12.0958 14.4792 12.2875 14.2875C12.4792 14.0958 12.7167 14 13 14C13.2833 14 13.5208 14.0958 13.7125 14.2875C13.9042 14.4792 14 14.7167 14 15C14 15.2833 13.9042 15.5208 13.7125 15.7125C13.5208 15.9042 13.2833 16 13 16V16M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2V20M2 18H16V18V18V8H2V18V18V18V18" fill="#00408A"/>
                            </svg>
                        </div>
                        <h3>Búsqueda de Periodos Académicos</h3>
                        <p>Consulta el historial académico de estudiantes en un periodo académico especifico.</p>
                    </RouterLink>
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
#dashboard {
    padding: 20px;
    display: grid;
    grid-gap: 20px;
}

/* Hero section */

/* Menu options */
#dashboard #menu-options ul {
    display: grid;
    align-items: stretch;
    grid-template-columns: repeat(3,1fr);
    grid-gap: 20px;
    list-style: none;
}
#dashboard #menu-options ul li a {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    height: 100%;

    text-decoration: none;
    background-color: #FFFFFF;
    border: 1px solid #C3C6D3;
    border-radius: 8px;

    transition: border-color .2s ease,
                box-shadow .2s ease,
                transform .2s ease;
}
#dashboard #menu-options ul li a:hover {
    box-shadow: 0px 4px 20px rgba(16, 44, 84, 0.08);
    border: 1px solid #00408A;
    transform: translateY(-2px);
}
#dashboard #menu-options ul li a::after {
    content: '';
    height:120px;
    width: 120px;
    background-color: #B4CDFE;
    opacity: .1;
    position: absolute;
    right:-50px;
    top:-50px;
    border-radius: 50%;
    z-index: 0;
    
    transition: background-color .2s ease;
    transition-delay: .05s;
}
#dashboard #menu-options ul li a:hover::after {
    background-color: #2158A9;
}
#dashboard #menu-options ul li a .c-svg svg {
    height: 44px;
    width: 44px;
    padding: 8px;
    border-radius: 4px;
    background-color: #B4CDFE;

    transition: background-color .2s ease;
}
#dashboard #menu-options ul li a:hover .c-svg svg {
    background-color: var(--color-primary);
}
#dashboard #menu-options ul li a .c-svg svg path {
    fill: #3E5681;

    transition: fill .2s ease;
}
#dashboard #menu-options ul li a:hover .c-svg svg path {
    fill: #BED2FF;
}
#dashboard #menu-options ul li a h3 {
    font-size: 20px;
    font-weight: 600;
    color: #0D1C2E;
}
#dashboard #menu-options ul li a p {
    font-size: 14px;
    font-weight: 300;
    color: #424751;
}
@media (max-width: 980px) {
    #dashboard #menu-options ul {
        grid-template-columns: repeat(1,1fr);
    }
}
</style>