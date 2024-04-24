<script setup>
import { ref, onMounted } from 'vue';
import {
    XMarkIcon,
    InformationCircleIcon,
    ArrowDownIcon,
    ArrowUpIcon
} from '@heroicons/vue/24/outline';
import { Tippy } from 'vue-tippy';
import {
    genders,
    maritalStatuses,
    validateCPF,
    validateCellphone
} from '../helpers';
import {
    AddressService,
    DocumentValidationService,
    CellphoneService,
    ClientService
} from '../services';
import { toast, ToastActions } from 'vue3-toastify';

const { type, clientId } = defineProps(['type', 'clientId']);
const emit = defineEmits(['close']);

const client = ref({
    name: '',
    cpf: '',
    cellphone: '',
    email: '',
    civilState: '',
    profession: '',
    gender: '',
    addressId: null
});
const address = ref({
    zipcode: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: ''
});
const showAdditionalData = ref(true);
const formErrors = ref({
    name: false,
    cpf: false,
    cellphone: false,
    email: false,
    zipcode: false,
    state: false,
    city: false,
    neighborhood: false,
    street: false,
    number: false
});

const close = () => emit('close');

const fetchAddress = async () => {
    if (!address.value.zipcode) return;
    const data = await AddressService.getByZipcode(address.value.zipcode);
    if (!data) return;
    address.value.state = data.state;
    address.value.zipcode = data.cep;
    address.value.city = data.city;
    address.value.neighborhood = data.neighborhood;
    address.value.street = data.street;
};

const validateAndFormatCPF = () => {
    if (!client.value.cpf) return;
    client.value.cpf = DocumentValidationService.sanitizeCPF(client.value.cpf);
};

const validateAndFormatCellphone = () => {
    if (!client.value.cellphone) return;
    client.value.cellphone = CellphoneService.sanitizeCellphone(
        client.value.cellphone
    );
};

const isNonEmpty = (value) => value != null && value.trim() !== '';

const validateClientForm = () => {
    formErrors.value.name = !isNonEmpty(client.value.name);
    formErrors.value.cpf =
        !isNonEmpty(client.value.cpf) || !validateCPF(client.value.cpf);
    formErrors.value.cellphone =
        !isNonEmpty(client.value.cellphone) ||
        !validateCellphone(client.value.cellphone);
    formErrors.value.email = !isNonEmpty(client.value.email);
    return Object.values(formErrors.value).every((error) => !error);
};

const validateAddressForm = () => {
    formErrors.value.zipcode = !isNonEmpty(address.value.zipcode);
    formErrors.value.state = !isNonEmpty(address.value.state);
    formErrors.value.city = !isNonEmpty(address.value.city);
    formErrors.value.street = !isNonEmpty(address.value.street);
    formErrors.value.neighborhood = !isNonEmpty(address.value.neighborhood);
    formErrors.value.number = !isNonEmpty(address.value.number);
    return Object.values(formErrors.value).every((error) => !error);
};

const create = async () => {
    const addressCreated = await AddressService.create(address.value);
    client.value.addressId = addressCreated.id;
    await ClientService.create(client.value);
};

const update = async () => {
    const { address, ...clientData } = client.value;
    await Promise.all([
        AddressService.update(address),
        ClientService.update(clientData)
    ]);
};

const save = async () => {
    if (!validateClientForm() || !validateAddressForm()) {
        toast.error('Por favor, corrija os erros antes de salvar.');
        return;
    }

    const toastId = toast.loading('Salvando...');

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
        if (type === 'create') await create();
        else await update();
        close();
        ToastActions.dismiss(toastId);
        toast.success('Registro salvo com sucesso!');
    } catch (error) {
        ToastActions.dismiss(toastId);
        toast.error(`Erro: ${error.message}`);
    }
};

const fetchClient = async () => {
    const data = await ClientService.getById(clientId);
    client.value = data;
    address.value = data.address;
};

onMounted(async () => {
    if (type === 'update') await fetchClient();
});
</script>

