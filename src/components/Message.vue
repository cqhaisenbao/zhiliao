<template>
    <teleport to="#message">
        <div class="alert message-info fixed-top w-50 mx-auto d-flex align-items-center justify-content-between mt-2"
             :class="classObject" v-if="isVisible">
            <span>{{message}}</span>
            <button type="button" class="close" aria-label="Close" @click.prevent="hide">
                <span class="close" aria-hidden="true">&times;</span>
            </button>
        </div>
    </teleport>
</template>

<script lang="ts">
    import {defineComponent, PropType, ref} from 'vue';
    import useDOMCreate from '../hooks/useDOMCreate';

    export default defineComponent({
        props: {
            message: String,
            type: {
                type: String as PropType<MessageType>,
                default: 'default'
            }
        },
        setup(props, context) {
            useDOMCreate('message');
            const isVisible = ref(true);
            const classObject = {
                'alert-success': props.type === 'success',
                'alert-danger': props.type === 'error',
                'alert-primary': props.type === 'default'
            };
            const hide = () => {
                isVisible.value = false;
                //添加自定义事件
                context.emit('close-message', true);
            };
            return {classObject, isVisible, hide};
        }
    });

</script>

<style>
    .close {
        background: none;
        border: none;
        font-size: 25px;
    }
</style>
