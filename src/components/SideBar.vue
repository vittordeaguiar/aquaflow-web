<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
    HomeIcon,
    UserGroupIcon,
    Cog8ToothIcon,
    ClipboardDocumentListIcon,
    RectangleGroupIcon,
    Squares2X2Icon
} from '@heroicons/vue/24/outline';
import store from '../stores';
import SideBarIcon from './SideBarIcon.vue';
import { Tippy } from 'vue-tippy';

const route = useRoute();

const isAuthenticated = computed(() => store.getters.isAuthenticated);
const activeTab = computed(() => route.name);
const isGestaoTab = computed(
    () =>
        route.name === 'gestao' ||
        route.name === 'colaboradores' ||
        route.name === 'times'
);
const themeBase1 = computed(() => store.getters.themeBase1);
</script>

<template>
    <section class="px-1 bg-theme-base-1">
        <div class="flex flex-col items-center h-full space-y-8">
            <Tippy content="Página Inicial" placement="right">
                <SideBarIcon
                    :active="activeTab === 'home'"
                    @click="$router.push('/home')"
                    class="bg-primary-color-hover cursor-pointer rounded-md"
                >
                    <HomeIcon />
                </SideBarIcon>
            </Tippy>

            <Tippy content="Organizações" placement="right">
                <SideBarIcon
                    :active="
                        activeTab === 'organizations' ||
                        activeTab === 'organization'
                    "
                    @click="$router.push('/organizations')"
                    class="bg-primary-color-hover cursor-pointer rounded-md"
                >
                    <Squares2X2Icon class="h-6 mx-auto" />
                </SideBarIcon>
            </Tippy>

            <Tippy content="Projetos" placement="right">
                <SideBarIcon
                    :active="
                        activeTab === 'projects' || activeTab === 'project'
                    "
                    @click="$router.push('/projects')"
                    class="bg-primary-color-hover cursor-pointer rounded-md"
                >
                    <ClipboardDocumentListIcon class="h-6 mx-auto" />
                </SideBarIcon>
            </Tippy>

            <Tippy content="Processos" placement="right">
                <SideBarIcon
                    :active="activeTab === 'pipes' || activeTab === 'pipe'"
                    @click="$router.push('/pipes')"
                    class="bg-primary-color-hover cursor-pointer rounded-md"
                >
                    <RectangleGroupIcon class="h-6 mx-auto" />
                </SideBarIcon>
            </Tippy>

            <Tippy
                v-if="isAuthenticated && store.getters.userType === 'ADMIN'"
                content="Gestão de Pessoas"
                placement="right"
            >
                <SideBarIcon
                    :active="isGestaoTab"
                    @click="$router.push('/gestao')"
                    class="bg-primary-color-hover cursor-pointer rounded-md flex justify-items-center"
                >
                    <UserGroupIcon class="h-6 mx-auto" />
                </SideBarIcon>
            </Tippy>

            <Tippy
                v-if="isAuthenticated"
                content="Configurações"
                placement="right"
            >
                <SideBarIcon
                    :active="activeTab === 'edit-profile'"
                    @click="$router.push('/edit-profile')"
                    class="bg-primary-color-hover cursor-pointer rounded-md"
                >
                    <Cog8ToothIcon />
                </SideBarIcon>
            </Tippy>
        </div>
    </section>
</template>

<style scoped>
.bg-theme-base-1 {
    background-color: v-bind(themeBase1);
}
</style>
