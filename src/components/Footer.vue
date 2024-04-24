<script setup>
import { computed } from 'vue';
import { EnvelopeIcon } from '@heroicons/vue/24/outline';
import store from '../stores';

const theme = computed(() => store.getters.themeBase1);
</script>

<template>
    <footer class="flex justify-between p-5 font-semibold text-base">
        <div class="flex flex-col w-1/2 gap-2">
            <div class="flex items-center">
                © Growth 8 LTDA -
                <p class="font-normal text-sm px-1">
                    Todos os direitos reservados.
                </p>
            </div>

            <div class="flex space-x-2">
                <p>E-mail</p>
                <envelope-icon class="h-6 w-6 primary-text" />
                <p class="primary-text font-bold cursor-pointer">
                    contato@growth8.com.br
                </p>
            </div>
        </div>
        <div class="flex items-center">
            <p>Um produto</p>
            <img src="../assets/images/Logo.png" />
        </div>
    </footer>
</template>

<style scoped>
footer {
    background-color: v-bind(theme);
}
</style>
