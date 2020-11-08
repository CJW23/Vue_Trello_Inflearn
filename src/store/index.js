import Vuex from 'vuex'
import Vue from "vue"
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false,
    boards: []
  },
  //state 값을 SET하는 용도
  mutations: {
    SET_IS_ADD_BOARD(state, toggle) {
      state.isAddBoard = toggle
    },
    SET_BOARDS(state, boards){
      state.boards = boards
    }
  },
  //actions 는 비동기 처리
  actions: {
    ADD_BOARD(_, {title}) {
      return api.board.create(title)
    },
    //리스트 가져오기
    FETCH_BOARD({commit}) {
      return api.board.fetch()
        .then(data =>{
        commit('SET_BOARDS', data.list)
      })
    }
  }
})

export default store
