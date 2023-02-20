// 로그인, 회원 가입, (ex) 회원 탈퇴
import { instance } from './index';

// 회원가입 API
function registerUser(userData) {
  return instance.post('/auth/sign-up', userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post('/auth/sign-in', userData);
}

export { registerUser, loginUser };
