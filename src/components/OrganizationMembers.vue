<script setup>
import { ref, onMounted } from 'vue';
import { UserCircleIcon, TrophyIcon } from '@heroicons/vue/24/outline';
import { getMembers, updateOwner } from '../services/organizationService';
import { ToastActions, toast } from 'vue3-toastify';
import { useStore } from 'vuex';

const Store = useStore();

const { id } = defineProps(['id']);

const members = ref([]);
const isAdmin = ref(false);

const fetchMembers = async () => (members.value = await getMembers(id));

const updateOwnerOnOrganization = async (member) => {
    if (!isAdmin.value && Store.getters.userType !== 'ADMIN') {
        toast.warning('Você não tem permissão para realizar esta ação');
        return;
    }

    const ownerCount = members.value.filter((member) => member.isOwner).length;
    if (ownerCount === 1 && member.isOwner) {
        toast.warning(
            'Você não pode remover o único administrador da organização'
        );
        return;
    }

    const toastId = toast.loading('Adicionando administrador');

    setTimeout(async () => {
        try {
            await updateOwner(id, member, !member.isOwner);
            await fetchMembers();
        } finally {
            ToastActions.dismiss(toastId);
        }
    }, 800);
};

onMounted(async () => {
    await fetchMembers();
});
</script>

<template>
    <main class="w-full space-y-8">
        <section class="space-y-1">
            <div class="p-2 flex items-center space-x-3">
                <h2 class="text-lg font-semibold">Membros</h2>
                <p class="text-gray-300">({{ members.length }})</p>
                <p class="text-sm">
                    Essa tela serve apenas para listagem dos membros e alteração
                    de administrador, para maiores ações clique
                    <span
                        class="cursor-pointer"
                        @click="$router.push('/gestao/colaboradores')"
                        >aqui</span
                    >
                </p>
            </div>
            <div class="p-4">
                <ul class="text-base leading-relaxed font-normal space-y-4">
                    <li v-for="member in members" :key="member.id">
                        <div class="flex items-center space-x-8">
                            <div class="w-2/5 flex items-center space-x-2">
                                <UserCircleIcon class="h-10 cursor-pointer" />
                                <p class="font-semibold">{{ member.name }}</p>
                                <p>|</p>
                                <p class="font-light text-gray-300">
                                    {{ member.email }}
                                </p>
                            </div>
                            <TrophyIcon
                                @click="updateOwnerOnOrganization(member)"
                                :class="{
                                    'text-yellow-500': member.role === 'ADMIN',
                                    'text-white': member.role === 'MEMBER'
                                }"
                                class="h-6 cursor-pointer hover:text-yellow-500"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    </main>
</template>

<style scoped>
span {
    color: #288f4d;
}

input {
    width: 320px;
}
</style>
