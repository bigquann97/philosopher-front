<template>
  <div class="user-info-page">
    <h3 class="user-info-heading">비밀번호 변경</h3>
    <div class="password-container">
      <label for="new-password-input" class="password-label"
        >새 비밀번호:
      </label>
      <div class="input-container">
        <input
          type="password"
          id="new-password-input"
          v-model="newPassword"
          class="password-input"
        />
      </div>
      <label for="confirm-password-input" class="password-label"
        >새 비밀번호 확인:
      </label>
      <div class="input-container">
        <input
          type="password"
          id="confirm-password-input"
          v-model="confirmPassword"
          class="password-input"
        />
      </div>
      <div class="password-update-message">
        <div v-if="passwordChanged" class="success-message">
          비밀번호가 변경되었습니다.
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
      <button @click="changePassword" class="updateBtn">변경</button>
    </div>
  </div>
</template>

<script>
import { modifyAccountPassword } from '@/api/account';

export default {
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      passwordChanged: false,
      errorMessage: '',
    };
  },
  methods: {
    async changePassword() {
      if (!this.newPassword || !this.confirmPassword) {
        this.errorMessage = '비밀번호를 입력하세요.';
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = '두 비밀번호가 일치하지 않습니다.';
        return;
      }

      try {
        await modifyAccountPassword(this.newPassword);
        this.passwordChanged = true;
        alert('비밀번호가 변경되었습니다.');
        await this.$router.push({ name: 'accountInfo' }); // accounts 페이지로 이동
      } catch (error) {
        console.error(error);
        this.errorMessage = '비밀번호 변경 실패';
      }
    },
  },
};
</script>
<style scoped>
.user-info-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.password-label {
  font-size: 1rem;
  margin-right: 10px;
}

.input-container {
  display: flex;
  align-items: center;
}

.password-input {
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
