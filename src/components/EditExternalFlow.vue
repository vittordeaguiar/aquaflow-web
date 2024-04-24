<script setup>
import { ref, onMounted, watch } from 'vue';
import { updateExternalForm } from '../services/pipeService';
import {
    XCircleIcon,
    ClipboardIcon,
    CheckIcon
} from '@heroicons/vue/24/outline';
import { Tippy } from 'vue-tippy';
import { toast } from 'vue3-toastify';
import { useRoute } from 'vue-router';
import { getById } from '../services/pipeService';

const { pipeId } = defineProps(['pipeId']);

const emit = defineEmits(['close']);

const route = useRoute();

const pipe = ref({
    allowAnonymousResponse: false
});
const externalFormUrl = ref(route.fullPath);
const alreadyCopy = ref(false);

const close = () => emit('close');

const fetchPipe = async () => {
    const res = await getById(pipeId);
    pipe.value = {
        ...res,
        allowAnonymousResponse: res.allowAnonymousResponse === 1
    };
};

const save = async () => {
    await updateExternalForm(pipeId, pipe.value.allowAnonymousResponse);
    emit('close');
};

const copy = () => {
    navigator.clipboard.writeText(externalFormUrl.value);
    toast.success('Link copiado!');
    alreadyCopy.value = true;
    setTimeout(() => (alreadyCopy.value = false), 2000);
};

watch(
    () => pipe.value.allowAnonymousResponse,
    (value) => {
        externalFormUrl.value = '';
        if (value)
            externalFormUrl.value = `${window.location.origin}${route.fullPath}/external-form`;
    }
);

onMounted(async () => await fetchPipe());
</script>

<template>
    <main
        class="fixed -inset-10 flex items-center justify-center bg-opacity-60 bg-gray-900 z-10"
    >
        <section
            class="relative secondary-text rounded-lg p-8 bg-white text-base leading-relaxed shadow-lg max-w-lg w-full space-y-4"
        >
            <Tippy
                content="Fechar"
                class="absolute right-3 top-3 h-8 w-8 text-red-600 hover:text-red-800 cursor-pointer"
            >
                <XCircleIcon @click="close" />
            </Tippy>

            <div>
                <h1 class="font-semibold text-xl">Formulário externo</h1>
                <p class="font-light">
                    Um formulário externo gera um link para ser respondido fora
                    do sistema.
                </p>
            </div>

            <div class="flex items-center space-x-2">
                <label for="allowAnonymousResponse" class="cursor-pointer">
                    Ativar formulário externo?
                </label>
                <input
                    v-model="pipe.allowAnonymousResponse"
                    id="allowAnonymousResponse"
                    type="checkbox"
                    class="cursor-pointer"
                />
            </div>

            <div v-if="pipe.allowAnonymousResponse" class="flex flex-col">
                <label for="externalFormUrl">URL do formulário</label>
                <div class="flex items-center space-x-4">
                    <input
                        v-model="externalFormUrl"
                        id="externalFormUrl"
                        type="text"
                        class="w-full font-light"
                        disabled
                    />
                    <Tippy :content="alreadyCopy ? 'Copiado' : 'Copiar'">
                        <ClipboardIcon
                            v-if="!alreadyCopy"
                            @click="copy"
                            class="h-8 w-8 primary-text cursor-pointer"
                        />
                        <CheckIcon
                            v-if="alreadyCopy"
                            class="h-8 w-8 primary-text cursor-pointer"
                        />
                    </Tippy>
                </div>
            </div>

            <div class="flex justify-end items-center space-x-8">
                <p
                    class="cursor-pointer hover:text-gray-400 my-auto"
                    @click="close"
                >
                    Cancelar
                </p>
                <button @click.prevent="save" type="submit">Salvar</button>
            </div>
        </section>
    </main>
</template>
