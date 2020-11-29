<template>
    <form class="validata-form-container">
        <slot></slot>
        <div class="submit-area" @click.prevent="submitForm">
            <slot name="submit">
                <button type="submit" class="btn btn-primary">提交</button>
            </slot>
        </div>
    </form>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';

    export default defineComponent({
        name: 'ValidateForm',
        // emits: ['form-submit'],
        setup(props, context) {
            const submitForm = () => {
                context.emit('form-submit', false);
            };
            return {submitForm};
        }
    });
</script>

<style lang="scss" scoped>

</style>
