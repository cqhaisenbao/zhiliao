<template>
    <div class="validate-input-container pb-3">
        <input v-if="tag !== 'textarea'" class="form-control" :class="{'is-invalid':inputRef.error}"
               :value="inputRef.val" @input="updateValue" @blur="validateInput" :="$attrs">
        <textarea v-else class="form-control" :class="{'is-invalid':inputRef.error}" :value="inputRef.val"
                  @blur="validateInput" @change="updateValue" :="$attrs"></textarea>
        <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, PropType, onMounted} from 'vue';
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
                val: props.modelValue || '',
                error: false,
                message: ''
            });
            const updateValue = (e: KeyboardEvent) => {
                const targetValue = (e.target as HTMLInputElement).value;
                inputRef.val = targetValue;
                context.emit('update:modelValue', targetValue);
            };
            const validateInput = () => {
                if (props.rules) {
                    const allPassed = props.rules.every(rule => {
                        let passed = true;
                        inputRef.message = rule.message;
                        switch (rule.type) {
                            case 'required':
                                passed = (inputRef.val.trim() !== '');
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
            return {inputRef, validateInput, updateValue};
        }
    });
</script>

<style lang="scss" scoped>

</style>
