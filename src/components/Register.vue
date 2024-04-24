<script setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { create } from '../services/userService';
import router from '../router';
import {
    EnvelopeIcon,
    LockClosedIcon,
    UserIcon
} from '@heroicons/vue/24/outline';

const user = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const verifyPassword = () => {
    if (user.value.password !== user.value.confirmPassword) {
        throw new Error('As senhas não são iguais');
    }
};

const registerUser = async () => {
    try {
        verifyPassword();
        await create(user.value);
        await router.push('/login');
    } catch (error) {
        toast.error(error.message || 'Erro ao fazer cadastro');
    }
};
</script>

<template>
    <form
        @submit.prevent="registerUser()"
        class="w-full flex items-center justify-center text-base font-medium"
    >
        <section
            class="border-primary-color max-w-md flex flex-col p-8 space-y-6 rounded-3xl"
        >
            <div class="text-center">
                <h1 class="text-2xl font-bold">Criar conta</h1>
                <h2 class="text-base font-normal">
                    Crie a sua conta para aproveitar todos os benefícios!
                </h2>
            </div>

            <div class="space-y-4">
                <div class="relative">
                    <label for="name" class="block text-sm font-medium"
                        >Nome completo</label
                    >
                    <UserIcon class="absolute top-7 left-2 h-6" />
                    <input
                        id="name"
                        v-model="user.name"
                        type="text"
                        required
                        class="mt-1 block w-full pl-10 pr-3 shadow-sm"
                    />
                </div>

                <div class="relative">
                    <label for="email" class="block text-sm font-medium"
                        >E-mail</label
                    >
                    <EnvelopeIcon class="absolute top-7 left-2 h-6" />
                    <input
                        id="email"
                        v-model="user.email"
                        type="email"
                        required
                        class="mt-1 block w-full pl-10 pr-3 shadow-sm"
                    />
                </div>

                <div class="relative">
                    <label for="password" class="block text-sm font-medium"
                        >Senha</label
                    >
                    <LockClosedIcon class="absolute top-7 left-2 h-6" />
                    <input
                        id="password"
                        v-model="user.password"
                        type="password"
                        required
                        class="mt-1 block w-full pl-10 pr-3 shadow-sm"
                    />
                </div>

                <div class="relative">
                    <label
                        for="confirmPassword"
                        class="block text-sm font-medium"
                        >Confirme sua senha</label
                    >
                    <LockClosedIcon class="absolute top-7 left-2 h-6" />
                    <input
                        id="confirmPassword"
                        v-model="user.confirmPassword"
                        type="password"
                        required
                        class="mt-1 block w-full pl-10 pr-3 shadow-sm"
                    />
                </div>
            </div>

            <p class="font-normal text-sm mx-auto">
                Já possui uma conta?
                <span
                    class="font-semibold cursor-pointer text-light-green-hover"
                    @click="$router.push('/login')"
                >
                    Entrar!
                </span>
            </p>

            <button class="w-full mx-auto" @submit.prevent="registerUser()">
                Cadastrar
            </button>
        </section>
    </form>
</template>

<style scoped>
label,
input {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

label {
    display: block;
}
</style>
