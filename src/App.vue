<template>
    <div class="container">
        <global-header></global-header>
        <loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0, 0.8)"></loader>
        <message type="error" :message="error.message" v-if="error.status"></message>
        <router-view/>
        <Footer/>
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed, onMounted} from 'vue';
    import {createStore, useStore} from 'vuex';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import GlobalHeader from './components/GlobalHeader.vue';
    import Footer from '@/components/Footer.vue';
    import Loader from '@/components/Loader.vue';
    import Message from '@/components/Message.vue';
    import axios from 'axios';

    export default defineComponent({
        name: 'App',
        components: {GlobalHeader, Footer, Loader, Message},
        setup() {
            const store = useStore<GlobalDataProps>();
            const currentUser = computed(() => store.state.user);
            const isLoading = computed(() => store.state.loading);
            const token = computed(() => store.state.token);
            const error = computed(() => store.state.error);
            onMounted(() => {
                if (!currentUser.value.isLogin && token.value) {
                    axios.defaults.headers.common.Authorization = `Bearer ${ token.value }`;
                    store.dispatch('fetchCurrentUser');
                }
            });
            return {isLoading, currentUser, error};
        }
    });
</script>


