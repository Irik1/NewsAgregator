import Vue from 'vue'
import Vuex from 'vuex'
import loggedUser from './modules/logged-user'

Vue.use(Vuex)

export default new Vuex.Store({

    modules: {
        loggedUser
    }
});