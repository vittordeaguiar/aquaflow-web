import { createRouter, createWebHistory } from 'vue-router';
import { HomeView, LoginView, RegisterView, ClientsView } from '../views';

import axios from 'axios';
import store from '../stores';
import { toast } from 'vue3-toastify';
import { dispatchAuthFalse } from '../services/userService';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '',
            component: HomeView
        },
        { path: '/home', name: 'home', component: HomeView },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { publicRoute: true }
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
            meta: { publicRoute: true }
        },
        {
            path: '/clients',
            name: 'clients',
            component: ClientsView,
            // meta: { requiresAuth: true }
        },
        { path: '/:catchAll(.*)', redirect: '/home' }
    ],
    strict: false,
    scrollBehavior() {
        return { top: 0 };
    }
});

let isAuthInitialized = false;

export const initializeAuth = async () => {
    if (isAuthInitialized) return;

    try {
        const data = (
            await axios.get(`/auth/check`, {
                withCredentials: true
            })
        ).data;

        if (!data) await dispatchAuthFalse();

        await store.dispatch('authenticate', {
            isAuthenticated: true,
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        });

        isAuthInitialized = true;
    } catch (error) {
        console.error('Erro: ', error.message);
        await dispatchAuthFalse();
    }
};

router.beforeEach(async (to, from, next) => {
    if (!isAuthInitialized) await initializeAuth();

    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const publicRoute = to.matched.some((record) => record.meta.publicRoute);
    const isAuthenticated = store.getters.isAuthenticated;

    if (requiresAuth && !isAuthenticated) {
        await router.push('/login');
        toast.error('Acesso restrito a usuários logados!');
    } else if (publicRoute && isAuthenticated) {
        await router.push('/home');
        toast.error('Página acessível apenas para usuários não logados!');
        return;
    }

    next();
});

export default router;
