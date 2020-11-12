import axios from 'axios'
import router from "../router";

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401

/**
 * 비인증시 로그인 화면으로 돌아감
 */
const onUnauthorized = () => {
  router.replace('/login')
}

/**
 * axios 요청을 wrap
 * @param method
 * @param url
 * @param data
 * @returns {Promise<* | void>}
 */
const request = ({method, url, data}) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  }).then(result => result.data)
    .catch(result => {
      const {status} = result.response
      if (status === UNAUTHORIZED) return onUnauthorized();
      throw Error(result)
    })
}

/**
 * board CRUD
 */
export const board = {
  fetch() {
    return request({method: 'get', url: '/boards'})
  },
  create(title) {
    return request({method: 'post', url: '/boards', data: {title}})
  },
  find(id) {
    return request({method: 'get', url: `/boards/${id}`})
  },
  destroy(id) {
    return request({method: 'delete', url: `/boards/${id}`})
  },
  update(id, payload) {
    return request({method: 'put', url: `/boards/${id}`, data: payload})
  }
}

/**
 * 로그인 요청
 * @type {{login(*, *): Promise<*|void>}}
 */
export const auth = {
  login(email, password) {
    return request({method: 'post', url: '/login', data: {email, password}})
  }
}

/**
 * 로그인 토큰을 헤더에 넣음
 * @param token
 */
export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

/**
 * Card CRUD
 * */
export const card = {
  create(title, listId, pos) {
    return request({method: 'post', url: '/cards', data: {title, listId, pos}})
  },
  find(id) {
    return request({method: 'get', url: `/cards/${id}`})
  },
  update(id, payload) {
    return request({method: 'put', url: `/cards/${id}`, data: payload})
  },
  destroy(id) {
    return request({method: 'delete', url: `/cards/${id}`})
  }
}

export const list = {
  create(payload) {
    return request({method: 'post', url: '/lists', data: payload})
  }
}
