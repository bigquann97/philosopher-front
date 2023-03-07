<template>
  <div>
    <label for="nickname-input" color="black">닉네임: </label>
    <input type="text" id="nickname-input" v-model="newNickname" />
    <button @click="changeNickname" class="updateBtn">변경</button>
    <div v-if="nicknameChanged">닉네임이 변경되었습니다.</div>
  </div>
</template>
<script>
import { modifyAccountNickname } from '@/api/account';
export default {
  data() {
    return {
      newNickname: '',
      nicknameChanged: false,
    };
  },
  methods: {
    async changeNickname() {
      try {
        let nickname = this.newNickname.toString();
        await modifyAccountNickname(nickname);
        this.nicknameChanged = true;
        alert('닉네임이 변경되었습니다.');
        this.$router.push({ name: 'accountInfo' }); // accounts 페이지로 이동
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.updateBtn {
  background-color: rgb(25, 118, 210);
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  margin-top: 10px;
}
</style>
