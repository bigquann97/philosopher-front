<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <span>이메일</span>
      <input
        id="email"
        name="email"
        type="text"
        class="validate"
        v-model="email"
        placeholder="email@email.com"
      />
      <div style="text-align: center">
        <v-btn
          color="success"
          class="mr-4"
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
                    개인정보 보호를 위해 인증코드는 3분 간 유효합니다.
                  </p>
                  <p style="text-align: center">
                    인증코드를 못 받으셨나요?<a @click="sendVerificationMail">
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
                    color="primary"
                    variant="text"
                    @click="dialog = false"
                    style="margin: auto 20px auto auto"
                  >
                    닫기
                  </v-btn>
                  <v-btn
                    color="primary"
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
      <span>비밀번호</span>
      <input
        id="password"
        name="password"
        type="password"
        class="validate"
        v-model="password"
        placeholder="비밀번호"
      />
      <span>닉네임</span>
      <input
        id="nickname"
        name="nickname"
        type="text"
        class="validate"
        v-model="nickname"
        placeholder="nickname"
      />
      <span>나이</span>
      <input v-model="age" placeholder="나이" />
      <span>성별</span>
      <select class="browser-default" name="gender" v-model="gender">
        <option value=""> ===========성별 선택===========</option>
        <option value="MALE">남자</option>
        <option value="FEMALE">여자</option>
      </select>
      <p class="log">{{ logMessageSignup }}</p>
      <div style="text-align: center">
        <v-btn color="error" class="mr-4" href="/main">
          뒤로가기
        </v-btn>

        <v-btn color="success" class="mr-4" type="submit" @click="submitForm">
          회원가입
        </v-btn>
      </div>
    </div>
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
      nickname: '',
      gender: '',
      age: '',
      logMessage: '',
      logMessageSignup: '',
      isLoading: false,
    };
  },
  methods: {
    async sendVerificationMail() {
      this.isLoading = true;
      try {
        await axios.post(`/api/auth/mail?email=${this.email}`);
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
          `/api/auth/mail/${this.verificationCode}?email=${this.email}`,
        );
        this.dialog = false;
      } catch (error) {
        console.log(error.response.data);
        this.logMessage = error.response.data.message;
      }
    },
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.password,
          nickname: this.nickname,
          gender: this.gender,
          age: this.age,
        };
        const { data } = await registerUser(userData);
        await this.$router.push('/signin');
        console.log(data);
        this.logMessageSignup = `${data} 님이 가입되었습니다`;
      } catch (error) {
        // https://yamoo9.github.io/axios/guide/error-handling.html
        console.log(error.response.data);
        this.logMessageSignup = error.response.data.message;
      }
    },
  },
};
</script>

<style></style>
