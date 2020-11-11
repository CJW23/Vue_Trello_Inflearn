//state 값을 SET 하는 용도
import * as api from "../api";

const mutations = {
  SET_IS_ADD_BOARD(state, toggle) {
    state.isAddBoard = toggle
  },
  SET_BOARDS(state, boards) {
    state.boards = boards
  },
  SET_BOARD(state, board) {
    state.board = board
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
  },
  SET_CARD(state, card) {
    state.card = card
  },
  SET_IS_SHOW_BOARD_SETTINGS (state, toggle) {
    state.isShowBoardSetting = toggle
  }
}

export default mutations
