<template>
    <div class="defaultLayout">
        <!-- <a href="#" class="scrollup">Наверх</a> -->
        <div class="wrapper">
            <header style="background-color: #32BAEC;">
            </header>
            <nav class="sticky-top main_menu">
            <div class="table-responsive-sm">
              <table class="table">
              <tbody>
                <tr>
                  <th rowspan="2"><img class="img-fluid" src="../../assets/shared/images/logo.jpg" /></th>
                  <td colspan="4">Краткая информация о пользователе</td>
                  <td><router-link to="/home">Вход/Регистрация/Выход</router-link></td>
                </tr>
                <tr>
                  <td><router-link to="/respondent">Игры</router-link></td>
                  <td><router-link to="/respondent/respondent-personal-data-edit">Образование</router-link></td>
                  <td><router-link to="/respondent/forms">Политика</router-link></td>
                  <td><router-link to="/respondent/history">Настольные игры</router-link></td>
                  <td><router-link to="/respondent/respondent-profile">Спорт</router-link></td>
                </tr>
              </tbody>
              </table>
            </div>    
            </nav>

            <div class="content-wrapper">
                <div class="container">
                    <div class="row no-gutters">
                        <div class="col-md-12">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "defaultLayout"
    }
</script>

<style>
    @import 'assets-folder/home/styles/index.css';
    @import 'bootstrap/dist/css/bootstrap.css';
    @import 'bootstrap/dist/css/bootstrap-reboot.min.css';
    @import 'bootstrap-vue/dist/bootstrap-vue.css';
    @import 'assets-folder/shared/styles/font-awesome.min.css';
    @import 'assets-folder/shared/styles/main.css';
    @import 'assets-folder/shared/styles/sweetalert2.min.css';
</style>