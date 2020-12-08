<template>
    <div class="file-upload">
        <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
            <slot v-if="fileStatus==='loading'" name="loading">
                <button class="btn btn-primary" disabled>正在上传...</button>
            </slot>
            <slot v-else-if="fileStatus==='success'" name="uploaded" :uploadedData="uploadedData">
                <button class="btn btn-primary">上传成功</button>
            </slot>
            <slot v-else name="default">
                <button class="btn btn-primary">点击上传</button>
            </slot>
        </div>
        <input @change="handleFileChange" type="file" class="file-input d-none" ref="fileInput">
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, PropType, watch} from 'vue';
import axios from 'axios';

type CheckFunction = (file: File) => boolean;

export default defineComponent({
    name: 'Uploader',
    props: {
        action: {
            type: String, require: true
        },
        beforeUpload: {
            type: Function as PropType<CheckFunction>
        },
        uploaded: {
            type: Object
        }
    },
    inheritAttrs: false,
    setup(props, context) {
        const fileInput = ref<null | HTMLInputElement>(null);
        const fileStatus = ref<UploadStatus>(props.uploaded ? 'success' : 'ready');
        const uploadedData = ref(props.uploaded);
        // watch必须是一个响应式对象，如果是props就使用函数监控
        watch(() => props.uploaded, (newValue) => {
            if (newValue) {
                fileStatus.value = 'success';
                uploadedData.value = newValue;
            }
        });
        const triggerUpload = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };
        const handleFileChange = (e: Event) => {
            const currentTarget = e.target as HTMLInputElement;
            if (currentTarget.files) {
                const files = Array.from(currentTarget.files);
                if (props.beforeUpload) {
                    const result = props.beforeUpload(files[0]);
                    if (!result) {return;}
                }
                fileStatus.value = 'loading';
                const formData = new FormData();
                formData.append('files', files[0]);
                if (props.action) {
                    axios.post(props.action, formData, {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }).then(res => {
                        fileStatus.value = 'success';
                        uploadedData.value = res.data;
                        context.emit('file-uploaded', res.data);
                    }).catch((err) => {
                        fileStatus.value = 'error';
                        context.emit('file-uploaded-error', {err});
                    }).finally(() => {
                        if (fileInput.value) {
                            fileInput.value.value = '';
                        }
                    });
                }
            }
        };
        return {fileInput, triggerUpload, fileStatus, handleFileChange, uploadedData};
    }
});
</script>

<style lang="scss" scoped>

</style>
