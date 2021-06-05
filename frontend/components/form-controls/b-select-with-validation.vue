<template>
  <ValidationProvider
    ref="validator"
    :vid="vid"
    :name="$attrs.name"
    :rules="rules"
    v-slot="{ valid, errors }"
    :custom-messages="customMessages"
  >
    <b-form-group id="bFormGroupForSelectWithValidation" v-bind="$attrs">
      <b-form-select
        id="bFormSelectWithValidation"
        v-bind="$attrs"
        :state="errors[0] ? false : (valid ? true : null)"
        v-model="selected"
      >
        <slot/>
      </b-form-select>
      <b-form-invalid-feedback id="inputLiveFeedback">{{ errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </ValidationProvider>
</template>


<script>
import { ValidationProvider } from "vee-validate";

export default {
    components: {
        ValidationProvider
    },
    props: {
        vid: {
            type: String
        },
        rules: {
            type: [Object, String],
            default: ""
        },
        // must be included in props
        value: {
            type: null
        },
        customMessagesProp: {
            type: [Object, String],
            default () {
                return {};
            }
        }
    },
    data() {

      return {
        selected: null,
        customMessages: this.customMessagesProp
      }
       
    },
    created() {
    }
};
</script>
