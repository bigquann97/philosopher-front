import { account } from '@/api/index';

// 본인 정보 조회 API
function myAccountInfo() {
  return account.get();
}
// 프로필 사진 변경 API
function profileImageUpdate(formData) {
  return account.patch('/image', formData);
}
// 닉네임 변경 API
export function modifyAccountNickname(nickname) {
  const nicknameObj = { nickname: String(nickname) }; // String() 메소드를 사용하여 입력된 nickname 값을 문자열로 변환
  return account
    .patch('/nickname/modify', nicknameObj)
    .then(response => {
      return response.data.nickname.toString();
    })
    .catch(error => {
      console.error(error);
    });
}
// 비밀번호 변경 API
export function modifyAccountPassword(password) {
  const nicknameObj = { password: String(password) }; // String() 메소드를 사용하여 입력된 nickname 값을 문자열로 변환
  return account
    .patch('/password/modify', nicknameObj)
    .then(response => {
      return response.data.password.toString();
    })
    .catch(error => {
      console.error(error);
    });
}

// 본인이 작성한 게시물 조회
function getMyPosts(query) {
  return account.get('/posts' + `?${query}`);
}

export function getMyComments(query) {
  return account.get('/comments' + `?${query}`);
}

export function getRecommendedPosts(query) {
  return account.get('/recommend/post' + `?${query}`);
}

export function getRecommendedComments(query) {
  return account.get('/recommend/comment' + `?${query}`);
}

export function getRecommendedThreads(query) {
  return account.get('/recommend/thread' + `?${query}`);
}

export function getNotification(query) {
  return account.get('/recommend/thread' + `?${query}`);
}

const token = localStorage.getItem('token');

account
  .get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

export { myAccountInfo, profileImageUpdate, getMyPosts };
