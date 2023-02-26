import { post } from '@/api/index';
function fetchPostList(query) {
  return post.get(`?${query}`);
}
export { fetchPostList };
