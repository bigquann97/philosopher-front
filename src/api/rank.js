import { rank } from '@/api/index';

// 랭킹 조회
function getRank() {
  return rank.get();
}

export { getRank };
