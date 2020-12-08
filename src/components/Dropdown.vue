<template>
    <div class="dropdown" ref='dropdownRef'>
        <a href="#" class=" btn btn-outline-light my-2 dropdown-toggle " @click.prevent="toggleOpen">{{ title }}</a>
        <ul @click.prevent="clickUl" class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
            <slot></slot>
        </ul>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import useClickOutside from '../hooks/useClickOutside';

export default defineComponent({
    name: 'Dropdown',
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    setup() {
        const isOpen = ref(false);
        const dropdownRef = ref<null | HTMLElement>(null);
        const toggleOpen = () => {isOpen.value = !isOpen.value;};
        const isClickOutside = useClickOutside(dropdownRef);
        const clickUl = () => {if (isOpen.value === true) isOpen.value = false;};
        watch(isClickOutside, () => {
            if (isOpen.value && isClickOutside.value) {
                isOpen.value = false;
            }
        });
        return {isOpen, toggleOpen, dropdownRef, clickUl};
    },
});
</script>

<style lang="scss" scoped></style>
