<template>
  <div class="container">
    <div class="section">
      <div class="col s6">
        <h5 class="board-name">
          <b class="board-title">게시물</b>
          <small
            >추천 수 5 이상이면 의견을 나눌 수 있습니다. 여러분의 생각을
            펼쳐보세요!</small
          >
        </h5>
      </div>
      <h5>
        <b>
          {{ detail.title }}
        </b>
      </h5>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div class="section">
        <div style="float:left;">
          닉네임 : <a>{{ detail.nickname }}</a>
        </div>
      </div>
      <div class="section">
        <div style="font-size: medium; float: right">
          작성일 : {{ detail.modifiedDate }}
        </div>
        <div style="float:left;">추천수 : {{ detail.recommendCount }}</div>
      </div>
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
      <div class="section">
        <span>카테고리 : {{ detail.category }}</span>
        <div style="float:right;" @click="report">
          <i class="material-icons bottom">flag</i>
          <span style="float: right">신고</span>
        </div>
      </div>
    </div>
    <div class="divider"></div>
    <div>
      <div>의견 목록 :</div>
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
    <div class="divider"></div>
    <div class="section">
      <img :src="imageUrl" alt="" style="max-width: 300px; max-height: 300px" />
      <img
        :src="imageUrl1"
        alt=""
        style="max-width: 300px; max-height: 300px"
      />
      <img
        :src="imageUrl2"
        alt=""
        style="max-width: 300px; max-height: 300px"
      />
      <div>{{ detail.content }}</div>
    </div>
    <div style="text-align: center; margin-bottom: 1px">
      <a>
        <img
          src="@/image/like.png"
          alt=""
          style="width: 35px"
          @click="recommendPost"
        />
        <span style="font-size: xx-large"> {{ detail.recommendCount }}</span>
      </a>
    </div>
    <div
      v-if="$store.state.username === detail.nickname"
      style="text-align: center; margin-bottom: 20px"
    >
      <a class="btn col s2" style="background-color: white;" @click="modifyPost"
        >수정</a
      >
      <a class="btn col s2" style="background-color: white;" @click="deletePost"
        >삭제</a
      >
    </div>
    <v-dialog v-model="postDeleteForm" width="350">
      <v-card height="130">
        <v-card-text
          class="row center"
          style="font-size: large; padding-top: 20px"
        >
          <span>정말 삭제하시겠습니까?</span>
        </v-card-text>
        <div class="row center">
          <a class="btn blue lighten-5" @click="confirmDelete">확인</a
          >&nbsp;&nbsp;
          <a class="btn grey lighten-2" @click="cancel">취소</a>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="postEditForm" width="800">
      <v-card height="530" width="798">
        <div class="row">
          <label style="color: black; font-weight: 500">카테고리</label>
          <select
            class="browser-default"
            name="category"
            v-model="article.category"
            style="border: 1px solid black; border-radius: 10px"
          >
            <option value=""> 카테고리를 선택해주세요.</option>
            <option :value="1">철학</option>
            <option :value="2">논쟁</option>
            <option :value="3">예술</option>
            <option :value="4">공상</option>
            <option :value="5">사회</option>
            <option :value="6">경제</option>
            <option :value="7">연애</option>
          </select>
        </div>
        <div class="row">
          <label style="color: black; font-weight: 500">제목</label>
          <input
            id="title"
            name="title"
            type="text"
            class="validate"
            v-model="article.title"
            placeholder=" 제목을 입력해주세요."
            style="border: 1px solid black; border-radius: 10px"
          />
        </div>
        <div class="row">
          <v-textarea
            auto-grow
            v-model="article.content"
            placeholder="내용을 입력해 주세요."
            style="border: 1px solid black; border-radius: 10px; margin: auto"
          >
          </v-textarea>
        </div>
        <div class="row">
          <div class="filebox">
            <input
              class="upload-name col s11 offset-s1"
              :value="fileName"
              placeholder="첨부파일"
            />
            <label for="file">파일찾기</label>
            <input
              type="file"
              id="file"
              ref="file"
              @change="handleFileChange"
              multiple
            />
          </div>
          <input type="file" id="input-file" style="display: none" multiple />
        </div>
        <div class="row center">
          <a class="btn blue lighten-5" @click="modify">수정 완료</a
          >&nbsp;&nbsp;
          <a class="btn grey lighten-2" @click="cancel">취소</a>
        </div>
      </v-card>
    </v-dialog>
    <div class="divider"></div>
  </div>
</template>

<script>
import { fetchPost, modifyPost, deletePost } from '@/api/post';
import { createRecommendPost, deleteRecommendPost } from '@/api/recommendation';
import { reportPost } from '@/api/report';

export default {
  props: ['id'],
  data: () => ({
    detail: {
      opinions: {
        [0]: '',
        [1]: '',
        [2]: '',
        [3]: '',
        [4]: '',
      },
    },
    dialog: false,
    reportCategory: '',
    reportContent: '',
    content: '',
    category: '',
    logMessageSignup: '',
    postEditForm: false,
    postDeleteForm: false,
    fileName: '첨부파일은 최대 3개까지 입니다.',
    article: {
      title: '',
      content: '',
      opinions: [],
      category: '',
    },
  }),
  async created() {
    try {
      const postId = this.$route.params.id;
      const res = await fetchPost(postId);
      console.log(this.id);
      this.detail = res.data;
      this.imageUrl = res.data.images[0];
      this.imageUrl1 = res.data.images[1];
      this.imageUrl2 = res.data.images[2];
      console.log(res);
    } catch (error) {
      alert(error.response.data.message);
      await this.$router.push('/posts');
    }
  },
  methods: {
    handleFileChange() {
      const files = this.$refs.file.files;
      this.files = files;
      this.fileName = '';
      for (let i = 0; i < files.length; i++) {
        this.fileName += files[i].name + ' ';
      }
    },
    async confirmDelete() {
      try {
        const res = await deletePost(this.id);
        console.log(res);
        await this.$router.push('/posts');
      } catch (error) {
        console.log(error);
      }
    },
    async modify() {
      try {
        const formData = new FormData();
        const postData = {
          title: this.article.title,
          content: this.article.content,
          categoryId: this.article.category,
        };
        for (let i = 0; i < this.files.length; i++) {
          formData.append('image', this.files[i]);
        }
        const json = JSON.stringify(postData);
        const blob = new Blob([json], { type: 'application/json' });
        formData.append('dto', blob);
        console.log(this.id);
        const res = await modifyPost(this.id, formData);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.postEditForm = false;
      this.postDeleteForm = false;
    },
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
    async modifyPost() {
      this.postEditForm = true;
    },
    async deletePost() {
      this.postDeleteForm = true;
    },
  },
};
</script>
<style scoped>
.filebox .upload-name {
  display: inline-block;
  height: 40px;
  padding: 0 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 78%;
  color: #999999;
}
.filebox label {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  margin-left: 10px;
}
.filebox input[type='file'] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.board-name {
  width: 160%;
}
.board-title {
  color: #6aafe6;
  text-shadow: 1px 1px gray;
  font-size: 30px;
}
.board-name small {
  color: gray;
  font-size: 12px; /* 작은 글씨의 글자 크기 */
  margin-left: 5px; /* 게시물과 작은 글씨 사이의 간격 */
}
</style>
