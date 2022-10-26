import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.js";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
});

router.afterEach(() => {
    NProgress.done();
});


//登录拦截跳转
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if (to.path === '/login' || to.path == "/register") next();
    if (token) {
        next();
    } else {
        next({ path: '/login' });
    }

});

export default router;