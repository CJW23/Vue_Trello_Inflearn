import Vuex from 'vuex'
import Vue from "vue"
import * as api from '../api'
import state from "./state";
import getters from "./getter";
import mutations from "./mutation";
import actions from "./action";
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

//?????
//바로 실행
const {token} = localStorage
store.commit('LOGIN', token)

export default store
