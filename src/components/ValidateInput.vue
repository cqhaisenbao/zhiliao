<template>
    <div class="validate-input-container pb-3">
        <input v-if="tag !== 'textarea'" class="form-control" :class="{'is-invalid':inputRef.error}"
               v-model="inputRef.val" @blur="validateInput" :="$attrs">
        <textarea v-else class="form-control" :class="{'is-invalid':inputRef.error}"
                  @blur="validateInput" v-model="inputRef.val" :="$attrs"></textarea>
        <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
    </div>
</template>

<script lang="ts">
import {defineComponent, reactive, PropType, onMounted, watch} from 'vue';
import {emitter} from './ValidateForm.vue';
import {emailReg} from '../rules/rules';

export default defineComponent({
    name: 'ValidateInput',
    props: {
        rules: Array as PropType<RulesProp>,
        modelValue: String,
        tag: {
            type: String as PropType<TagType>,
            default: 'input'
        }
    },
    inheritAttrs: false,
    setup(props, context) {
        const inputRef = reactive({
            // val: computed({
            //     get: () => props.modelValue || '',
            //     set: val => {context.emit('update:modelValue', val);}
            // }),
            val: props.modelValue || '',
            error: false,
            message: ''
        });
        watch(() => props.modelValue, (newValue) => {
            inputRef.val = newValue || '';
        });

        const validateInput = () => {
            if (props.rules) {
                const allPassed = props.rules.every(rule => {
                    let passed = true;
                    inputRef.message = rule.message;
                    switch (rule.type) {
                        case 'required':
                            passed = (inputRef.val.trim() !== '');
                            break;
                        case 'length':
                            passed = (inputRef.val.length >= 6);
                            break;
                        case 'email':
                            passed = emailReg.test(inputRef.val);
                            break;
                        case 'custom':
                            passed = rule.validator ? rule.validator() : true;
                            break;
                        default:
                            break;
                    }
                    return passed;
                });
                inputRef.error = !allPassed;
                return allPassed;
            }
            return true;
        };

        onMounted(() => {
            emitter.emit('form-item-created', validateInput);
        });
        return {inputRef, validateInput};
    }
});
</script>

<style lang="scss" scoped>

</style>
