<script setup>
import { computed } from 'vue';
import stores from '../stores';

const { active } = defineProps(['active']);

const textColor = computed(() => stores.getters.textColor);
const primaryColor = computed(() => stores.getters.primaryColor);
</script>

<template>
    <div
        class="flex w-full align-center justify-center p-1"
        :style="{
            backgroundColor: [active ? `${primaryColor}` : ``]
        }"
    >
        <div
            class="text"
            :style="{
                color: [active ? 'black' : `${textColor}`]
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.text {
    min-width: 24px;
    min-height: 24px;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    justify-content: start;
}
</style>
