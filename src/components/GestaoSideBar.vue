<script setup>
import { computed } from 'vue';
import { UserGroupIcon } from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';
import SideBarIcon from './SideBarIcon.vue';

const route = useRoute();

const activeTab = computed(() => route.name);
const isGestaoTab = computed(
    () => route.name === 'gestao' || route.name === 'colaboradores' || route.name === 'times'
);
</script>

<template>
    <div class="flex flex-col h-full w-full mx-auto">
        <SideBarIcon
            :active="isGestaoTab"
            @click="$router.push('/gestao')"
            class="hoverBgGreen cursor-pointer flex justify-items-center"
        >
            <UserGroupIcon class="h-6 mx-auto" />
            <p class="text-xs" v-if="isGestaoTab">Gestão</p>
        </SideBarIcon>

        <!-- <section v-if="isGestaoTab" class="space-y-1 py-2 text-xs font-semibold">
            <SideBarIcon
                :active="activeTab === 'colaboradores'"
                @click="$router.push('/gestao/colaboradores')"
                class="cursor-pointer"
            >
                <p>Colaboradores</p>
            </SideBarIcon>
            <SideBarIcon
                :active="activeTab === 'times'"
                @click="$router.push('/gestao/times')"
                class="cursor-pointer"
            >
                <p>Times</p>
            </SideBarIcon>
        </section> -->
    </div>
</template>
