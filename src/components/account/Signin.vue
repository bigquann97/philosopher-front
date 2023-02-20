<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <input
        id="email"
        name="email"
        type="text"
        class="validate"
        v-model="email"
        placeholder="email@email.com"
      />
      <input
        id="password"
        name="password"
        type="password"
        class="validate"
        v-model="password"
        placeholder="비밀번호"
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

<style></style>
