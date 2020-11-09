//getters 를 다른 컴포넌트에서 사용할 때 변수처럼 사용 가능 () 생략
const getters =  {
  //기본적으로 state 인자 받음
  isAuth(state) {
    // !!는 undefined 도 false 로 리턴하게 한다 확실한 논리 결과 가지기 위함
    return !!state.token
  }
}
export default getters
