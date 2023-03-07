<template>
  <div class="container">
    <div class="section">
      <h5>
        <b>
          {{ detail.title }}
        </b>
      </h5>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div>
        닉네임 : <a>{{ detail.nickname }}</a>
      </div>
      <span style="font-size: medium; float: right">
        작성일 : {{ detail.modifiedDate }}
      </span>
      <div>추천수 : {{ detail.recommendCount }}</div>
      <button style="float:right;" @click="report">
        <i class="material-icons bottom">flag</i>
        <span style="float: right">신고</span>
      </button>
      <v-dialog v-model="dialog" width="500px">
        <v-card height="420">
          <v-card-title>
            신고하기
          </v-card-title>
          <v-card-text>
            <select
              class="browser-default"
              name="reportCategory"
              v-model="reportCategory"
            >
              <option value=""> 신고 카테고리를 선택해주세요.</option>
              <option value="ABUSE">욕설</option>
              <option value="IRRELEVANT">게시글 취지와 상관없는 게시글</option>
              <option value="ADVERTISEMENT">광고</option>
              <option value="SEXUAL_HARASSMENT"> 성희롱</option>
              <option value="SPAMMER">도배</option>
            </select>
            <v-textarea
              v-model="reportContent"
              height="200"
              solo
              auto-grow
              label="여기에 신고할 내용을 입력하세요."
            ></v-textarea>
            <a
              @click="confirmReport"
              class="btn col s2"
              style="background-color: white; float: right"
              >확인</a
            >
            <a
              @click="closeReportForm"
              class="btn col s2"
              style="background-color: white; float:right;"
              >취소</a
            >
            <p class="log">{{ logMessageSignup }}</p>
          </v-card-text>
        </v-card>
      </v-dialog>
      <div>카테고리 : {{ detail.category }}</div>
    </div>
    <div class="divider"></div>
    <div>
      <div v-if="detail.opinions[0] !== ''">
        <div>{{ detail.opinions[0] }}</div>
      </div>
      <div v-if="detail.opinions[1] !== ''">
        <div>{{ detail.opinions[1] }}</div>
      </div>
      <div v-if="detail.opinions[2] !== ''">
        <div>{{ detail.opinions[2] }}</div>
      </div>
      <div v-if="detail.opinions[3] !== ''">
        <div>{{ detail.opinions[3] }}</div>
      </div>
      <div v-if="detail.opinions[4] !== ''">
        <div>{{ detail.opinions[4] }}</div>
      </div>
    </div>
    <div class="section">
      <img :src="imageUrl" alt="" style="max-width: 300px; max-height: 300px" />
      <div>{{ detail.content }}</div>
    </div>
    <div style="text-align: center; margin-bottom: 20px">
      <a>
        <img
          src="@/image/like_blue.png"
          alt=""
          style="width: 35px"
          @click="recommendPost"
        />
        <span style="font-size: xx-large"> {{ detail.recommendCount }}</span>
      </a>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { fetchPost } from '@/api/post';
import { createRecommendPost, deleteRecommendPost } from '@/api/recommendation';
import { reportPost } from '@/api/report';

export default {
  props: ['id'],
  data: () => ({
    detail: [],
    dialog: false,
    reportCategory: '',
    reportContent: '',
    content: '',
    category: '',
    logMessageSignup: '',
  }),
  async created() {
    const postId = this.$route.params.id;
    const res = await fetchPost(postId);
    console.log(this.id);
    this.detail = res.data;
    this.imageUrl = res.data.images[0];
    console.log(res);
  },
  methods: {
    async report() {
      this.dialog = true;
    },
    async recommendPost() {
      try {
        const res = await createRecommendPost(this.id);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        const res = await deleteRecommendPost(this.id);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      }
    },
    async confirmReport() {
      try {
        await reportPost(this.id, {
          content: this.reportContent,
          category: this.reportCategory,
        });
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.log(error);
        this.logMessageSignup = error.response.data.message;
      }
    },
    async closeReportForm() {
      this.dialog = false;
    },
  },
};
</script>
