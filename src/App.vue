<template>
    <div class="container">
        <global-header></global-header>
        <router-view></router-view>
        <Footer/>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {createStore, useStore} from 'vuex';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import GlobalHeader from './components/GlobalHeader.vue';
    import Footer from '@/components/Footer.vue';

    export default defineComponent({
        name: 'App',
        components: {GlobalHeader, Footer},

    });
</script>

<style>

</style>
