//Babel
import '@babel/polyfill';
import 'intersection-observer';

//Libs
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueSweetalert2 from 'vue-sweetalert2';
import VueMask from 'v-mask'

//Components
import router from './router'
import store from './store'
import titleMixin from './mixins/titleMixin'
// import { testSave } from './helpers'
import Multiselect from 'vue-multiselect'

//Validations
// import "./helpers/validation-rules"

//Methods
import { mapGetters, mapActions } from 'vuex';

//Settings

Vue.config.silent = process.env.NODE_ENV !== 'development';
Vue.config.devtools = process.env.NODE_ENV === 'development';

//Registration

//Libs
Vue.use(BootstrapVue, {
    BButton: { variant: '' }
});
Vue.use(VueSweetalert2);
Vue.use(IconsPlugin);
Vue.use(VueMask);
Vue.use(Vuetify);
Vue.component('multiselect', Multiselect)

//Components
Vue.mixin(titleMixin);

//Views
import index from 'views-folder/index.vue'

new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    router,
    store,
    methods: {
        // testSave: testSave,
        // ...mapActions(['getUserFromLocalStorage'])
    },
    render: createElement => createElement(index),
    async created() {

        if (!this.getLoggedUser) {

            try {

                this.getUserFromLocalStorage();

            } catch (err) {

                this.$router.push('/home').catch(err => { });
            }
        }
    },
    mounted() {
        //this.testSave();

        //запрещаем навигацию когда пользователь разлогинился
        router.beforeEach((to, from, next) => {
            //console.log(to.path);
            // console.log(this.getLoggedUser);
            if (to.path !== '/home' && !this.getLoggedUser) next(false);
            else next();
        });

    },
    computed: {
        ...mapGetters(['getLoggedUser'])
    }
});
