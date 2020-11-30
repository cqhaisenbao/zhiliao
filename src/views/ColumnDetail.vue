<template>
    <div class="column-detail-page w-75 mx-auto">
        <div class="column-info row mb-4 border-bottom pb-4 align-items-center" v-if="column">
            <div class="col-3 text-center">
                <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
            </div>
            <div class="col-9">
                <h4>{{column.title}}</h4>
                <p class="text-muted">{{column.description}}</p>
            </div>
        </div>
        <PostList :list="list"></PostList>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {useRoute} from 'vue-router';
    import {useStore} from 'vuex';
    import {testPosts, testData} from '@/testData';
    import PostList from '@/components/PostList.vue';

    export default defineComponent({
        components: {PostList},
        name: 'ColumnDetail',
        setup() {
            const store = useStore<GlobalDataProps>();
            const columnList = store.state.columns;
            const postList = store.state.posts;
            const currentId = +useRoute().params.id;
            const column = columnList.find(c => c.id === currentId);
            const list = postList.filter(post => post.columnId === currentId);
            return {column, list};
        }
    });
</script>

<style lang="scss" scoped>

</style>
