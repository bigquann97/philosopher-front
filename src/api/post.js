import { post } from '@/api/index';
function fetchPostList(query) {
  return post.get(`?${query}`);
}

function fetchPost(postId) {
  return post.get(`/${postId}`);
}
function createPost(postData) {
  return post.post(``, postData);
}
function modifyPost(postId, postData) {
  return post.put(`/${postId}`, postData);
}
function deletePost(postId) {
  return post.delete(`/${postId}`);
}
export { fetchPostList, createPost, fetchPost, modifyPost, deletePost };
