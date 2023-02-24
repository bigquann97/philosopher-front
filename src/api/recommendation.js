import { recommendation } from '@/api/index';

function createRecommendThread(threadId) {
  return recommendation.post(`/thread/${threadId}`);
}
function deleteRecommendThread(threadId) {
  return recommendation.delete(`/thread/${threadId}`);
}
function createRecommendComment(commentId) {
  return recommendation.post(`/comment/${commentId}`);
}
function deleteRecommendComment(commentId) {
  return recommendation.delete(`/comment/${commentId}`);
}

export {
  createRecommendThread,
  deleteRecommendThread,
  createRecommendComment,
  deleteRecommendComment,
};
