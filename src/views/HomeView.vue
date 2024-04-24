<script setup>
import { computed } from 'vue';
import store from '../stores';

const isLogged = computed(() => store.getters.isAuthenticated);
</script>

<template>
    <main class="w-full bg-theme-base-2 p-4">
        <section>
            <header class="pb-10 space-y-1">
                <h1 class="text-3xl font-medium">
                    Sistema de <span class="font-semibold">ERP</span>
                </h1>
                <p>
                    Bem-vindo ao sistema de ERP.
                    <br />
                    Desenvolvido por <span class="text-blue-900 underline">@vittordeaguiar</span>
                </p>
            </header>
        </section>
    </main>
</template>
