import Vuex from 'vuex'
import Vue from "vue"
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false,
    boards: [],
    token: null
  },
  //getters 를 다른 컴포넌트에서 사용할 때 변수처럼 사용 가능 () 생략
  getters: {
    //기본적으로 state 인자 받음
    isAuth(state) {
      // !!는 undefined 도 false 로 리턴하게 한다 확실한 논리 결과 가지기 위함
      return !!state.token
    }
  },
  //state 값을 SET 하는 용도
  mutations: {
    SET_IS_ADD_BOARD(state, toggle) {
      state.isAddBoard = toggle
    },
    SET_BOARDS(state, boards) {
      state.boards = boards
    },
    LOGIN(state, token) {
      if (!token) {
        return false
      }
      state.token = token
      localStorage.setItem('token', token)
      api.setAuthInHeader(token)
    },
    LOGOUT(state) {
      state.token = null
      delete localStorage.token
      api.setAuthInHeader(null)
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
        .then(data => {
          commit('SET_BOARDS', data.list)
        })
    },
    //로그인
    LOGIN({commit}, {email, password}) {
      return api.auth.login(email, password)
        .then(({accessToken}) => commit('LOGIN', accessToken))
    }
  }
})

//?????
//바로 실행
const {token} = localStorage
store.commit('LOGIN', token)

export default store
