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
export { fetchPostList, createPost, fetchPost };
