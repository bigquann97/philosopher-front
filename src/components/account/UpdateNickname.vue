<template>
  <div class="user-info-page">
    <h3 class="user-info-heading">닉네임 변경</h3>
    <div class="nickname-container">
      <label for="nickname-input" class="nickname-label">닉네임: </label>
      <div class="input-container">
        <input
          type="text"
          id="nickname-input"
          v-model="newNickname"
          class="nickname-input"
        />
        <button @click="changeNickname" class="updateBtn">변경</button>
      </div>
    </div>
    <div class="nickname-update-message">
      <div v-if="nicknameChanged" class="success-message">
        닉네임이 변경되었습니다.
      </div>
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { modifyAccountNickname } from '@/api/account';
export default {
  data() {
    return {
      newNickname: '',
      nicknameChanged: false,
      errorMessage: '',
    };
  },
  methods: {
    async changeNickname() {
      try {
        // 닉네임이 공백인지 검증
        if (!this.newNickname) {
          throw new Error('닉네임을 입력해주세요.');
        }
        let nickname = this.newNickname.toString();
        await modifyAccountNickname(nickname);
        this.nicknameChanged = true;
        alert('닉네임이 변경되었습니다.');
        await this.$router.push({ name: 'accountInfo' }); // accounts 페이지로 이동
      } catch (error) {
        console.error(error);
        this.errorMessage = '공백이거나 이미 존재하는 닉네임입니다.';
      }
    },
  },
};
</script>
<style scoped>
.user-info-heading {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
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
.nickname-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.nickname-label {
  font-size: 1rem;
  margin-right: 10px;
}

.input-container {
  display: flex;
  align-items: center;
}

.nickname-input {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 8px;
  margin-right: 10px;
}

.updateBtn {
  background-color: rgb(25, 118, 210);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.success-message {
  font-size: 0.9rem;
  margin-top: 5px;
  color: green;
}

.error-message {
  font-size: 0.9rem;
  margin-top: 5px;
  color: red;
}
</style>
