<template>
  <div class="contents">
    <h1>내 정보</h1>
    <img
      :src="user.imageUrl"
      alt="사용자 프로필 이미지"
      class="userProfileImage"
    />
    <div class="user-info-form">
      <ul>
        <h5>이메일:</h5>
        <li class="list-group-item">{{ user.email }}</li>
        <h5>닉네임:</h5>
        <li class="list-group-item">{{ user.nickname }}</li>
        <h5>성별:</h5>
        <li class="list-group-item">{{ user.gender }}</li>
        <h5>나이:</h5>
        <li class="list-group-item">{{ user.age }}</li>
        <h5>내 상태:</h5>
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
ul {
  list-style: none;
  padding-left: 0;
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

h5 {
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
  width: 120px;
  text-align: left;
}
</style>
