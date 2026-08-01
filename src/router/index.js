import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/auth';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/register',
            name: 'Register',
            component: () => import('../views/Register.vue'),
            meta: { requiresAuth: true, role: 'Admin' }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/Loginv2.vue'),
            meta: { guestOnly: true }
        },
        {
            path: '/',
            name: 'Dashboard',
            component: () => import('../views/Dashboard.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/reports',
            name: 'Reports',
            component: () => import('../views/Reports.vue'),
            meta: { requiresAuth: true, role: ['Admin', 'Editor'] }
        },
        {
            path: '/search-student',
            name: 'SearchStudent',
            component: () => import('../views/SearchStudent.vue')
            //meta: { requiresAuth: true }
        },
        {
            path: '/search-period',
            name: 'SearchPeriod',
            component: () => import('../views/SearchPeriod.vue')
        },
        {
            path: '/list-users',
            name: 'ListUsers',
            component: () => import('../views/ListUsers.vue'),
            meta: { requiresAuth: true, role: ['Admin', 'Editor'] }
        },
        {
            path: '/edit-user/:id',
            name: 'EditUser',
            component: () => import('../views/EditUser.vue'),
            meta: { requiresAuth: true/*, role: ['Admin', 'Editor']*/ },
            beforeEnter: (to, from, next) => {
                const authStore = useAuthStore();
                const loggedUserId = authStore.authData?.id || authStore.authData?.sub || authStore.authData?.user_id || authStore.authData?.id_user;

                // Verificar que no intenten entrar a la URL con el ID de otro usuario
                if (loggedUserId && String(to.params.id) !== String(loggedUserId)) {
                    console.warn("Seguridad: Intento de acceso no autorizado al perfil de otro usuario.");
                    return next({ name: 'Dashboard' });
                }
                next();
            }
        },
        {
            path: '/audit',
            name: 'Audit',
            component: () => import('../views/Audit.vue'),
            meta: { requiresAuth: true, role: ['Admin'] }
        },
        {
            path: '/careers',
            name: 'Careers',
            component: () => import('../views/CareersView.vue'),
            meta: { requiresAuth: true, role: ['Admin', 'Editor'] }
        }
    ]
});

// Navigation Guard to protect routes
router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem('token');
    let isAuthenticated = !!token;

    // Verificar expiración del token si existe
    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decoded = JSON.parse(jsonPayload);
            const currentTime = Math.floor(Date.now() / 1000);

            // Si expiró, intentamos renovar antes de cambiar de vista
            if (decoded.exp < currentTime) {
                console.warn("Token expirado en el cambio de vista. Intentando renovar...");
                const authStore = useAuthStore();
                const res = await authStore.renewToken();
                if (res && res.data && res.data.token) {
                    isAuthenticated = true;
                } else {
                    isAuthenticated = false;
                    authStore.logOut();
                }
            }
        } catch (e) {
            isAuthenticated = false;
        }
    }

    // If the route requires authentication and the user is not authenticated
    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({ name: 'Login' }); // Redirect to login
    }
    // If the route is only for guests (login/register) and the user IS authenticated
    else if (to.meta.guestOnly && isAuthenticated) {
        return next({ name: 'Dashboard' }); // Redirect to dashboard
    }

    // Verificar roles permitidos (soporta tanto 'role' como 'roles' en meta)
    const requiredRoles = to.meta.roles || (to.meta.role ? (Array.isArray(to.meta.role) ? to.meta.role : [to.meta.role]) : null);

    if (requiredRoles && isAuthenticated) {
        const authStore = useAuthStore();
        const userRoleData = authStore.authData?.roles || authStore.authData?.role || [];
        const userRolesList = Array.isArray(userRoleData) ? userRoleData : [userRoleData];
        const hasRequiredRole = requiredRoles.some(r => userRolesList.includes(r));

        if (!hasRequiredRole) {
            return next({ name: 'Dashboard' });
        }
    }

    next();
});

export default router