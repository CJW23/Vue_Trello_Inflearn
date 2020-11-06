import Vuex from 'vuex'
import Vue from "vue"
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false
  },
  mutations: {
    SET_IS_ADD_BOARD(state, toggle) {
      state.isAddBoard = toggle
    }
  },
  actions: {
    ADD_BOARD(_, {title}) {
      return api.board.create(title)
    },
    FETCH_BOARD(_) {
      return api.board.fetch()
    }
  }
})

export default store
