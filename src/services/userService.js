import axios from '../utils/axiosConfig';
import { toast } from 'vue3-toastify';
import store from '../stores';
import router from '../router';

const dispatchAuthFalse = async () => {
    await store.dispatch('authenticate', {
        isAuthenticated: false,
        userId: null,
        userEmail: '',
        userName: '',
        userOrganization: null,
        ownSomeProject: false,
        userType: null
    });
};

const validSignIn = async (data) => {
    if (!data.email) throw new Error('E-mail em branco.');
    if (!data.password) throw new Error('Senha em branco.');
};

const signIn = async (userData) => {
    try {
        await validSignIn(userData);
        const response = await axios.post('auth/login', userData);
        await store.dispatch('authenticate', {
            isAuthenticated: true,
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role
        });
        await router.push('/');
        toast.success('Login feito com sucesso!');
    } catch (error) {
        toast.error(error.message || 'Erro ao autenticar');
        throw error;
    }
};

const create = async (userData) => {
    try {
        await axios.post('/users', userData);
        toast.success('Usuário criado com sucesso!');
    } catch (error) {
        toast.error(error.message || 'Erro ao autenticar');
        throw error;
    }
};

const logOut = async () => {
    try {
        await axios.post('auth/logout');
        await dispatchAuthFalse();
        await router.push('/login');
        toast.success('Logout feito com sucesso!');
    } catch (error) {
        throw new Error(error.message || 'Erro ao sair');
    }
};

export { dispatchAuthFalse, signIn, create, logOut };
