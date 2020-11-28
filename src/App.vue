<template>
    <div class="container">
        <global-header :user="currentUser"></global-header>
        <column-list :list="list"/>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import ColumnList from './components/ColumnList.vue';
    import GlobalHeader from './components/GlobalHeader.vue';

    const currentUser: UserProps = {
        isLogin: true,
        name: 'frank'
    };

    const testData: ColumnProps[] = [
        {
            id: 1,
            title: 'test1专栏',
            description: '第一个测试专栏',
            avatar:
                'http://n.sinaimg.cn/front/330/w590h540/20181114/cl4l-hnvukfe9634590.jpg',
        },
        {
            id: 2,
            title: 'test2专栏',
            description: '第二个测试专栏',
        },
        {
            id: 3,
            title: 'test3专栏',
            description: '第三个测试专栏,第三个测试专栏,第三个测试专栏,第三个测试专栏',
            avatar:
                'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        },
        {
            id: 4,
            title: 'test4专栏',
            description:
                '第四个测试专栏,第四个测试专栏第四个测试专栏第四个测试专栏第四个测试专栏',
            avatar:
                'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        },
    ];

    export default defineComponent({
        name: 'App',
        components: {ColumnList, GlobalHeader},
        setup() {
            return {
                list: testData,
                currentUser,
            };
        },
    });
</script>

<style>
    .container {
        padding: 0;
        margin: 0;
    }
</style>

