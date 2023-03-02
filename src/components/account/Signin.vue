<template>
  <div class="contents">
    <div class="signin_title">
      <img class="signin_logo" src="@/image/logo.png" alt="logo" />
      <h2>우리 모두 철학자</h2>
      <p>나만의 철학적인 질문을 모두와 함께 공유하는 토론의 장</p>
    </div>
    <div class="form-wrapper form-wrapper-sm">
      <input
        id="email"
        name="email"
        type="text"
        class="validate"
        v-model="email"
        placeholder="아이디(이메일 형식)를 입력해주세요. email@email.com"
      />
      <input
        id="password"
        name="password"
        type="password"
        class="validate"
        v-model="password"
        placeholder="비밀번호를 입력해주세요."
      />

      <p class="log">{{ logMessage }}</p>
      <div style="text-align: center">
        <v-btn color="success" class="mr-4" type="submit" @click="submitForm">
          로그인
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // form values
      email: '',
      password: '',
      // log
      logMessage: '',
      // validation
    };
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch('LOGIN', userData);
        await this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>

<style>
.wrapper {
  width: 60%;
  margin: 0 auto;
  padding: 1em;
}

.signin_title {
  text-align: center;
}

.signin_logo {
  width: 60px;
  border-radius: 50%;
  margin-top: 90px;
}

.signin_title h2 {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 25px;
  font-weight: bold;
}

.signin_title p {
  font-size: 1rem;
  margin: 8px 0 0;
}

.form-wrapper {
  /* border-top: 1px solid gray; */
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  margin-top: 50px;
  display: flex;
  flex-flow: row wrap;
  box-shadow: none;
}

legend {
  font-size: 1rem;
  margin-bottom: 10px;
  display: block;
}

label {
  font-size: 1rem;
  margin-top: 10px;
  margin-bottom: 5px;
}

button {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
}
</style>
