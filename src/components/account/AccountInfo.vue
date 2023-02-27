<template>
  <div class="user-info-contents">
    <h1>내 정보</h1>
    <div class="profile-image-container">
      <img
        :src="user.imageUrl"
        alt="사용자 프로필 이미지"
        class="userProfileImage"
      />
      <input
        type="file"
        ref="fileInput"
        style="display: none"
        @change="onImageSelected"
      />
      <button class="btn btn-primary" @click="openFileInput">
        프로필 사진 변경
      </button>
    </div>
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
import { myAccountInfo, profileImageUpdate } from '@/api/account';

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
    async updateProfileImage(formData) {
      try {
        const response = await profileImageUpdate(formData);
        console.log(response);
        await this.loadPage(); // 사용자 정보 다시 불러오기
      } catch (error) {
        console.error(error);
      }
    },
    openFileInput() {
      this.$refs.fileInput.click();
    },
    async onImageSelected(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await this.updateProfileImage(formData);
      console.log(res);
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

.profile-image-container {
  position: relative;
  margin-bottom: 1rem;
}

.userProfileImage {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}

.btn {
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.btn:hover + .userProfileImage {
  opacity: 0.7;
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
