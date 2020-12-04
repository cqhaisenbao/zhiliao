<template>
    <div class="container">
        <global-header></global-header>
        <loader v-if="isLoading" text="拼命加载中" background="rgba(0,0,0, 0.8)"></loader>
        <!--key解决编辑文章与修改文章组件复用路由跳转页面不刷新:key="$route.fullPath"-->
        <router-view/>
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


