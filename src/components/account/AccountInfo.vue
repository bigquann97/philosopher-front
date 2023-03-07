<template>
  <div class="user-info-page">
    <h3 class="user-info-heading">내 정보</h3>
    <div class="user-info-container">
      <div class="user-info-item">
        <span class="user-info-label">프로필 사진:</span>
        <div class="user-profile-container" @click="openFileInput">
          <img
            :src="user.imageUrl"
            alt="프로필 사진"
            class="user-profile-image"
          />
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="onImageSelected"
          />
          <span class="edit-profile-text">프로필 사진 변경하기</span>
        </div>
        <small>프로필 사진을 클릭하시면 변경하실 수 있습니다.</small>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">이메일:</span>
        <span class="user-info-value">{{ user.email }}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">닉네임:</span>
        <span class="user-info-value">{{ user.nickname }}</span>
        <router-link to="/updateNickname" class="update-info-button"
          >변경</router-link
        >
      </div>
      <div class="user-info-item">
        <span class="user-info-label">비밀번호:</span>
        <span class="user-info-value">*********</span>
        <router-link to="/updatePassword" class="update-info-button"
          >변경</router-link
        >
      </div>
      <div class="user-info-item">
        <span class="user-info-label">성별:</span>
        <span class="user-info-value">{{ user.gender }}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">나이:</span>
        <span class="user-info-value">{{ user.age }}</span>
      </div>
      <div class="user-info-item">
        <span class="user-info-label">내 상태:</span>
        <span class="user-info-value">{{ user.userStatus }}</span>
      </div>
      <div class="user-info-separator"></div>
      <div class="user-info-item">
        <span class="user-info-label">내가 작성한 컨텐츠:</span>
        <div class="user-info-buttons">
          <router-link to="/myPosts" class="content-type-button"
            >게시글</router-link
          >
          <router-link to="/myComments" class="content-type-button"
            >댓글</router-link
          >
        </div>
      </div>
      <div class="user-info-separator"></div>
      <div class="user-info-item">
        <span class="user-info-label">내가 추천한 컨텐츠:</span>
        <div class="user-info-buttons">
          <router-link to="/recommendedPosts" class="content-type-button"
            >게시글</router-link
          >
          <router-link to="/recommendedThreads" class="content-type-button"
            >쓰레드</router-link
          >
          <router-link to="/recommendedComments" class="content-type-button"
            >댓글</router-link
          >
        </div>
      </div>
      <div class="user-info-separator"></div>
      <div class="user-info-item">
        <router-link to="/myNotification" class="notification-link"
          >받은 알람</router-link
        >
      </div>
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
.user-info-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
}

.user-info-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
}

.user-info-item:last-child {
  margin-bottom: 0;
}
.user-info-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 1.5;
  color: #333;
}

.user-info-heading {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
}

.user-profile-container {
  position: relative;
  display: inline-block;
  margin-bottom: 30px;
  cursor: pointer;
}

.user-profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
}

.edit-profile-text {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.7);
  opacity: 0;
  transition: opacity 0.3s;
}

.user-profile-container:hover .edit-profile-text {
  opacity: 1;
}

.user-info-label {
  display: inline-block;
  font-weight: bold;
  width: 150px;
}

.user-info-value {
  display: inline-block;
  width: calc(100% - 150px);
  margin-left: 20px;
}

.update-info-button {
  display: inline-block;
  margin-left: 20px;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: #eee;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.update-info-button:hover {
  background-color: #ddd;
}

.user-info-buttons {
  display: inline-block;
  margin-left: 20px;
}

.content-type-button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-decoration: none;
  margin-right: 1rem;
}

.content-type-button:hover {
  background-color: #eee;
}

.content-type-button:hover {
  background-color: #ddd;
}

.notification-link {
  display: inline-block;
  margin-left: 170px;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: #eee;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s;
}

.notification-link:hover {
  background-color: #ddd;
}
</style>
