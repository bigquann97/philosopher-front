import { recommendation } from '@/api/index';

function createRecommendThread(threadId) {
  return recommendation.post(`/thread/${threadId}`);
}
function deleteRecommendThread(threadId) {
  return recommendation.delete(`/thread/${threadId}`);
}

export { createRecommendThread, deleteRecommendThread };
