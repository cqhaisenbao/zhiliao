<template>
    <div v-if="width>500" class="post-list">
        <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4>
                    <router-link :to="`/posts/${post._id}/`">{{ post.title }}</router-link>
                </h4>
                <div class="row my-3 align-items-center">
                    <div v-if="post.image" class="col-3">
                        <img :src="post.image.fitUrl" :alt="post.title" class="rounded-lg w-100">
                    </div>
                    <p :class="{'col-8': post.image}">{{ post.excerpt }}</p>
                </div>
                <span class="text-muted">{{ post.createdAt }}</span>
            </div>
        </article>
    </div>
    <div v-else class="post-list">
        <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
            <div class="card-body">
                <h4>
                    <router-link :to="`/posts/${post._id}/`">{{ post.title }}</router-link>
                </h4>
                <div class="textWrapper">
                    <div v-if="post.image">
                        <img class="text-image" :src="post.image.fitUrl" :alt="post.title">
                    </div>
                    <p class="text">{{ post.excerpt }}</p>
                </div>
                <span class="text-muted">{{ post.createdAt }}</span>
            </div>
        </article>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType, computed} from 'vue';
import {generateFitUrl} from '@/helper';

export default defineComponent({
    props: {
        list: {
            required: true,
            type: Array as PropType<PostProps[]>
        }
    },
    setup(props) {
        const width = document.body.clientWidth;
        const posts = computed(() => {
            return props.list.map(post => {
                generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill']);
                return post;
            });
        });
        return {posts, width};
    }
});
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.post-list h4 a {
    text-decoration: none;
    color: #1a1a1a;

    &:hover { color: #0d6efd;
    }
}

.textWrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    line-height: 1.5rem;

    .text {
        font-size: 15px;
        height: 6rem;
        @extend %ell;
    }

    .text-image {
        height: 6rem;
        border-radius: 12px;
        margin-right: 10px;
    }
}
</style>
