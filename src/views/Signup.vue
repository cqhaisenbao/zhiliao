<template>
    <div class="signup-page mx-auto p-3 w-330">
        <h5 class="my-4 text-center">注册知了账户</h5>
        <validate-form @form-submit="onFormSubmit">
            <div class="mb-3">
                <label class="form-label">邮箱地址</label>
                <validate-input :rules="emailRules" v-model="formData.email" placeholder="请输入邮箱地址" type="text"/>
            </div>
            <div class="mb-3">
                <label class="form-label">昵称</label>
                <validate-input :rules="nameRules" v-model="formData.nickName" placeholder="请输入昵称" type="text"/>
            </div>
            <div class="mb-3">
                <label class="form-label">密码</label>
                <validate-input type="password" placeholder="请输入密码" :rules="passwordRules" v-model="formData.password"/>
            </div>
            <div class="mb-3">
                <label class="form-label">重复密码</label>
                <validate-input type="password" placeholder="请再次密码" :rules="repeatPasswordRules"
                                v-model="formData.repeatPassword"/>
            </div>
            <template #submit>
                <button type="submit" class="w-100 btn btn-primary btn-block btn-large">注册新用户</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import axios from 'axios';
import ValidateInput from '../components/ValidateInput.vue';
import ValidateForm from '../components/ValidateForm.vue';
import createMessage from '../components/createMessage';
import {emailRules, nameRules, passwordRules} from '@/rules/rules';

export default defineComponent({
    name: 'Signup',
    components: {ValidateInput, ValidateForm},
    setup() {
        const formData = reactive({
            email: '',
            nickName: '',
            password: '',
            repeatPassword: ''
        });
        const router = useRouter();
        const store = useStore<GlobalDataProps>();

        const repeatPasswordRules: RulesProp = [
            {type: 'required', message: '重复密码不能为空'},
            {
                type: 'custom',
                validator: () => {return formData.password === formData.repeatPassword;},
                message: '两次输入的密码不相同'
            },
        ];
        const onFormSubmit = (result: boolean) => {
            if (result) {
                const payload = {
                    email: formData.email,
                    password: formData.password,
                    nickName: formData.nickName
                };
                axios.post('/users/', payload).then(data => {
                    store.dispatch('loginAndFetch', payload);
                    createMessage('注册成功 正在跳转首页', 'success', 3000);
                    setTimeout(() => {
                        router.push('/login');
                    }, 3000);
                }).catch(e => {
                    console.log(e);
                });
            }
        };
        return {emailRules, nameRules, passwordRules, repeatPasswordRules, onFormSubmit, formData};
    }
});
</script>

<style>
.w-330 {
    max-width: 330px;
}
</style>
