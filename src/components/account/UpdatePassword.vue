<template>
  <div>
    <label for="password-input">새 비밀번호: </label>
    <input type="password" id="password-input" v-model="newPassword" />
    <button @click="changePassword">변경</button>
    <div v-if="passwordChanged">비밀번호가 변경되었습니다.</div>
  </div>
</template>

<script>
import { modifyAccountPassword } from '@/api/account';

export default {
  data() {
    return {
      newPassword: '',
      passwordChanged: false,
    };
  },
  methods: {
    async changePassword() {
      try {
        let password = this.newPassword;
        await modifyAccountPassword(password);
        this.passwordChanged = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped></style>
