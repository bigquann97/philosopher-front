import { admin } from './index';

// 회원 리스트 API
function listAccount() {
  return admin.get('/accounts');
}
function reportPosts() {
  return admin.get('/reports/posts');
}
function reportThreads() {
  return admin.get('/reports/threads');
}
function reportComment() {
  return admin.get('/reports/comments');
}
function fetchThreadList() {
  return admin.get('/thread');
}
export {
  listAccount,
  reportPosts,
  reportThreads,
  reportComment,
  fetchThreadList,
};
