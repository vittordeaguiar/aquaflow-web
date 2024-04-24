<script setup>
import { reactive } from 'vue';
import { signIn } from '../services/userService';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/vue/24/outline';

const user = reactive({ email: '', password: '' });
</script>

<template>
    <form
        @submit.prevent="signIn(user)"
        class="w-full flex items-center justify-center text-base font-medium"
    >
        <section
            class="border-primary-color max-w-md flex flex-col p-8 space-y-6 rounded-3xl"
        >
            <div class="text-center">
                <h1 class="text-2xl font-bold">Entrar</h1>
                <h2 class="text-base font-normal">
                    Bem-vindo(a) de volta! Sentimos a sua falta.
                </h2>
            </div>

            <div class="relative">
                <label for="email" class="block text-sm"> E-mail </label>
                <EnvelopeIcon class="text-color absolute top-7 left-2 h-6" />
                <input
                    id="email"
                    v-model="user.email"
                    type="email"
                    required
                    class="mt-1 block w-full pl-10 pr-3 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            <div class="relative">
                <label for="password" class="block text-sm"> Senha </label>
                <LockClosedIcon class="text-color absolute top-7 left-2 h-6" />
                <input
                    id="password"
                    v-model="user.password"
                    type="password"
                    required
                    class="mt-1 block w-full pl-10 pr-3 shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                />
            </div>

            <p class="font-normal text-sm mx-auto">
                Ainda não possui uma conta?
                <span
                    class="font-semibold cursor-pointer text-light-green-hover"
                    @click="$router.push('/register')"
                >
                    Crie aqui!
                </span>
            </p>

            <button class="mx-auto w-full" @submit.prevent="signIn(user)">
                Entrar
            </button>
        </section>
    </form>
</template>

<style scoped>
label,
input {
    margin-left: auto;
    margin-right: auto;
}
</style>
