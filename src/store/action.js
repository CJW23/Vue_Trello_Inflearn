//actions 는 비동기 처리
import * as api from "../api";

const actions = {
  ADD_BOARD(_, {title}) {
    return api.board.create(title).then(data => data.item)
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
  },
  //특정 게시글
  FIND_BOARD({commit}, id) {
    return api.board.find(id)
      .then(data => {
        commit('SET_BOARD', data)
      })
  }
}
export default actions
