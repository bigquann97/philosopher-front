<template>
  <div>
    <label for="password-input">새 비밀번호: </label>
    <input type="password" id="password-input" v-model="newPassword" />
    <label for="confirm-password-input">새 비밀번호 확인: </label>
    <input
      type="password"
      id="confirm-password-input"
      v-model="confirmPassword"
    />
    <button @click="changePassword" class="updateBtn">변경</button>
    <div v-if="passwordChanged">{{ alertMessage }}</div>
    <div v-if="passwordMismatch">{{ errorMessage }}</div>
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
      passwordMismatch: false,
      errorMessage: '비밀번호가 일치하지 않습니다.',
      alertMessage: '비밀번호가 변경되었습니다. accounts 페이지로 이동합니다.',
    };
  },
  methods: {
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordMismatch = true;
        this.passwordChanged = false;
        return;
      }
      try {
        let password = this.newPassword;
        await modifyAccountPassword(password);
        this.passwordChanged = true;
        this.passwordMismatch = false;
        alert(this.alertMessage);
        this.$router.push('/accountInfo');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
.updateBtn {
  background-color: blue;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
}
</style>
