<template>
    <ValidationProvider
            :vid="vid"
            :name="$attrs.name"
            :rules="rules"
            :bails="bails"
            :custom-messages="customMessages"
            :mode="$attrs.mode ? $attrs.mode : 'eager'"
            v-slot="{ valid, errors, classes }"
    >
        <b-form-group>
            <input ref="input"
                   @keydown.enter="focusNext($event)"
                   v-bind="$attrs"
                   v-bind:value="restoreValueWithCurrentCursor"
                   v-on:input="handleInput"
                   v-on:blur="blur"
                   :class="[$attrs.classForInput, classes]"
                   :state="errors[0] ? false : valid ? true : null"
                   v-mask="$attrs.mask"/>

            <b-form-invalid-feedback :state="errors[0] ? false : valid ? true : null" id="inputLiveFeedback">
                <ul class="list-group">
                    <li class="list-group" v-for="error in errors" :key="error">
                        {{ error }}
                    </li>
                </ul>
            </b-form-invalid-feedback>

            <div v-if="warningMessages" :class="{ warning: warningMessages }" style="margin-top:4px">
                <p>{{warningMessages}}</p>
            </div>

        </b-form-group>
    </ValidationProvider>
</template>

<style scoped>
    .error {
        border-color: #dc3545;
    }

    .success {
        border-color: #28a745;
    }

    .warning {
        color: #ffc107;
    }

</style>

<script>
    import {ValidationProvider, configure} from "vee-validate";
    import _ from 'lodash';

    configure({
        classes: {
            valid: "success",
            invalid: "error"
        }
    });

    export default {
        components: {
            ValidationProvider,
        },
        props: {
            vid: {
                type: String,
            },
            rules: {
                type: [Object, String],
                default: "",
            },
            bails: {
                type: [Boolean],
                default: true,
            },
            // must be included in props
            value: {
                type: [Object, String, Number],
                default() {
                    return {};
                }
            },
            customMessagesProp: {
                type: [Object, String],
                default() {
                    return {};
                },
            },
            warningMessages: {
                type: [Object, String, Boolean],
                default() {
                    return null;
                },
            },
        },
        methods: {
            focusNext(e) {
                // console.log('Enter down...', e.keyCode, '; ', e.key)
                const inputs = Array.from(document.querySelectorAll(['input[type="text"].inputstyle']));
                const index = inputs.indexOf(e.target);
                if (inputs[index + 1]) {
                    inputs[index + 1].focus();
                }

                /*const inputs = Array.from(e.target.form.querySelectorAll('input[type="text"]'));
                const index = inputs.indexOf(e.target);
                if (index < inputs.length) {
                    inputs[index + 1].focus();
                }*/
            },

            handleInput(e) {

                if (e.isTrusted) {
                    this.valueBeforeMask = e.target.value;

                    if (this.$attrs['auto-complete']) {
                        e.target.value = e.target.value.replace(/[,]/g, '.');
                    }

                    this.selectionStart = e.target.selectionStart; // запоминаем текущую позицию курсора инпута

                } else {

                    if (this.valueBeforeMask && (this.$attrs.mask || this.$attrs['v-mask'])) {

                        let mask = this.$attrs.mask || this.$attrs['v-mask'];

                        while (mask[this.selectionStart - 1] !== '#' && this.selectionStart <= e.target.value.length) {
                            this.selectionStart++;
                        }
                    }
                }

                e.target.value = e.target.value.replace(/[ё]/g, 'е');
                e.target.value = e.target.value.replace(/[Ё]/g, 'Е');

                this.$emit('input', e.target.value.trim() === "" ? null : e.target.value); // сообщаем родительскому компоненту новое значение value инпута

            },
            blur(e) {

                if (!this.value || !this.$attrs['auto-complete']) {
                    return;
                }

                const indexPoint = this.value.indexOf('.');

                if (this.value.length === indexPoint + 1) {
                    e.target.value += "0";
                    this.$emit('input', e.target.value.trim() === "" ? null : e.target.value); // сообщаем родительскому компоненту новое значение value инпута
                }

              if(indexPoint < 0) {
                e.target.value += ".0";
                this.$emit('input', e.target.value.trim() === "" ? null : e.target.value); // сообщаем родительскому компоненту новое зн
              }
            }
        },
        data() {
            return {
                customMessages: this.customMessagesProp,
                selectionStart: null,
                valueBeforeMask: null
            };
        },
        computed: {
            restoreValueWithCurrentCursor() { //когда нам вернули обновленное значение value из родительского, обновляем значение value текущего компонента

                //отложить выполенение этой операции до следующего обновления DOМ vue js-ом
                this.$nextTick(() => {
                    this.$refs.input && this.$refs.input.setSelectionRange(this.selectionStart, this.selectionStart);
                });

                return typeof (this.value) === "object" ? "" : this.value;
            }
        },
        /*   watch: {
            rules: function (newVal, oldVal) { // watch it
              console.log('Prop changed: ', newVal, ' | was: ', oldVal);
            },
          }, */
        mounted() {
            if (this.$attrs.mode === 'lazy') {
                const watcherForRules = _.find(this.$children[0]._watchers, 'deep');
                watcherForRules.active = false;
            }

        }
    };
</script>
