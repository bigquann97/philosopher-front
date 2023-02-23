<template>
  <div class="contents">
    <h1>내 정보</h1>
    <div class="form-wrapper form-wrapper-sm">
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

<style scoped></style>
