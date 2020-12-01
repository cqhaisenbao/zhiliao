<template>
    <div class="container">
        <global-header></global-header>
        <loader text="拼命加载中" background="rgba(0,0,0, 0.8)"></loader>
        <router-view></router-view>
        <Footer/>
    </div>
</template>

<script lang="ts">
    import {defineComponent, computed} from 'vue';
    import {createStore, useStore} from 'vuex';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import GlobalHeader from './components/GlobalHeader.vue';
    import Footer from '@/components/Footer.vue';
    import Loader from '@/components/Loader.vue';

    export default defineComponent({
        name: 'App',
        components: {GlobalHeader, Footer, Loader},
        setup() {
            const store = useStore();
            const currentUser = computed(() => {store.state.user;});
            const isLoading = computed(() => store.state.loading);
            return {isLoading, currentUser};
        }
    });
</script>


