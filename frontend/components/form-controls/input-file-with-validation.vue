<template>
    <ValidationProvider 
    ref="provider" 
    :vid="vid" 
    :name="$attrs.name" 
    :rules="rules" 
    v-slot="{ valid, errors }"
    :custom-messages="customMessages"
    >
        <input v-bind="$attrs" type="file" ref="inputFile" @change="handleFileChange" :style="$attrs.styleForInput" />
        <div id="error">{{ errors[0] }}</div>
        <div>{{ valid ? nameFile : "" }}</div>
    </ValidationProvider>
</template>

<style scoped>
#error {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 80%;
    color: #dc3545;
}
</style>

<script>
import { ValidationProvider } from "vee-validate";
// import {ASN1 } from "helpers-folder";
// import { Base64 } from "helpers-folder";
// import { dom } from "helpers-folder";
// import { Hex } from "helpers-folder";
import { isDate } from 'moment';
import axios from "axios";


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
        checkFIO: {
            type: null
        }
    },
    data() {
        return {
            // test55: ['Noooooo', 'yeeees'],
            maxLength: 10240,
            reHex: /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/,
            dump: document.createElement('div'),
            files: null,
            nameFile: null,
            customMessages: {
                required: 'Прикрепите пожалуйста файл'
            }
        }
    },
    methods: {
        id(elem) {
            return document.getElementById(elem);
        },
        decode(der, offset) {

            // var tree = document.qrea

            offset = offset || 0;
            // tree.innerHTML = '';
            this.dump.innerHTML = '';
            try {
                var asn1 = ASN1.decode(der, offset);
                let tree =  document.createElement('div').appendChild(asn1.toDOM());

                let findFIO = tree.querySelectorAll('div.value > b')
                let certFIO = findFIO[43].textContent.split(' ').join('')
                let findDate = tree.querySelectorAll('span.preview')

                let messStart = findDate[37].textContent.split(' ')[1].split('-')
                let messFinish = findDate[38].textContent.split(' ')[1].split('-')

                let toYear = (new Date).getFullYear()
                let toMonth = ((new Date).getMonth() + 1)
                let toDay = (new Date).getDate()

                let isDateChack = false

                if(toYear > messStart[0] && toYear < messFinish[0]) {
                    isDateChack = true
                } else if (toYear == messStart[0] && toMonth > messStart[1]) {
                    isDateChack = true
                } else if (toYear == messStart[0] && toMonth == messStart[1] && toDay >= messStart[2]) {
                    isDateChack = true
                } else if (toYear == messFinish[0] && toMonth < messFinish[1]) {
                    isDateChack = true
                } else if (toYear == messFinish[0] && toMonth == messFinish[1] && toDay <= messStart[2]) {
                    isDateChack = true
                }

                if(certFIO === this.checkFIO && isDateChack) {
                    this.nameFile = 'Сертификат проверен'
                } else if(!isDateChack) {
                    this.nameFile = 'Введен недействительный сертифика'
                } else {
                    this.nameFile = 'Несовпадение данных респондента в личном кабинете и сертификате'
                }

                const spanOid = tree.querySelectorAll('span.oid')

                let messBack = []
                messBack.push('data1 = ' + findDate[37].textContent)
                messBack.push('data2 = ' + findDate[38].textContent)

                messBack.push('key1 = ' + findFIO[6].textContent)
                // 10

                
                messBack.push('dopoln1 = ' + spanOid[0].textContent + ' ' + spanOid[1].textContent)
                
                messBack.push('dopoln2 = ' + findFIO[10].textContent + ' ' + spanOid[2].textContent + ' ' + spanOid[3].textContent)

                messBack.push('dopoln3 = ' + findFIO[14].textContent + ' ' + spanOid[4].textContent + ' ' + spanOid[5].textContent)

                messBack.push('String = ' + findFIO[15].textContent)
                
                messBack.push('binCode = ' + findFIO[58].textContent)


                this.$emit('fidBack', messBack)



                isDateChack = false

            } catch (e) {
                console.log(e);
            }
        },
        decodeText(val) {
            try {
                var der = this.reHex.test(val) ? Hex.decode(val) : Base64.unarmor(val);
                this.decode(der);
            } catch (e) {
                console.log(e);
            }
        },
        decodeBinaryString(str) {
            var der;
            try {
                if (this.reHex.test(str))
                    der = Hex.decode(str);
                else if (Base64.re.test(str))
                    der = Base64.unarmor(str);
                else
                    der = str;
                this.decode(der);
            } catch (e) {
                console.log(e);
            }
        },
        read(f) {
            //const sel =
            var r = new FileReader();
            r.onloadend =  () => {
                if (r.error)
                    alert("Your browser couldn't read the specified file (error code " + r.error.code + ").");
                else
                    this.decodeBinaryString(r.result);
            };
            r.readAsBinaryString(f);
        },
        load() {
            if (this.files.length === 0)
                alert("Select a file to load first.");
            else
                this.read(this.files[0]);
        },
        stop(e) {
            e.stopPropagation();
            e.preventDefault();
        },
        dragAccept(e) {
            this.stop(e);
            if (e.dataTransfer.files.length > 0)
                this.read(e.dataTransfer.files[0]);
        },

        async handleFileChange(e) {
            
            this.files = this.$refs.inputFile.files;

            if(this.checkFIO === 'fileAdmin') {

              this.$emit('myfullfile', this.files[0])

            }
            // console.log('await this.$refs.provider.validate(e) = ' + await this.$refs.provider.validate(e))
            
            const { valid } = await this.$refs.provider.validate(e);

            // console.log('valid = ' + valid)
            // const { error } = ['errors']
            // const { valid } = await false

            // valid = false
            // this.errors[0] = 'Nooooo';
            // const test206 =
            // this.load();
            
             if (valid && this.$refs.inputFile.files[0].name) {
                 this.nameFile = this.$refs.inputFile.files[0].name;
                 //this.load();
             }
        },
    },
    created() {
    }
};
</script>
