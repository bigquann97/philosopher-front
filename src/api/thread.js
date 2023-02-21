import { thread } from '@/api/index';
function fetchThreadList(query) {
  return thread.get(`?${query}`);
}
function fetchThread(threadId) {
  return thread.get(`/${threadId}`);
}

export { fetchThreadList, fetchThread };
