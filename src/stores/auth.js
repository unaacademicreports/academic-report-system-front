import { ref } from 'vue';
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import apiFetch, { BASE_URL } from '../services/api';

export const useAuthStore = defineStore('auth', () => {
    const authData = ref(null);
    const authError = ref(null);

    const router = useRouter();

    const token = ref(localStorage.getItem('token') || null);
    const refreshToken = ref(localStorage.getItem('refresh_token') || null);
    // const user = ref(localStorage.getItem('user') || null);

    ////
    //
    // ✅ IS AUTHENTICATED
    //
    ////
    const isAuthenticated = (jwt) => {
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    if (token.value) {
        try {
            const decodedToken = isAuthenticated(token.value);
            authData.value = decodedToken;
        } catch (e) {
            console.error("Token is invalid", e);
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            token.value = null;
        }
    }

    ////
    //
    // ✅ SIGN UP
    //
    ////
    const signUp = async (firstname, lastname, username, email, password, role) => {
        try {
            const response = await apiFetch('/auth/user', {
                method: 'POST',
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    role
                })
            });
            return response;
        }
        catch (error) {
            console.error('Error al registrar el usuario:', error);
            authError.value = error.message || 'Error desconocido al registrar el usuario';
        }
    }

    ////
    //
    // ✅ LOG IN
    //
    ////
    const logIn = async (username, password) => {
        try {
            const loginFetch = await apiFetch('/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const response = await loginFetch.json();

            if (loginFetch.ok && response.status == "success") {
                token.value = response.data.token;
                refreshToken.value = response.data.refresh_token;

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refresh_token', response.data.refresh_token);

                authData.value = isAuthenticated(response.data.token);

                router.push({ name: 'Dashboard' });

            } else {
                return response;
            }
        }
        catch (e) {
            console.error('Error al iniciar sesión:', e);
            authError.value = e.message || 'Error desconocido al iniciar sesión';
            return { status: 'error', mensaje: e.message || 'Error desconocido al iniciar sesión' };
        }
    }

    ////
    //
    // ✅ LOG OUT
    //
    ////
    const logOut = async () => {
        try {
            const response = await apiFetch('/auth/logout', {
                method: 'POST',
                body: JSON.stringify({
                    token: token.value
                })
            });

            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error al cerrar sesión:', error);
            authError.value = error.message || 'Error desconocido al cerrar sesión';
            return { status: 'error', mensaje: error.message || 'Error desconocido al cerrar sesión' };
        } finally {
            // Unconditionally clear client-side authentication state
            token.value = null;
            refreshToken.value = null;
            authData.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');

            // Redirect to Login if not already there
            if (router && router.currentRoute.value.name !== 'Login') {
                router.push({ name: 'Login' });
            }
        }
    }


    ////
    //
    // ✅ UPDATE USER
    //
    ////
    const updateUser = async (id, payload) => {
        try {
            const response = await apiFetch(`/auth/user/${id}`, {
                method: 'PUT',
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }
            return data;
        }
        catch (error) {
            console.error('Error al actualizar el usuario:', error);
            authError.value = error.message || 'Error desconocido al actualizar el usuario';
            return { status: 'error', mensaje: error.message || 'Error desconocido al actualizar el usuario' };
        }
    }
    ////
    //
    // ✅ UPDATE USER ROLE
    //
    ////
    const updateUserRole = async (id, payload) => {
        try {
            const response = await apiFetch(`/auth/user/${id}/role`, {
                method: 'POST',
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }
            return data;
        }
        catch (error) {
            console.error('Error al actualizar el usuario:', error);
            authError.value = error.message || 'Error desconocido al actualizar el usuario';
            return { status: 'error', mensaje: error.message || 'Error desconocido al actualizar el usuario' };
        }
    }

    ////
    //
    // ✅ DELETE USER
    //
    ////
    const deleteUser = async (id) => {
        try {
            const response = await apiFetch(`/auth/user/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }
            return data;
        }
        catch (error) {
            console.error('Error al eliminar el usuario:', error);
            authError.value = error.message || 'Error desconocido al eliminar el usuario';
            return { status: 'error', mensaje: error.message || 'Error desconocido al eliminar el usuario' };
        }
    }

    ////
    //
    // ✅ GET USERS
    //
    ////
    const getUsers = async (page = 1) => {
        try {
            const response = await apiFetch(`/auth/user?page=${page}`, {
                method: 'GET'
            });

            const data = await response.json();

            return data.data;
        }
        catch (error) {
            console.error('Error al obtener los usuarios:', error);
            authError.value = error.message || 'Error desconocido al obtener los usuarios';
            return { status: 'error', mensaje: error.message || 'Error desconocido al obtener los usuarios' };
        }
    }

    ////
    //
    // ✅ GET USER BY ID
    //
    ////
    const getUserById = async (id) => {
        try {
            const response = await apiFetch(`/auth/user/${id}`, {
                method: 'GET'
            });

            const data = await response.json();
            return data.data;
        }
        catch (error) {
            console.error('Error al obtener el usuario:', error);
            authError.value = error.message || 'Error desconocido al obtener el usuario';
            return { status: 'error', mensaje: error.message || 'Error desconocido al obtener el usuario' };
        }
    }

    ////
    //
    // ✅ FETCH ALL ROLES
    //
    ////
    const fetchAllRoles = async () => {
        try {
            const response = await apiFetch(`/auth/roles`, {
                method: 'GET'
            });

            const data = await response.json();
            return data.data;
        }
        catch (error) {
            console.error('Error al obtener los usuarios:', error);
            authError.value = error.message || 'Error desconocido al obtener los usuarios';
            return { status: 'error', mensaje: error.message || 'Error desconocido al obtener los usuarios' };
        }
    }

    const renewToken = async () => {
        try {
            if (!refreshToken.value) {
                logOut();
                return null;
            }

            const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh_token: refreshToken.value
                })
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                token.value = data.data.token;

                localStorage.setItem('token', token.value);

                authData.value = isAuthenticated(token.value);
                return data;
            } else {
                logOut();
                return data;
            }
        }
        catch (error) {
            console.error('Error al refrescar el token:', error);
            authError.value = error.message || 'Error desconocido al refrescar el token';
            return { status: 'error', mensaje: error.message || 'Error desconocido al refrescar el token' };
        }
    }

    return {
        authData,
        authError,
        signUp,
        logIn,
        logOut,
        updateUser,
        updateUserRole,
        deleteUser,
        getUsers,
        getUserById,
        fetchAllRoles,
        renewToken
    }
})