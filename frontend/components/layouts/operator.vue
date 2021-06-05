<template>
    <div class="operatorLayout">
        <a href="#" class="scrollup">Наверх</a>
        <div class="wrapper">
            <header style="background-color: #32BAEC;">
            <img class="img-fluid" src="../../assets/shared/images/header.jpg" />
            </header>
            <nav class="sticky-top main_menu">
                <router-link to="/operator">Формы отчетности </router-link>
                <router-link to="/operator/operator-profile">Профиль</router-link>
                <router-link @click.native="logOutUser()" to="/home">Выйти</router-link>
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
// import {helpers} from "../../helpers";
import {mapActions} from "vuex";

export default {
  name: "operatorLayout",
  methods: {
    // logOutUser: helpers.logOutUser,
    ...mapActions(['resetLoggedUser'])
  }
}
</script>

<style>
    @import 'assets-folder/respodent-registrator/styles/respodent.css';
</style>