import { useAuthStore } from '../stores/auth';

// const API_URL = "http://127.0.0.1:5000";
const API_URL = "https://newsletter-generator-una.onrender.com";

const struct_api = "/api/v1";

export const BASE_URL = `${API_URL}${struct_api}`;

/*
* ✅
*/
const apiFetch = async (endpoint, options = {}) => {
    const authStore = useAuthStore();
    const token = localStorage.getItem('token');

    const headers = {
        "Content-Type": "application/json"
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const fetchOptions = {
        ...options,
        headers
    }

    let response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);

    const isAuthFlowEndpoint = endpoint === '/auth/logout' || endpoint === '/auth/login' || endpoint === '/auth/refresh-token';

    if (response.status === 401 && !isAuthFlowEndpoint) {
        console.warn("Token expirado. Intentando renovación automática...");
        const renoveToken = await authStore.renewToken();

        if (renoveToken && renoveToken.data && renoveToken.data.token) {
            headers["Authorization"] = `Bearer ${renoveToken.data.token}`;
            response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
        } else {
            console.error("No se pudo renovar el token. Cerrando sesión...");
            authStore.logOut();
        }
    }
    return response;
}

/*
* ✅
*/
const apiFetchNoToken = async (endpoint, options = {}) => {
    const authStore = useAuthStore();

    const headers = {
        "Content-Type": "application/json"
    };

    if (authStore.token) {
        headers["Authorization"] = `Bearer ${authStore.token}`;
    }

    const fetchOptions = {
        ...options,
        headers
    }

    let response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
    return response;
}

export default apiFetch;