<template>
  <div class="wrapper">
    <section>
      <div class="signup_title">
        <img class="signup_logo" src="@/image/logo.png" alt="logo" />
        <h2>우리 모두 철학자</h2>
        <p>나만의 철학적인 질문을 모두와 함께 공유하는 토론의 장</p>
      </div>
      <div class="form-wrapper">
        <form>
          <legend>회원가입에 필요한 정보를 입력해주세요.</legend>

          <label>이메일</label>
          <input
            id="email"
            name="email"
            type="text"
            class="validate"
            v-model="email"
            placeholder="email@email.com"
          />
          <p class="log">{{ emailMessage }}</p>
          <div style="text-align: center">
            <v-btn
              color="blue lighten-4"
              class="button_success"
              @click="sendVerificationMail((Loading = true))"
            >
              이메일 인증하기
            </v-btn>
            <v-dialog v-model="Loading" width="500px">
              <v-card height="420">
                <LoadingSpinner v-if="isLoading"></LoadingSpinner>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" width="500px">
              <v-card height="420">
                <v-card-title>
                  이메일 인증
                </v-card-title>
                <v-card-text>
                  <div>
                    <div style="margin: 20px auto">
                      <p style="text-align: center">
                        {{ email }} (으)로 보내드린 인증코드를 확인해 주세요.
                      </p>
                      <p style="text-align: center">
                        메일이 오지 않았다면 스팸 메일함을 확인해주세요.
                      </p>
                      <p style="text-align: center">
                        가장 최근에 보내진 인증 코드를 입력해주세요.
                      </p>
                      <p style="text-align: center">
                        개인정보 보호를 위해 인증코드는 3분 간 유효합니다.
                      </p>
                      <p style="text-align: center">
                        인증코드를 못 받으셨나요?<a
                          @click="sendVerificationMail"
                        >
                          다시 받기</a
                        >
                      </p>
                    </div>
                    <input
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      class="validate"
                      v-model="verificationCode"
                      placeholder="인증코드 입력"
                    />
                    <v-row justify="center" style="margin: 20px">
                      <v-btn
                        color="blue lighten-5"
                        variant="text"
                        @click="dialog = false"
                        style="margin: auto 20px auto auto"
                      >
                        닫기
                      </v-btn>
                      <v-btn
                        color="blue lighten-3"
                        variant="text"
                        @click="verifyEmail"
                        style="margin: auto auto auto 20px"
                      >
                        확인
                      </v-btn>
                    </v-row>
                  </div>
                </v-card-text>
                <p class="log">{{ logMessage }}</p>
                <v-card-actions>
                  <v-row justify="center"> </v-row>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
          <label>비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            class="validate"
            v-model="password"
            placeholder="비밀번호는 8자 이상 15자 이하입니다."
          />
          <label>비밀번호 확인</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            class="validate"
            v-model="passwordConfirm"
            placeholder="위의 비밀번호와 동일하게 입력해주세요."
          />
          <p class="log">{{ passwordMessage }}</p>
          <label>닉네임</label>
          <input
            id="nickname"
            name="nickname"
            type="text"
            class="validate"
            v-model="nickname"
            placeholder="닉네임은 2자 이상 10자 이하입니다."
          />
          <p class="log">{{ nicknameMessage }}</p>
          <label>나이</label>
          <input v-model="age" placeholder="나이" />
          <label>성별</label>
          <select class="browser-default" name="gender" v-model="gender">
            <option value=""> ===========성별 선택===========</option>
            <option value="MALE">남자</option>
            <option value="FEMALE">여자</option>
          </select>
          <p class="log">{{ logMessage }}</p>
          <div class="buttons">
            <v-btn color="grey-lighten-2" class="button_error" href="/main">
              뒤로가기
            </v-btn>

            <v-btn
              color="blue lighten-3"
              class="button_success"
              @click="submitForm"
            >
              회원가입
            </v-btn>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
import axios from '@/libs/axios.custom';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

export default {
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      dialog: false,
      Loading: false,
      email: '',
      password: '',
      passwordConfirm: '',
      nickname: '',
      gender: '',
      age: '',
      logMessage: '',
      isLoading: false,
      verificationCode: '',
      passwordMessage: '',
      nicknameMessage: '',
      emailMessage: '',
    };
  },
  methods: {
    async sendVerificationMail() {
      this.isLoading = true;
      try {
        await axios.post(`/auth/mail?email=${this.email}`);
        this.dialog = true;
        this.Loading = false;
        this.isLoading = false;
      } catch (error) {
        console.log(error.response.data);
        this.logMessage = error.response.data.message;
      }
    },
    async verifyEmail() {
      try {
        await axios.post(
          `/auth/mail/${this.verificationCode}?email=${this.email}`,
        );
        this.dialog = false;
      } catch (error) {
        console.log(error.response.data);
        this.logMessage = error.response.data.message;
      }
    },
    async submitForm() {
      try {
        if (this.password !== this.passwordConfirm) {
          this.passwordMessage = '비밀번호가 일치하지 않습니다.';
          return;
        }
        if (this.nickname.length < 2 || this.nickname.length > 10) {
          this.nicknameMessage = '닉네임은 2자 이상 10자 이하입니다.';
          return;
        }
        if (this.password.length < 8 || this.password.length > 15) {
          this.passwordMessage =
            '비밀번호는 8자 이상 15자 이하, 특수문자를 포함해야합니다.';
          return;
        }
        if (
          !this.email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
        ) {
          this.emailMessage = '이메일 형식이 올바르지 않습니다.';
          return;
        }
        const userData = {
          email: this.email,
          password: this.password,
          nickname: this.nickname,
          gender: this.gender,
          age: this.age,
        };
        const { data } = await registerUser(userData);
        await this.$router.push('/sign-in');
        console.log(data.data.nickname);
        alert('회원가입 완료');
        this.logMessage = `${data.data.nickname} 님이 가입되었습니다`;
      } catch (error) {
        alert(error.response.data.message);
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

.signup_title {
  text-align: center;
}

.signup_logo {
  width: 60px;
  border-radius: 50%;
  margin-top: 90px;
}

.signup_title h2 {
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 25px;
  font-weight: bold;
}

.signup_title p {
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

.form-wrapper input,
select {
  font-size: 0.9rem;
  width: 100%;
  margin: auto;
  border: 1px solid rgba(107, 114, 128, 0.298);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 15px;
}

.form-wrapper input {
  font-size: 0.9rem;
  width: 100%;
  margin: auto;
  border: 1px solid rgba(107, 114, 128, 0.298);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 15px;
}

.form-wrapper .browser-default {
  font-size: 0.9rem;
  width: 100%;
  margin: auto;
  border: 1px solid rgba(107, 114, 128, 0.298);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 15px;
  -webkit-appearance: auto;
}

.form-wrapper .button_success {
  background-color: dodgerblue;
  color: black;
  border: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: auto;
}

.form-wrapper .button_error {
  color: black;
  border: none;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin: auto;
}

button:hover {
  background-color: rgb(16, 108, 199);
}

.buttons {
  display: flex;
  justify-content: center;
}

@media (max-width: 931px) {
  .wrapper {
    width: 90%;
  }
}
</style>
