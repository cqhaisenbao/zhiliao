<template>
    <div class="d-flex justify-content-center align-items-center h-100 w-100 loading-container"
         :style="{backgroundColor: background || ''}">
        <div class="loading-content">
            <div class="spinner-border text-primary" role="status"></div>
            <p v-if="text" class="text-primary big mt-3">{{text}}</p>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        props: {
            text: {
                type: String,
                default: ''
            },
            background: {
                type: String
            }
        }
    });
</script>

<style scoped>
    .loading-container {
        background: rgba(255, 255, 255, .5);
        z-index: 100;
        position: fixed;
        top: 0;
        left: 0;
    }

    .loading-container {
        text-align: center;
    }
</style>
