<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
    MagnifyingGlassIcon,
    DocumentPlusIcon,
    PlusIcon,
    QueueListIcon,
    RectangleGroupIcon
} from '@heroicons/vue/24/outline';
import { ClientForm, ClientCards, ClientsList } from './';
import { ClientService } from '../services';

const clients = ref([]);
const visibility = reactive({ create: false });
const viewMode = ref('list');
const searchTerm = ref('');

const close = () => (visibility.create = false);

const openModal = (modal) => (visibility[modal] = true);

const fetchClients = async () => (clients.value = await ClientService.getAll());

const filterClients = () => {
    if (!searchTerm.value) return fetchClients();
    const term = searchTerm.value.toLowerCase();
    const clientsFiltered = clients.value.filter(
        (x) =>
            x.name.toLowerCase().includes(term) ||
            x.email.toLowerCase().includes(term) ||
            x.cpf.includes(term)
    );
    clients.value = clientsFiltered;
};

onMounted(async () => await fetchClients());
</script>

<template>
    <ClientForm v-if="visibility.create" type="create" @close="close" />

    <main class="w-full min-h-full space-y-4">
        <h1 class="font-medium text-3xl">Clientes</h1>
        <section>
            <header class="w-full flex justify-between">
                <form
                    @submit.prevent="filterClients"
                    class="w-full flex items-center space-x-4"
                >
                    <input
                        v-model="searchTerm"
                        class="w-54"
                        type="text"
                        placeholder="Pesquisar por nome, e-mail ou CPF"
                    />
                    <MagnifyingGlassIcon
                        @click.prevent="filterClients"
                        class="h-6 w-6 cursor-pointer primary-text-hover"
                    />
                </form>
                <div v-if="clients && clients.length > 0">
                    <button
                        @click.prevent="openModal('create')"
                        class="flex items-center justify-center space-x-2 w-36"
                    >
                        <PlusIcon class="h-5 w-5" />
                        <p class="font-medium">Inserir registro</p>
                    </button>
                </div>
            </header>

            <section v-if="clients && clients.length > 0" class="w-full pt-4">
                <div class="flex justify-start items-center space-x-4 my-2">
                    <button
                        @click="viewMode = 'list'"
                        class="flex items-center space-x-2"
                    >
                        <QueueListIcon class="w-5 h-5" />
                        <p
                            :class="
                                viewMode === 'list'
                                    ? 'font-semibold'
                                    : 'font-normal'
                            "
                        >
                            Lista
                        </p>
                    </button>
                    <button
                        @click="viewMode = 'cards'"
                        class="flex items-center space-x-2"
                    >
                        <RectangleGroupIcon class="w-5 h-5" />
                        <p
                            :class="
                                viewMode === 'cards'
                                    ? 'font-semibold'
                                    : 'font-normal'
                            "
                        >
                            Cartões
                        </p>
                    </button>
                </div>
                <ClientsList v-if="viewMode === 'list'" :clients="clients" />
                <ClientCards v-if="viewMode === 'cards'" :clients="clients" />
            </section>

            <section
                v-else
                class="flex flex-col justify-center items-center pt-52 space-y-6"
            >
                <DocumentPlusIcon class="w-36 h-36 primary-text" />
                <div class="flex flex-col items-center">
                    <h2 class="text-lg font-medium primary-text">
                        Nenhum item registrado.
                    </h2>
                    <p class="text-sm">
                        Ainda não existem registros no seu sistema, comece agora
                        mesmo!
                    </p>
                </div>
                <button class="flex items-center space-x-2">
                    <PlusIcon class="h-5 w-5" />
                    <p @click.prevent="openModal('create')" class="font-medium">
                        Inserir registro
                    </p>
                </button>
            </section>
        </section>
    </main>
</template>
.