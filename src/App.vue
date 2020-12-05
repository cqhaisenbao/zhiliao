<template>
    <div class="layout">
        <global-header class="nav"/>
        <div class="container">
            <loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0, 0.8)"></loader>
            <router-view :key="$route.fullPath"/>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted, watch} from 'vue';
import {createStore, useStore} from 'vuex';
import 'bootstrap/dist/css/bootstrap.min.css';
import GlobalHeader from './components/GlobalHeader.vue';
import Footer from '@/components/Footer.vue';
import Loader from '@/components/Loader.vue';
import createMessage from '@/components/createMessage';
import axios from 'axios';

export default defineComponent({
    name: 'App',
    components: {GlobalHeader, Footer, Loader},
    setup() {
        const store = useStore<GlobalDataProps>();
        const currentUser = computed(() => store.state.user);
        const isLoading = computed(() => store.state.loading);
        const error = computed(() => store.state.error);

        watch(error, () => {
            const {status, message} = error.value;
            if (status && message) {
                createMessage(message, 'error', 3000);
            }
        });
        return {isLoading, currentUser, error};
    }
});
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.container {
    flex-grow: 1;
}

.nav {
    flex-shrink: 0;
    width: 100%;
}
</style>


