<template>
  <div class="user-info-contents">
    <h1>내 정보</h1>
    <img
      :src="user.imageUrl"
      alt="사용자 프로필 이미지"
      class="userProfileImage"
    />
    <div class="user-info-form">
      <ul>
        <h5 class="user-info-title">이메일:</h5>
        <li class="list-group-item">{{ user.email }}</li>
        <h5 class="user-info-title">닉네임:</h5>
        <li class="list-group-item">{{ user.nickname }}</li>
        <h5 class="user-info-title">성별:</h5>
        <li class="list-group-item">{{ user.gender }}</li>
        <h5 class="user-info-title">나이:</h5>
        <li class="list-group-item">{{ user.age }}</li>
        <h5 class="user-info-title">내 상태:</h5>
        <li class="list-group-item">{{ user.userStatus }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { myAccountInfo } from '@/api/account';

export default {
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.loadPage();
  },
  methods: {
    async loadPage() {
      const res = await myAccountInfo();
      console.log(res);
      this.user = res.data;
    },
  },
};
</script>

<style scoped>
.user-info-contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.userProfileImage {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.user-info-form {
  width: 50%;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 0.5rem;
}

.user-info-title {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.list-group-item {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-bottom: 1px solid #ddd;
  word-break: break-all;
}
</style>
