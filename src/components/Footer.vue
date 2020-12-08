<template>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
        <small>
            <ul class="list-inline mb-0">
                <li class="list-inline-item">© 2020 知了专栏</li>
                <li class="list-inline-item"><a href="https://github.com/cqhaisenbao/zhiliao">github</a></li>
            </ul>
        </small>
    </footer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
    name: 'Footer'
});
</script>

<style lang="scss" scoped>
li > a {
    text-decoration: none;
}
</style>
