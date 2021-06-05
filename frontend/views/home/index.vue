<template>
    <layout name="defaultLayout">
        <div class="image-fon img-fluid">
            <div class="container body-content ">
                <div class="row no-gutters ">
                    <div class="col-md-4 forma-md">
                        <div class="row">
                            Пожалуйста, отобразись, что-то с чем-то ААААААААААААА
                            <div class="col">
                                <div class="login-form">
                                    <div class="main-div">
                                        <div class="panel">
                                            <h2>Авторизация</h2>
                                        </div>
                                        <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                                            <b-form @submit.prevent="handleSubmit(onSubmit)">
                                                <BInputWithValidation rules="required" name="userName" v-model="userName" placeholder="Введите логин" />

                                                <BInputWithValidation rules="required" name="password" vid="password" type="password" v-model="password" placeholder="Введите пароль" />

                                                <b-button type="submit" class="btn btn-autorization">ВХОД</b-button>
                                            </b-form>
                                        </ValidationObserver>
                                    </div>
                                </div>
                            </div>
                            <div class="w-100"></div>
                            <div class="col mt-3 mb-5">
                                <div class="card">
                                    <div class="card-body">
                                        <ul class="lists">
                                            <li class="mt-3"><a href="~assets-folder/home/docs/test.docx" role="button">Порядок
                                                    предоставления отчетности в электронном виде <i class="fa fa-download fa-lg" aria-hidden="true"></i></a></li>
                                            <li> <a href="~assets-folder/home/docs/test.docx" role="button">Порядок перехода на
                                                    электронную форму отчетности <i class="fa fa-download fa-lg" aria-hidden="true"></i></a></li>
                                            <li class="pt-4 pb-4">
                                                <router-link to="/home/contacts">Контакты</router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </layout>
</template>

<script>
    import layout from 'components-folder/layouts';
    import Vue from 'vue';
    import { ValidationObserver } from "vee-validate";
    import BInputWithValidation from "form-controls-folder/b-input-with-validation.vue";
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: `index`,
        title: 'Главное управление статистики Донецкой Народной Республики',
        components: {
            layout,
            ValidationObserver,
            BInputWithValidation
        },
        data: () => ({
            userName: "",
            password: ""
        }),
        watch: {
            subject(val) {
                console.log(val);
            }
        },
     methods: {
            route(RoleId) {

                switch(RoleId) {

                    case 1:
                    case 2:
                        this.$router.push('/administrator');
                    break;

                    case 3:
                        this.$router.push('/respodent-registrator').catch(err => {});
                    break;

                    case 4:
                        this.$router.push('/operator');
                    break;

                    case 5:
                        this.$router.push('/respondent').catch(err => {});
                    break;
                }

            },
            async authorization(userData) {

                return new Promise(async (resolve, reject) => {
                    
                    try {

                        let response = await this.getUserFromDb(userData);

                        if (!response.data) {

                            Vue.swal({
                                icon: 'info',
                                title: 'Не удается войти',
                                text: 'Пожалуйста, проверьте правильность написания логина и пароля',
                            });

                        } else if (response.data.statusCode) {

                            Vue.swal({
                                icon: 'info',
                                title: 'Доступ заблокирован',
                                text: response.data.message,
                            });

                        } else {

                            resolve(this.getLoggedUser.RoleId);

                        }

                    } catch (error) {

                        Vue.swal({
                            icon: 'error',
                            title: 'Ошибка авторизации',
                            text: error,
                        });
                    }
                });

            },
            async onSubmit() {
                
                const dataLogForm = {};
                dataLogForm.userName = this.userName;
                dataLogForm.userPassword = this.password;

                sessionStorage.clear(); //очищаем данные в сессии

               let roleId = await this.authorization(dataLogForm);

               this.route(roleId);

            },

            

            ...mapActions(['getUserFromDb']),
        },
        computed: {
            ...mapGetters(['getLoggedUser'])
        }
    }
</script>