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
        commit('SET_BOARD', data.item)
      })
  },
  //카드 추가
  ADD_CARD({dispatch, state}, {title, listId, pos}) {
    return api.card.create(title, listId, pos)
      .then(() => {
        dispatch('FIND_BOARD', state.board.id)
      })
  },
  FIND_CARD({commit}, {cardId}) {
    return api.card.find(cardId)
      .then(data => {
        commit('SET_CARD', data.item)
      })
  },
  UPDATE_CARD({dispatch, state}, {cardId, title, description, listId, pos}) {
    return api.card.update(cardId, {title, description, listId, pos})
      .then(() => {
        dispatch('FIND_BOARD', state.board.id)
      })
  }
}
export default actions
