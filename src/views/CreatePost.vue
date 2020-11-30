<template>
    <div class="create-post-page">
        <h4>新建文章</h4>
        <validate-form >
            <div class="mb-3">
                <label class="form-label">文章标题：</label>
                <validate-input :rules="titleRules" v-model="titleVal"
                                placeholder="请输入文章标题" type="text"/>
            </div>
            <div class="mb-3">
                <label class="form-label">文章详情：</label>
                <validate-input rows="10" type="password" placeholder="请输入文章详情"
                                :rules="contentRules" v-model="contentVal"/>
            </div>
            <template #submit>
                <button class="btn btn-primary btn-large">发表文章</button>
            </template>
        </validate-form>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from 'vue';
    import { useRoute} from 'vue-router';
    import ValidateInput from '../components/ValidateInput.vue';
    import ValidateForm from '../components/ValidateForm.vue';
    import  {titleRules,contentRules} from '@/rules/rules'

    export default defineComponent({
        name: 'Login',
        components: {ValidateInput, ValidateForm},
        setup() {
            const uploadedData = ref();
            const titleVal = ref('');
            const route = useRoute();
            const isEditMode = !!route.query.id;
            const contentVal = ref('');

            return {
                titleRules, titleVal, contentVal, contentRules, uploadedData, isEditMode
            };
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
