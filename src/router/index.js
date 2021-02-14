import Vue from 'vue';
import Router from 'vue-router';

const Cart = () =>
    import ('views/cart/Cart.vue')
const Home = () =>
    import ('views/home/Home.vue')
const Category = () =>
    import ('views/category/Category.vue')
const Profile = () =>
    import ('views/profile/Profile.vue')
const Detail = () =>
    import ('views/detail/Detail.vue')

Vue.use(Router)
const routes = [{
        path: '/',
        // name: 'HelloWorld',
        // component: HelloWorld
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/category',
        name: 'Category',
        component: Category
    },
    {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
    }
]
const router = new Router({
    routes,
    mode: 'history'
})
export default router