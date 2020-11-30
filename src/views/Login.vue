<template>
    <div class="login-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">登录到知了</h5>
        <validate-form @form-submit="onFormSubmit">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validate-input :rules="emailRules" v-model="emailVal" placeholder="请输入邮箱地址" type="text"
                                ref="inputRef"/>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="passwordVal"/>
            </div>
            <template #submit>
                <button type="submit" class="btn btn-primary btn-block btn-large">登录</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import {useStore} from 'vuex';
    import {emailRules, passwordRules} from '@/rules/rules';
    import {useRouter} from 'vue-router';
    import ValidateInput from '../components/ValidateInput.vue';
    import ValidateForm from '../components/ValidateForm.vue';

    export default defineComponent({
        name: 'Login',
        components: {ValidateInput, ValidateForm},
        setup() {
            const router = useRouter();
            const emailVal = ref('');
            const store = useStore();
            const passwordVal = ref('');
            const onFormSubmit = (result: boolean) => {
                if (result) {
                    router.push('/');
                    store.commit('login');
                }
            };
            return {emailRules, emailVal, passwordVal, passwordRules, onFormSubmit};
        }
    });
</script>
