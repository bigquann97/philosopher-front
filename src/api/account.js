import { account } from '@/api/index';

// 본인 정보 조회 API
function myAccountInfo() {
  return account.get();
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

export { myAccountInfo };
