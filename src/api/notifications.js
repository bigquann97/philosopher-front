import { notifications } from '@/api/index';

export function getNotification(query) {
  return notifications.get(`?${query}`);
}

const token = localStorage.getItem('token');
notifications
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
