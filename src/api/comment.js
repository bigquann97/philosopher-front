import { comment } from '@/api/index';
function fetchThreadComment(threadId, query) {
  return comment.get(`/thread/${threadId}?${query}`);
}
function createComment(threadId, commentData) {
  return comment.post(`/thread/${threadId}`, commentData);
}
function modifyComment(commentId, commentData) {
  return comment.put(`${commentId}`, commentData);
}
function deleteComment(commentId) {
  return comment.delete(`/${commentId}`);
}

export { fetchThreadComment, createComment, deleteComment, modifyComment };
