<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
        <router-link to="/" class="navbar-brand">我的码鸭</router-link>
        <ul v-if="!user.isLogin" class="list-inline mb-0">
            <li class="list-inline-item ">
                <router-link to="/login" class=" btn btn-outline-light my-2 ">登陆</router-link>
            </li>
            <li class="list-inline-item">
                <router-link to="/signup" class="btn btn-outline-light my-2">注册</router-link>
            </li>
        </ul>
        <ul v-else class="list-inline mb-0">
            <li class="list-inline-item">
                <dropdown :title="`你好 ${user.nickName}`">
                    <dropdown-item>
                        <router-link to="/create" class="dropdown-item">新建文章</router-link>
                    </dropdown-item>
                    <dropdown-item disabled><a href="#" class="dropdown-item">编辑资料</a></dropdown-item>
                    <dropdown-item @click="logout"><a href="#" class="dropdown-item">退出登录</a></dropdown-item>
                </dropdown>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">

    import {defineComponent, computed} from 'vue';
    import Dropdown from './Dropdown.vue';
    import {useStore} from 'vuex';
    import DropdownItem from '@/components/DropdownItem.vue';
    import router from '@/router';

    export default defineComponent({
        name: 'GlobalHeader',
        components: {Dropdown, DropdownItem},

        setup() {
            const store = useStore();
            const user = computed(() => store.state.user);
            const logout = () => {
                store.commit('logout');
                router.push('/')
            };
            return {user, logout};
        }
    });
</script>

<style scoped>

</style>
