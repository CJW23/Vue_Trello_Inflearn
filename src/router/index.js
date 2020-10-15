import VueRouter from "vue-router";
import Vue from 'vue'
import Home from '../components/Home'
import Login from '../components/Login'
import NotFount from "../components/NotFount";
import Board from "../components/Board";
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/b/:bid', component: Board},
    {path: '*', component: NotFount}
  ]
})
export default router
