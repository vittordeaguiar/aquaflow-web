<script setup>
import { ref } from 'vue';
import { TrashIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { Tippy } from 'vue-tippy';
import { ClientForm } from './';

const { clients } = defineProps(['clients']);

const clientIdSelected = ref(null);
const showEditModal = ref(false);

const openEditModal = (client) => {
    clientIdSelected.value = client.id;
    showEditModal.value = true;
};

const close = () => (showEditModal.value = false);
</script>

<template>
    <ClientForm
        v-if="showEditModal"
        type="update"
        :clientId="clientIdSelected"
        @close="close"
    />

    <main class="space-y-6">
        <article
            v-for="client in clients"
            :key="client.id"
            class="flex flex-col p-4 bg-theme-base-1 bg-theme-base-2-hover shadow-lg rounded-md"
        >
            <div class="flex items-center justify-between">
                <h2 class="font-medium text-lg">
                    {{ client.name }}
                </h2>
                <div class="flex space-x-4">
                    <Tippy content="Editar">
                        <PencilIcon
                            @click.prevent="openEditModal(client)"
                            class="w-5 h-5 cursor-pointer"
                        />
                    </Tippy>
                    <Tippy content="Excluir">
                        <TrashIcon
                            @click.stop="console.log('excluir')"
                            class="w-5 h-5 cursor-pointer"
                        />
                    </Tippy>
                </div>
            </div>
            <div class="space-y-1">
                <p>
                    <span class="font-normal">E-mail:</span> {{ client.email }}
                </p>
                <p><span class="font-normal">CPF:</span> {{ client.cpf }}</p>
                <p>
                    <span class="font-normal">Celular:</span>
                    {{ client.cellphone }}
                </p>
            </div>
        </article>
    </main>
</template>
.