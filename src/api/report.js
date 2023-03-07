import { report } from '@/api/index';
function reportPost(postId, reportData) {
  return report.post(`/post?id=${postId}`, reportData);
}

function reportThread(threadId, reportData) {
  return report.post(`/thread?id=${threadId}`, reportData);
}
function reportComment(commentId, reportData) {
  return report.post(`/comment?id=${commentId}`, reportData);
}
export { reportPost, reportThread, reportComment };
