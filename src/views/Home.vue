<template>
    <div class="home-page">
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <img src="../assets/callout.svg" alt="callout" class="w-50"/>
                    <h2 class="font-weight-light">随心写作，自由表达</h2>
                    <p><a href="#" class="btn btn-primary my-2">开始写文章</a></p>
                </div>
            </div>
        </section>
        <h4 class="font-weight-bold text-center">发现精彩</h4>
        <column-list :list="testData"></column-list>
        <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25" @click="loadMorePage">
            加载更多
        </button>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import ColumnList from '../components/ColumnList.vue';

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
        name: 'Home',
        components: {
            ColumnList
        },
        setup(){
            return{testData}
        }
    });
</script>

