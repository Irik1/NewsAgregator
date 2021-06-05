<template>
    <div class="textarea-with-validation">

        <ValidationProvider :vid="vid" :name="$attrs.name"
                            :rules="rules" :bails="bails"
                            :custom-messages="customMessages"
                            v-slot="{ valid, errors, classes }">
            <b-form-group>
                <textarea ref="input"
                          v-bind="$attrs"
                          v-bind:value="restoreValueWithCurrentCursor"
                          v-on:input="handleInput"
                          :class="[$attrs.classForTextArea, classes]"
                          :state="errors[0] ? false : (valid ? true : null)"
                          v-mask="$attrs.mask"
                          @input="resize($event)"
                ></textarea>
                <b-form-invalid-feedback :state="errors[0] ? false : (valid ? true : null)" id="inputLiveFeedback">
                    <ul class="list-group">
                        <li class="list-group" v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </b-form-invalid-feedback>
            </b-form-group>
        </ValidationProvider>

    </div>
</template>

<script>
    import {ValidationProvider, configure} from 'vee-validate'

    configure({
        classes: {
            valid: 'success',
            invalid: 'error'
        },
        mode:'eager'
    });

    export default {
        name: "textarea-with-validation",
        data() {
            return {
                customMessages: this.customMessagesProp,
                selectionStart: null
            }
        },
        components: {ValidationProvider},
        props: {
            vid: {
                type: String
            },
            rules: {
                type: [Object, String],
                default: ""
            },
            bails: {
                type: [Boolean],
                default: true
            },
            // must be included in props
            value: {
                type: [Object, String],
                default () {
                    return {};
                }
            },
            customMessagesProp: {
                type: [Object, String],
                default() {
                    return {};
                }
            }
        },
       computed: {
           restoreValueWithCurrentCursor() { //когда нам вернули обновленное значение value из родительского, обновляем значение value текущего компонента

               //отложить выполенение этой операции до следующего обновления DOМ vue js-ом
               this.$nextTick(() => {
                   this.$refs.input && this.$refs.input.setSelectionRange(this.selectionStart, this.selectionStart);
               });

               return typeof(this.value) === "object" ? "" : this.value;
           }
       },
       mounted: () => {
           setTimeout(() => { // растягивание textarea в зависимости от кол текста внутри него
                    document.querySelectorAll('textarea').forEach(elem => {
                        if (elem.value != "")
                            elem.dispatchEvent(new Event('input', { bubbles: true }));
                    })
            }, 300);
       },
        methods: {
            resize(e) {
                e.target.style.height = 'auto'
                e.target.style.height = `${e.target.scrollHeight}px`
            },
            handleInput(e) {

                this.selectionStart = e.target.selectionStart; // запоминаем текущую позицию курсора инпута

                e.target.value = e.target.value.replace(/[ё]/g, 'е');
                e.target.value = e.target.value.replace(/[Ё]/g, 'Е');

                this.$emit('input', e.target.value); // сообщаем родительскому компоненту новое значение value инпута

            },
        },
    }
</script>

<style scoped>
    .error {
        border-color: #dc3545;
    }

    .success {
        border-color: #28a745;
    }
</style>
