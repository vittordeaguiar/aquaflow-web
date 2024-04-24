<script setup>
import { computed } from 'vue';
import store from '../stores';
import { logOut } from '../services/userService';
import Logo from '../assets/images/icons/logo-ppf.png';
import { RegisterMenuPopover, SwitchTheme } from './';
import { UserIcon } from '@heroicons/vue/24/outline';

const isLogged = computed(() => store.getters.isAuthenticated);
const theme = computed(() => store.getters.themeBase1);
const displayName = computed(() => store.getters.name.split(' ')[0]);
const isAdmin = computed(() => store.getters.role === 'ADMIN');

const throwNotImplementedException = () => alert('Funcionalidade não implementada.');
</script>

<template>
    <header
        class="flex justify-between py-1 px-2 md:px-4 text-sm border-b-theme-base-2 shadow-md"
    >
        <div class="justify-start flex items-center gap-8">
            <img
                :src="Logo"
                class="cursor-pointer h-10 w-10"
                @click="$router.push('/home')"
            />
            <p
                @click.prevent="$router.push('/')"
                class="cursor-pointer hover:underline"
            >
                Início
            </p>
            <RegisterMenuPopover v-if="isLogged && isAdmin" />
            <div v-else>
                <button
                    @click="throwNotImplementedException"
                    type="button"
                    class="flex items-center cursor-pointer"
                    style="background-color: transparent; border: none"
                >
                    <p class="hover:underline text-color">Meus dados</p>
                    <!-- <ChevronDownIcon class="h-4 w-4 primary-text" /> -->
                </button>
            </div>
        </div>
        <div class="flex items-center space-x-6 font-medium">
            <SwitchTheme />

            <div v-if="!isLogged" class="flex items-center space-x-2">
                <UserIcon class="h-5 w-5" />
                <h2
                    @click="$router.push('/login')"
                    class="cursor-pointer hover:underline"
                >
                    Entrar
                </h2>
            </div>
            <p v-if="isLogged">
                Olá
                <span class="font-semibold"> {{ displayName }}</span
                >!
            </p>
            <h2
                v-if="isLogged"
                @click.prevent="logOut"
                class="cursor-pointer hover:underline"
            >
                Sair
            </h2>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: v-bind(theme);
}
</style>
.