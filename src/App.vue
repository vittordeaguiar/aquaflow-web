<script setup>
import { computed } from 'vue';
import { Header } from './components';
import store from './stores';

const textColor = computed(() => store.getters.textColor);
const primaryColor = computed(() => store.getters.primaryColor);
const primaryDarkColor = computed(() => store.getters.primaryDarkColor);
const themeBase1 = computed(() => store.getters.themeBase1);
const themeBase2 = computed(() => store.getters.themeBase2);
const secondaryColor = computed(() => store.getters.secondaryColor);
const secondaryTextColor = computed(() => store.getters.secondaryTextColor);
const errorColor = computed(() => store.getters.errorColor);
const isAuthenticated = computed(() => store.getters.isAuthenticated);
</script>

<template>
    <main
        class="ppf flex w-screen flex-col div-body min-h-screen xl:pb-0 absolute"
    >
        <Header />

        <section class="flex flex-row flex-grow h-full">
            <router-view />
        </section>

        <!-- <Footer /> -->
    </main>
</template>

<style>
.ppf {
    color: v-bind(textColor);
}

body {
    overflow-x: hidden;
}

input {
    border: 1px solid v-bind(secondaryColor);
    border-radius: 10px;
    background-color: transparent;
    outline: none;
    padding: 2px 10px;
}

label {
    font-size: 0.875rem;
    font-weight: 400;
}

input[type='checkbox'] {
    border: 1px solid v-bind(secondaryColor);
    border-radius: 10px;
    background-color: transparent;
    outline: none;
    padding: 0;
    width: auto;
}

::placeholder {
    color: #888888;
    font-size: 12px;
}

input:focus::placeholder {
    color: transparent;
}

input:focus,
textarea:focus,
select:focus {
    border: 2px solid v-bind(primaryColor);
}

textarea {
    border: 1px solid v-bind(secondaryColor);
    border-radius: 10px;
    background-color: transparent;
    outline: none;
    padding: 2px 10px;
    width: 220px;
    height: 80px;
}

select {
    display: flex;
    align-items: center;
    border: 1px solid v-bind(secondaryColor);
    border-radius: 10px;
    background-color: transparent;
    outline: none;
    padding: 6px 10px;
    width: 220px;
}

option {
    color: #000000;
    color: #000000;
}

button {
    border: 2px solid v-bind(primaryColor);
    background-color: v-bind(primaryColor);
    color: v-bind(secondaryTextColor);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 10px;
    padding: 2px 10px;
    max-width: 220px;
    transition: all 200ms ease;
    outline: none;
    cursor: pointer;
}

button:hover {
    background-color: v-bind(primaryDarkColor);
    border-color: v-bind(primaryDarkColor);
}

p {
    font-weight: 300;
}

.secondary-button {
    border: 2px solid v-bind(primaryColor);
    background-color: transparent;
    border-radius: 8px;
    padding: 2px 10px;
    max-width: 220px;
    transition: all 200ms ease;
    outline: none;
}

.button-secondary {
    border: 2px solid v-bind(primaryColor);
    background-color: transparent;
    color: v-bind(textColor);
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 10px;
    padding: 2px 10px;
    max-width: 220px;
    transition: all 200ms ease;
    outline: none;
    cursor: pointer;
}

.button-secondary:hover {
    background-color: transparent;
    border-color: v-bind(primaryDarkColor);
}

.bg-theme-base-1 {
    background-color: v-bind(themeBase1);
    transition: background-color 0.3s;
}

.bg-theme-base-2 {
    background-color: v-bind(themeBase2);
}

.bg-theme-base-1-hover:hover {
    background-color: v-bind(themeBase1);
}

.bg-theme-base-2-hover:hover {
    background-color: v-bind(themeBase2);
}

.bg-secondary-color {
    background-color: v-bind(secondaryColor);
}

.primary-text {
    color: v-bind(primaryColor);
}

.primary-text-hover:hover {
    color: v-bind(primaryColor);
}

.danger-text-hover:hover {
    color: v-bind(errorColor);
}

.bg-primary-color-hover:hover {
    background-color: v-bind(primaryColor);
}

.border-primary-color {
    border: 2px solid v-bind(primaryColor);
}

.text-color {
    color: v-bind(textColor);
}

.secondary-text {
    color: v-bind(secondaryTextColor);
}

.border-b-theme-base-1 {
    border-bottom: 1px solid v-bind(themeBase1);
}

.border-b-theme-base-2 {
    border-bottom: 1px solid v-bind(themeBase2);
}
</style>
