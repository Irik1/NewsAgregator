import Vue from 'vue';
import VueRouter from 'vue-router'

//routes
import * as routes from './routes'

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        //MAIN PATH
        {
            path: '*',
            component: () => import('views-folder/home/index.vue')
        },

        //HOME PATH
        ...routes.home,

        //  //RESPONDENT-REGISTRATOR PATH
        // ...routes.respodentRegistrator,

        // //ADMINISTRATOR PATH
        // ...routes.administrator,

        // //RESPONDENT PATH
        // ...routes.respodent,

        // //OPERATOR PATH
        // ...routes.operator,
    ],
    mode: 'history'
});