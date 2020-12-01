<template>
    <div class="container">
        <global-header></global-header>
        <h1 v-if="isLoading">正在读取</h1>
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

    export default defineComponent({
        name: 'App',
        components: {GlobalHeader, Footer},
        setup() {
            const store = useStore();
            const currentUser = computed(() => {store.state.user;});
            const isLoading = computed(() => store.state.loading);
            return {isLoading, currentUser};
        }
    });
</script>

<style>

</style>
