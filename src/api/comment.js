import { comment } from '@/api/index';
function fetchThreadComment(threadId, query) {
  return comment.get(`/thread/${threadId}?${query}`);
}
function createComment(threadId, commentData) {
  return comment.post(`/thread/${threadId}`, commentData);
}

export { fetchThreadComment, createComment };
