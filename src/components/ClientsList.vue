<script setup>
import { ref, computed } from 'vue';
import { ClientForm } from './';

const { clients } = defineProps(['clients']);

const currentPage = ref(1);
const clientIdSelected = ref(null);
const showEditModal = ref(false);
const itemsPerPage = 5;

const totalPages = computed(() => Math.ceil(clients.length / itemsPerPage));
const paginatedClients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return clients.slice(start, start + itemsPerPage);
});

const handlePageChange = (newPage) => (currentPage.value = newPage);

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

    <main class="w-full flex flex-col">
        <div class="list-scroll-container">
            <ul class="list-container font-medium">
                <li class="header">
                    <span>Nome</span>
                    <span>CPF</span>
                    <span>E-mail</span>
                    <span>Celular</span>
                </li>
            </ul>
            <ul class="list-container">
                <li
                    v-for="client in paginatedClients"
                    @click.prevent="openEditModal(client)"
                    :key="client.id"
                    class="client-item bg-theme-base-1 cursor-pointer hover:bg-transparent"
                >
                    <span>{{ client.name }}</span>
                    <span>{{ client.cpf }}</span>
                    <span>{{ client.email }}</span>
                    <span>{{ client.cellphone }}</span>
                </li>
            </ul>
        </div>
        <div class="pagination-container mt-6">
            <button
                v-for="page in totalPages"
                :key="page"
                :class="{ active: page === currentPage }"
                @click="handlePageChange(page)"
            >
                {{ page }}
            </button>
        </div>
    </main>
</template>

<style scoped>
.list-scroll-container {
    overflow-x: auto;
    width: 100%;
}

.list-container {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    width: max-content;
}

.header,
.client-item {
    display: flex;
    padding: 0.5rem;
    border-bottom: 1px solid #444444;
    width: 100%;
}

.header span,
.client-item span {
    flex: 1;
    min-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

.pagination-container button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #efefef;
    cursor: pointer;
}

.pagination-container button.active {
    background-color: #288f4d;
    color: white;
}

@media (max-width: 600px) {
    .list-container {
        min-width: 200px;
        text-align: center;
    }

    .pagination-container button {
        padding: 10px 12px;
    }
}
</style>
.