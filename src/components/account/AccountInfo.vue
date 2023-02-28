<template>
  <div class="user-info-contents">
    <h1>내 정보</h1>
    <div class="profile-image-container" @click="openFileInput">
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
    </div>
    <div class="user-info-form">
      <ul>
        <h5 class="user-info-title">이메일:</h5>
        <li class="list-group-item">{{ user.email }}</li>
        <h5 class="user-info-title">닉네임:</h5>
        <li class="list-group-item">
          {{ user.nickname
          }}<router-link to="/updateNickname" class="list-update-item"
            >닉네임 변경하기</router-link
          >
        </li>
        <li class="list-group-item">
          <router-link to="/updatePassword" class="list-update-item"
            >비밀번호 변경하기</router-link
          >
        </li>
        <h5 class="user-info-title">성별:</h5>
        <li class="list-group-item">{{ user.gender }}</li>
        <h5 class="user-info-title">나이:</h5>
        <li class="list-group-item">{{ user.age }}</li>
        <h5 class="user-info-title">내 상태:</h5>
        <li class="list-group-item">{{ user.userStatus }}</li>
        <router-link to="/myPosts" class="list-group-item"
          >내가 작성한 게시물 보기</router-link
        >
        <router-link to="/myComments" class="list-group-item"
          >내가 쓴 댓글 보기</router-link
        >
        <router-link to="/myRecommendedContent" class="list-group-item"
          >추천한 컨텐츠</router-link
        >
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

.userProfileImage {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
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

.user-info-form li {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.list-group-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
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
.list-update-item {
  font-size: 15px;
}

.profile-image-container {
  margin-bottom: 10px;
  cursor: pointer;
}

.userProfileImage:hover {
  opacity: 0.7;
  transition: all 0.3s ease-in-out;
}
</style>
