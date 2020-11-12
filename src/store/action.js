//actions 는 비동기 처리
import * as api from "../api";
import {list} from "../api";

const actions = {
  ADD_BOARD(_, {title}) {
    return api.board.create(title).then(data => data.item)
  },
  //로그인
  LOGIN({commit}, {email, password}) {
    return api.auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken))
  },

  //리스트 가져오기
  FETCH_BOARD({commit}) {
    return api.board.fetch()
      .then(data => {
        commit('SET_BOARDS', data.list)
      })
  },
  //특정 게시글
  FIND_BOARD({commit}, id) {
    return api.board.find(id)
      .then(data => {
        commit('SET_BOARD', data.item)
      })
  },
  DELETE_BOARD(_, id) {
    return api.board.destroy(id)
  },
  UPDATE_BOARD({dispatch, state}, {id, title, bgColor}) {
    return api.board.update(id, {title, bgColor})
      .then(() => {
        dispatch('FIND_BOARD', state.board.id)
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
  },
  DELETE_CARD({dispatch, state}, {cardId}) {
    return api.card.destroy(cardId)
      .then(() => {
        dispatch('FIND_BOARD', state.board.id)
      })
  },

  ADD_LIST({dispatch, state}, {title, boardId, pos}) {
    return api.list.create({title, boardId, pos})
      .then(_ => dispatch('FIND_BOARD', state.board.id))
  },
  UPDATE_LIST({dispatch, state}, {listId, pos, title}) {
    return api.list.update(listId, {pos: pos, title: title})
      .then(_ => dispatch('FIND_BOARD', state.board.id))
  },
  DELETE_LIST({dispatch, state}, {listId}){
    return api.list.destroy(listId)
      .then(_=> dispatch('FIND_BOARD', state.board.id))
  }
}
export default actions
