import { thread } from '@/api/index';

function fetchThreadList(query) {
  return thread.get(`?${query}`);
}
function fetchThread(threadId) {
  return thread.get(`/${threadId}`);
}

function fetchArchivedThreadList(query) {
  return thread.get(`/archived?${query}`);
}

export { fetchThreadList, fetchThread, fetchArchivedThreadList };
