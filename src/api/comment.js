import { comment } from '@/api/index';
function fetchThreadComment(threadId, query) {
  return comment.get(`/thread/${threadId}?${query}`);
}

export { fetchThreadComment };
