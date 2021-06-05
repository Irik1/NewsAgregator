export default 
    [
        //HOME PATH
        {
            path: '',
            component: () => import('views-folder/home/index.vue')
        },
        {
            path: '/home',
            component: () => import('views-folder/home/index.vue')
        },
        {
            path: `/home/cabinet`,
            name: `cabinet`,
            component: () => import('views-folder/home/cabinet.vue')
        },
    ]