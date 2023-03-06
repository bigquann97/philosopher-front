import { archive } from '@/api/index';

function fetchArchiveList(query) {
  return archive.get(`?${query}`);
}
function fetchArchive(threadId) {
  return archive.get(`/${threadId}`);
}

export { fetchArchiveList, fetchArchive };
