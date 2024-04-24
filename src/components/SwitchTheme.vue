<script setup>
import { computed } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import store from '../stores';

const theme = computed(() => store.getters.theme);

const switchTheme = async () => {
    await store.dispatch('switchTheme', { theme: theme.value });
};
</script>

<template>
    <main @click="switchTheme">
        <SunIcon v-if="theme === 'light'" class="h-6 w-6" />
        <MoonIcon v-else-if="theme === 'dark'" class="h-6 w-6" />
    </main>
</template>

<style scoped>
main {
    background: none;
    border: none;
    cursor: pointer;
}
</style>
