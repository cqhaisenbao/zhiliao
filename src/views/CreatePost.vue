<template>
    <div class="create-post-page">
        <h4>新建文章</h4>
        <input type="file" name="file" @change.prevent="handleFileChange"/>
        <validate-form @form-submit="onFormSubmit">
            <div class="mb-3">
                <label class="form-label">文章标题：</label>
                <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题"/>
            </div>
            <div class="mb-3">
                <label class="form-label">文章详情：</label>
                <validate-input tag="textarea" rows="10" placeholder="请输入文章详情" :rules="contentRules"
                                v-model="contentVal"/>
            </div>
            <template #submit>
                <button @click="onFormSubmit" class="btn btn-primary btn-large">发表文章</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import {useRouter} from 'vue-router';
    import {useStore} from 'vuex';
    import axios from 'axios';
    import ValidateInput from '../components/ValidateInput.vue';
    import ValidateForm from '../components/ValidateForm.vue';
    import {titleRules, contentRules} from '@/rules/rules';

    export default defineComponent({
        name: 'Login',
        components: {ValidateInput, ValidateForm},
        setup() {
            const titleVal = ref('');
            const contentVal = ref('');
            const store = useStore<GlobalDataProps>();
            const router = useRouter();
            const onFormSubmit = (result: boolean) => {
                if (result) {
                    const {column} = store.state.user;
                    if (column) {
                        const newPost: PostProps = {
                            title: titleVal.value,
                            content: contentVal.value,
                            column
                        };
                        store.commit('createPost', newPost);
                        router.push(`/column/${ column }`);
                    }
                }
            };
            const handleFileChange = (e: Event) => {
                const target = e.target as HTMLInputElement;
                const files = target.files;
                if (files) {
                    const uploadedFile = files[0];
                    const formData = new FormData();
                    formData.append(uploadedFile.name, uploadedFile);
                    axios.post('/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => console.log(res)).catch(err => console.log(err));
                }
            };

            return {titleRules, titleVal, contentVal, contentRules, onFormSubmit, handleFileChange};
        }
    });
</script>
<style>
    .create-post-page .file-upload-container {
        height: 200px;
        cursor: pointer;
        overflow: hidden;
    }

    .create-post-page .file-upload-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .uploaded-area {
        position: relative;
    }

    .uploaded-area:hover h3 {
        display: block;
    }

    .uploaded-area h3 {
        display: none;
        position: absolute;
        color: #999;
        text-align: center;
        width: 100%;
        top: 50%;
    }
</style>
