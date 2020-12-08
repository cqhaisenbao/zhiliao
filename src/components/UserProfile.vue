<template>
    <div class="user-profile-component">
        <div class="d-flex align-items-center">
            <img :src="user.avatar.url+ `?x-oss-process=image/resize,m_fill,h_100,w_100`" class="rounded-circle img-thumbnail">
            <div class="detail ml-2">
                <h6 class="d-block mb-0">{{ user.nickName }}</h6>
                <span class="xxx">{{ user.description }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<UserProps>,
            required: true
        }
    }
});
</script>

<style>

.user-profile-component img {
    width: 50px;
    height: 50px;
}

@media (max-width: 480px) {
    .user-profile-component {
        width: 100%;

    }

    .xxx {
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        color: #666666;
        font-size: 13px;
        margin-top: 5px;
    }
}

</style>