<template>
    <main
        class="fixed -inset-10 flex items-center justify-center bg-opacity-70 bg-gray-900 z-10 overflow-auto"
    >
        <section
            class="relative bg-theme-base-1 rounded-md p-8 text-base leading-relaxed shadow-lg space-y-4 overflow-auto max-height max-width"
        >
            <Tippy
                content="Fechar"
                class="absolute right-3 top-3 h-8 w-8 text-red-600 hover:text-red-800 cursor-pointer"
            >
                <XMarkIcon @click="close" />
            </Tippy>

            <div class="flex items-center space-x-2">
                <h1 class="text-xl font-medium">Cliente</h1>
                <Tippy
                    content="Formulário para adicionar ou editar um cliente."
                >
                    <InformationCircleIcon class="h-6" />
                </Tippy>
            </div>

            <section class="space-y-2">
                <h2 class="pt-4 text-lg font-medium">Dados cadastrais</h2>

                <div
                    class="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0"
                >
                    <div class="flex flex-col w-full">
                        <label for="name">Nome completo</label>
                        <input
                            v-model="client.name"
                            id="name"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.name }"
                            required
                        />
                        <span
                            v-if="formErrors.name"
                            class="text-red-500 text-sm"
                        >
                            Nome é obrigatório.
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="cpf">CPF</label>
                        <input
                            v-model="client.cpf"
                            id="name"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.cpf }"
                            @blur="validateAndFormatCPF"
                            required
                        />
                        <span v-if="formErrors.cpf" class="text-red-500 text-sm"
                            >CPF é obrigatório.</span
                        >
                    </div>
                </div>

                <h2 class="pt-4 text-lg font-medium">Endereço</h2>

                <div
                    class="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0"
                >
                    <div class="flex flex-col w-full">
                        <label for="zipcode">CEP</label>
                        <input
                            v-model="address.zipcode"
                            id="zipcode"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.zipcode }"
                            @blur="fetchAddress"
                        />
                        <span
                            v-if="formErrors.zipcode"
                            class="text-red-500 text-sm"
                        >
                            CEP é obrigatório.
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="state">Estado</label>
                        <input
                            v-model="address.state"
                            id="state"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.state }"
                        />
                        <span
                            v-if="formErrors.state"
                            class="text-red-500 text-sm"
                        >
                            Estado é obrigatório.
                        </span>
                    </div>
                </div>

                <div
                    class="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0"
                >
                    <div class="flex flex-col w-full">
                        <label for="city">Cidade</label>
                        <input
                            v-model="address.city"
                            id="city"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.city }"
                        />
                        <span
                            v-if="formErrors.city"
                            class="text-red-500 text-sm"
                        >
                            Cidade é obrigatório.
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="neighborhood">Bairro</label>
                        <input
                            v-model="address.neighborhood"
                            id="neighborhood"
                            type="text"
                            class="w-full"
                            :class="{
                                'border-red-500': formErrors.neighborhood
                            }"
                        />
                        <span
                            v-if="formErrors.neighborhood"
                            class="text-red-500 text-sm"
                        >
                            Bairro é obrigatório.
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="number">Número</label>
                        <input
                            v-model="address.number"
                            id="number"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.number }"
                        />
                        <span
                            v-if="formErrors.number"
                            class="text-red-500 text-sm"
                        >
                            Número da casa é obrigatório.
                        </span>
                    </div>
                </div>

                <div
                    class="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0"
                >
                    <div class="flex flex-col w-full">
                        <label for="street">Rua</label>
                        <input
                            v-model="address.street"
                            id="street"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.street }"
                        />
                        <span
                            v-if="formErrors.street"
                            class="text-red-500 text-sm"
                        >
                            Rua é obrigatório.
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="complement">Complemento</label>
                        <input
                            v-model="address.complement"
                            id="complement"
                            type="text"
                            class="w-full"
                        />
                    </div>
                </div>

                <h2 class="pt-4 text-lg font-medium">Contato</h2>

                <div
                    class="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0"
                >
                    <div class="flex flex-col w-full">
                        <label for="cellphone">Telefone</label>
                        <input
                            v-model="client.cellphone"
                            id="cellphone"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.cellphone }"
                            @blur="validateAndFormatCellphone"
                            required
                        />
                        <span
                            v-if="formErrors.cellphone"
                            class="text-red-500 text-sm"
                        >
                            Celular é obrigatório.
                        </span>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="email">E-mail</label>
                        <input
                            v-model="client.email"
                            id="email"
                            type="text"
                            class="w-full"
                            :class="{ 'border-red-500': formErrors.email }"
                        />
                        <span
                            v-if="formErrors.cellphone"
                            class="text-red-500 text-sm"
                        >
                            Celular é obrigatório.
                        </span>
                    </div>
                </div>

                <div class="flex items-center space-x-2 pt-4">
                    <h2
                        @click="showAdditionalData = !showAdditionalData"
                        class="text-lg font-medium cursor-pointer"
                    >
                        Dados adicionais
                    </h2>
                    <ArrowDownIcon
                        v-if="!showAdditionalData"
                        @click="showAdditionalData = !showAdditionalData"
                        class="w-4 h-4 primary-text cursor-pointer"
                    />
                    <ArrowUpIcon
                        v-if="showAdditionalData"
                        @click="showAdditionalData = !showAdditionalData"
                        class="w-4 h-4 primary-text cursor-pointer"
                    />
                </div>

                <div
                    v-if="showAdditionalData"
                    class="flex flex-col md:flex-row space-y-4 md:space-x-8 md:space-y-0"
                >
                    <div class="flex flex-col w-full">
                        <label for="civilState">Estado civil</label>
                        <select
                            v-model="client.civilState"
                            id="civilState"
                            class="w-full"
                        >
                            <option value="">Selecione...</option>
                            <option
                                v-for="item in maritalStatuses"
                                :key="item.status"
                                :value="item.status"
                            >
                                {{ item.status }}
                            </option>
                        </select>
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="profession">Profissão</label>
                        <input
                            v-model="client.profession"
                            id="profession"
                            type="text"
                            class="w-full"
                        />
                    </div>
                    <div class="flex flex-col w-full">
                        <label for="gender">Sexo</label>
                        <select
                            v-model="client.gender"
                            id="gender"
                            class="w-full"
                        >
                            <option value="">Selecione...</option>
                            <option
                                v-for="item in genders"
                                :key="item.nome"
                                :value="item.nome"
                            >
                                {{ item.nome }}
                            </option>
                        </select>
                    </div>
                </div>
            </section>

            <div class="flex justify-end items-center space-x-8">
                <button class="button-secondary my-auto" @click="close">
                    Cancelar
                </button>
                <button @click.prevent="save" type="submit">Salvar</button>
            </div>
        </section>
    </main>
</template>

<style scoped>
.max-height {
    max-height: 80vh;
}

.max-width {
    width: 100%;
    max-width: 90vw;
}

@media (min-width: 768px) and (max-width: 1280px) {
    .max-width {
        max-width: 70vw;
    }
}

@media (min-width: 1280px) {
    .max-width {
        max-width: 50vw;
    }
}
</style>
