<template>
  <div>
    <label for="nickname-input">닉네임: </label>
    <input type="text" id="nickname-input" v-model="newNickname" />
    <button @click="changeNickname">변경</button>
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
        let nickname = this.newNickname.toString(); // 닉네임을 string 타입으로 변환
        await modifyAccountNickname(nickname);
        this.nicknameChanged = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped></style>
