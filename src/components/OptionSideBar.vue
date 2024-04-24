<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Cog8ToothIcon } from '@heroicons/vue/24/outline';
import SideBarIcon from './SideBarIcon.vue';

const Router = useRouter();
const tab = ref(null);

const handleClick = (activeSubTab) => {
    tab.value = activeSubTab;
    Router.push({
        params: { activeSubTab: activeSubTab || '' }
    });
};
</script>

<template>
    <div class="sideWrapper">
        <div class="separador">
            <Cog8ToothIcon class="h-6" />
            <span>Ajustes</span>
        </div>
        <SideBarIcon :active="tab === 'geral'" @click="handleClick('geral')"
            >Geral
        </SideBarIcon>
        <SideBarIcon :active="tab === 'perfils'" @click="handleClick('perfils')"
            >Perfil
        </SideBarIcon>
        <SideBarIcon :active="tab === 'okrs'" @click="handleClick('okrs')"
            >OKRs
        </SideBarIcon>
    </div>
</template>

<style scoped>
.sideWrapper {
    display: flex;
    height: 100%;
    min-width: 100px;
    gap: 14px;
    flex-direction: column;

    cursor: pointer;
}

.separador {
    display: flex;
    width: 100%;
    padding: 0 16px;
    gap: 12px;
    justify-content: start;
    align-items: center;
    span {
        font-family: Poppins;
        font-size: 20px;
        font-weight: 500;
    }
}
</style>
