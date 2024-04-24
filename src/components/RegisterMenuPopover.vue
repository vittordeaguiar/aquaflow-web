<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { Tippy } from 'vue-tippy';
</script>

<template>
    <Tippy
        interactive
        trigger="click"
        theme="light"
        placement="bottom"
        animation="scale"
    >
        <template v-slot:content>
            <div style="padding: 0.75rem; border-bottom: 2px solid #f3f4f6">
                <h3 style="font-weight: 600">Cadastros</h3>
            </div>
            <div
                class="options"
                style="padding: 0.5rem; width: 100%; border-radius: 0.375rem"
            >
                <p @click.prevent="$router.push('/clients')">Clientes</p>
                <p>Produtos</p>
                <p>Fornecedores</p>
            </div>
        </template>

        <button
            type="button"
            class="flex items-center cursor-pointer"
            style="background-color: transparent; border: none"
        >
            <p class="hover:underline text-color">Cadastros</p>
            <ChevronDownIcon class="h-4 w-4 primary-text" />
        </button>
    </Tippy>
</template>

<style scoped>
.options > p {
    cursor: pointer;
    padding: 8px;
    font-size: 0.875rem;
    border-radius: 0.375rem;
}

.options > p:hover {
    background-color: #e4e4e4;
}
</style>
