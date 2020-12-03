<template>
    <div class="file-upload">
        <button class="btn btn-primary" @click.prevent="triggerUpload">
            <span v-if="fileStatus==='loading'">正在上传...</span>
            <span v-else-if="fileStatus==='success'">上传成功</span>
            <span v-else>点击上传</span>
        </button>
        <input @change="handleFileChange" type="file" class="file-input d-none" ref="fileInput">
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, PropType} from 'vue';
    import axios from 'axios';

    type CheckFunction = (file: File) => boolean;

    export default defineComponent({
        name: 'Uploader',
        props: {
            action: {
                type: String,
                require: true
            },
            beforeUpload: {
                type: Function as PropType<CheckFunction>
            }
        },
        // emits: ['file-uploaded', 'file-uploaded-error'],
        setup(props, context) {
            console.log({...props});
            console.log({...context.attrs});
            const fileInput = ref<null | HTMLInputElement>(null);
            const fileStatus = ref<UploadStatus>('ready');
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
                    axios.post(props.action!, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        fileStatus.value = 'success';
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
            };
            return {fileInput, triggerUpload, fileStatus, handleFileChange};
        }
    });
</script>

<style lang="scss" scoped>

</style>
