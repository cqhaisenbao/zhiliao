<template>
    <div class="row mt-5">
        <div v-for="column in columnList" :key="column._id" class="col-sm-6 col-md-3 col-xs-1 mb-4">
            <div class="crad h-100 shadow-sm">
                <div class="card-body text-center">
                    <img :src="column.avatar && column.avatar.url + `?x-oss-process=image/resize,m_fill,h_100,w_100` " alt="column.title" class="rounded-circle border border-light mb-4"/>
                    <h5 class="card-title">{{ column.title }}</h5>
                    <p id="description" class="card-text text-truncate text-left text-wrap mt-3">{{ column.description }}</p>
                    <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary">进入专栏
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from 'vue';
import {addColumnAvatar} from '@/helper';

export default defineComponent({
    name: 'ColumnList',
    props: {
        list: {
            type: Array as PropType<ColumnProps[]>,
            required: true,
        },
    },
    setup(props) {
        const columnList = computed(() => {
            return props.list.map((column) => {
                addColumnAvatar(column, 50, 50);
                return column;
            });
        });
        return {columnList};
    },
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$line-height: 1.7rem;

.card-body {
    img {
        width: 50px;
        height: 50px;
    }

    h5 {
        @include col-style($line-clamp: 1)

    }

    #description {
        @include col-style;
        line-height: $line-height;
        height: $line-height*2;
    }
}

</style>
