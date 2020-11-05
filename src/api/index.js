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
const request = (method, url, data) => {
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
 * @type {{fetch(): Promise<*|void>}}
 */
export const board = {
  fetch() {
    return request('get', '/boards')
  },
  create(data) {
    return request('post', '/boards', data)
  }
}

/**
 * 로그인 요청
 * @type {{login(*, *): Promise<*|void>}}
 */
export const auth = {
  login(email, password) {
    return request('post', '/login', {email, password})
  }
}

/**
 * 로그인 토큰을 헤더에 넣음
 * @param token
 */
export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}
