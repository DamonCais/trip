import Vue from 'vue';
import Router from 'vue-router';

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

import { getToken, getRight } from '@/utils/auth'
import { doPost, doGet } from '@/api/api'

import store from '../store'



Vue.use(Router);

const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () =>
            import ('../view/home'),
        meta: { title: 'home', keepAlive: true },
    },
    {
        path: '/calender',
        name: 'calender',
        component: () =>
            import ('../view/calender'),
        meta: { title: 'calender', keepAlive: true },
    },
    {
        path: '/yachts',
        name: 'yachts',
        component: () =>
            import ('../view/yachts'),
        meta: { title: 'yachts', noHeader: true, },
    },
    {
        path: '/guides',
        name: 'store',
        component: () =>
            import ('../view/guides'),
        meta: { title: 'store', noHeader: true, },
    },
    {
        path: '/yachts/:id',
        name: 'yachts',
        component: () =>
            import ('../view/yachts/yacht'),
        meta: { title: 'yachts', noHeader: true, noFooter: true, },
    },
    {
        path: '/guides/:id',
        name: 'store',
        component: () =>
            import ('../view/guides/guide'),
        meta: { title: 'store', noHeader: true, noFooter: true, },
    },

    {
        path: '/orders',
        name: 'order',
        component: () =>
            import ('../view/orders'),
        children: [{
                path: 'order-list',
                component: () =>
                    import ('../view/orders/order-list/index'),
                meta: { title: 'orders', noHeader: true, noFooter: true, },

            }, {
                path: 'order-entity',
                component: () =>
                    import ('../view/orders/order-entity/index'),
                meta: { title: 'orders', noHeader: true, noFooter: true, },

            }, {
                path: ':id/pay',
                component: () =>
                    import ('../view/orders/payment/index'),
                meta: { title: 'orders', noHeader: true, noFooter: true, },

            },
            {
                path: ':id',
                component: () =>
                    import ('../view/orders/order-detail/index'),
                meta: { title: 'orders', noHeader: true, noFooter: true, },

            }
        ],
        meta: { title: 'order', noHeader: true, noFooter: true, },
    },
    {
        path: '/me',
        name: 'me',
        component: () =>
            import ('../view/user'),
        meta: { title: 'user', noHeader: true, },
    },
    {
        path: '/me/addresses',
        name: 'userAddress',
        component: () =>
            import ('../view/user/address'),
        meta: { title: 'userAddress', noHeader: true, noFooter: true, },
    },
    {
        path: '/me/coupons',
        name: 'coupons',
        component: () =>
            import ('../view/user/coupons'),
        meta: { title: 'coupons', noHeader: true, noFooter: true, },
    },
    {
        path: '/me/addresses/:id',
        name: 'userAddressEdit',
        component: () =>
            import ('../view/user/addressEdit'),
        meta: { title: 'userAddressEdit', noHeader: true, noFooter: true, },
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../view/login'),
        children: [{
            path: '/',
            component: () =>
                import ('../view/login/login'),
            meta: { title: 'login', noHeader: true, noFooter: true, },

        }, {
            path: 'registerGetCode',
            component: () =>
                import ('../view/login/registerGetCode'),
            meta: { title: 'registerGetCode', noHeader: true, noFooter: true, },

        }, {
            path: 'registerSubmit',
            component: () =>
                import ('../view/login/registerSubmit'),
            meta: { title: 'registerSubmit', noHeader: true, noFooter: true, },

        }],
        meta: { title: 'login', noHeader: true, noFooter: true, },
    },
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    next();
});


router.afterEach(() => {
    // NProgress.done();
})

// =======scroll test ======

export {
    router
};