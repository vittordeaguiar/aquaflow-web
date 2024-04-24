<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../router';
import { getById } from '../services/pipeService';
import { getFormByPipeId, saveTask } from '../services/fieldService';
import { ToastActions, toast } from 'vue3-toastify';

const route = useRoute();

const pipeId = computed(() => route.params.id);

const pipe = ref(null);
const form = ref(null);
const task = ref({ title: '' });
const alreadySendForm = ref(false);

const fetchPipe = async () => (pipe.value = await getById(pipeId.value));

const fetchForm = async () => {
    const formFields = await getFormByPipeId(pipeId.value);
    form.value = formFields;
    formFields.forEach((field) => {
        task.value[field.id] = field.defaultValue || '';
    });
};

const verifyExternalForm = async () => {
    if (!pipe.value.allowAnonymousResponse) {
        await router.push('/');
        toast.warning('Este formulário não permite respostas anônimas.');
    }
};

const save = async () => {
    const toastId = toast.loading('Enviando...');
    try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await saveTask({ phaseId: pipe.value.phaseId, task: task.value });
        alreadySendForm.value = true;
    } finally {
        ToastActions.dismiss(toastId);
    }
};

onMounted(async () => {
    await fetchPipe();
    await verifyExternalForm();
    await fetchForm();
});
</script>

<template>
    <main
        v-if="alreadySendForm"
        class="flex flex-col w-full items-center justify-center"
    >
        <h1 class="text-2xl font-semibold">Formulário enviado!</h1>
    </main>
    <main
        v-else-if="!alreadySendForm && pipe && pipe.name"
        class="flex flex-col w-full items-center justify-center"
    >
        <header class="w-full text-center">
            <h1 class="text-2xl">Formulário externo</h1>
            <h2 class="text-xl font-medium">{{ pipe.name }}</h2>
        </header>
        <section class="w-full sm:w-1/2 md:w-1/4 sm:px-0 md:px-0 px-6">
            <div v-if="form && form.length > 0">
                <div class="py-2">
                    <label>Título</label>
                    <p class="text-sm font-light">Título da solicitação</p>
                    <input v-model="task.title" type="text" class="w-full" />
                </div>
                <div v-for="(item, index) in form" :key="index">
                    <template v-if="item.type === 'text'">
                        <div class="py-2">
                            <label>{{ item.title }}</label>
                            <p class="text-sm font-light">{{ item.label }}</p>
                            <input
                                type="text"
                                class="w-full"
                                v-model="task[item.id]"
                            />
                        </div>
                    </template>

                    <template v-else-if="item.type === 'number'">
                        <div class="py-2">
                            <label>{{ item.title }}</label>
                            <p class="text-sm font-light">
                                {{ item.label }}
                            </p>
                            <input type="number" class="w-full" />
                        </div>
                    </template>

                    <template v-else-if="item.type === 'date'">
                        <div class="py-2">
                            <label>{{ item.title }}</label>
                            <p class="text-sm font-light">
                                {{ item.label }}
                            </p>
                            <input type="date" class="w-full" />
                        </div>
                    </template>

                    <template v-else-if="item.type === 'select'">
                        <div class="py-2">
                            <label>{{ item.title }}</label>
                            <p class="text-sm font-light">
                                {{ item.label }}
                            </p>
                            <select class="w-full">
                                <option disabled selected></option>
                            </select>
                        </div>
                    </template>
                </div>
                <div class="flex justify-end">
                    <button class="my-2" @click.prevent="save">Enviar</button>
                </div>
            </div>
        </section>
    </main>
</template>
