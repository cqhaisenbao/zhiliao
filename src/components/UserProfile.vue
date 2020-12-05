<template>
    <div class="user-profile-component">
        <div class="d-flex align-items-center">
            <img :src="fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">
            <div class="detail ml-2">
                <h6 class="d-block mb-0">{{ user.nickName }}</h6>
                <span class="xxx">{{ user.description }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed, PropType} from 'vue';
import {addColumnAvatar} from '@/helper';

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<UserProps>,
            required: true
        }
    },
    setup(props) {
        const width = document.body.clientWidth;
        const fitUrl = computed(() => {
            addColumnAvatar(props.user, 50, 50);
            const {avatar} = props.user;
            return avatar && avatar.fitUrl;
        });
        return {fitUrl, width};
    }
});
</script>

<style>

.user-profile-component img {
    width: 50px;
    height: 50px;
    /* border: 1px solid #ccc;
    border-radius: 50px; */
}

@media (max-width: 480px) {
    .user-profile-component {
        width: 100%;

    }
    .xxx{
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        color: #666666;
        font-size: 13px;
        margin-top: 5px;
    }
}

</style>
