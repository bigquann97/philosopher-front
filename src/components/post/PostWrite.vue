<template>
  <div class="container">
    <div class="row">
      <h4>
        <b>게시물 작성</b>
      </h4>
      <h6 style="color: grey">
        Philosopher에서 다양한 주제의 토론을 나눠보세요.
      </h6>
    </div>
    <div class="row">
      <label style="color: black; font-weight: 700">닉네임</label>
      <input
        id="name"
        name="name"
        type="text"
        class="validate"
        :value="name"
        placeholder="작성자"
        disabled
      />
    </div>
    <div class="row">
      <label style="color: black; font-weight: 700">카테고리</label>
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
      <label style="color: black; font-weight: 700">제목</label>
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
      <label style="color: black; font-weight: 700">예상 답변 - </label>
      <label style="color: blue; font-weight: 700"
        >최대 5개까지 작성 가능합니다.</label
      >
      <input
        id="title"
        name="title"
        type="text"
        class="validate"
        v-model="article.opinions[0]"
        placeholder=" 예상 답변 1"
        style="border: 1px solid black; border-radius: 10px"
      />
      <input
        id="title"
        name="title"
        type="text"
        class="validate"
        v-model="article.opinions[1]"
        placeholder=" 예상 답변 2"
        style="border: 1px solid black; border-radius: 10px"
      />
      <input
        id="title"
        name="title"
        type="text"
        class="validate"
        v-model="article.opinions[2]"
        placeholder=" 예상 답변 3"
        style="border: 1px solid black; border-radius: 10px"
      />
      <input
        v-if="title4"
        id="title4"
        name="title4"
        type="text"
        class="validate"
        v-model="article.opinions[3]"
        placeholder=" 예상 답변 4"
        style="border: 1px solid black; border-radius: 10px"
      />
      <input
        v-if="title5"
        id="title5"
        name="title5"
        type="text"
        class="validate"
        v-model="article.opinions[4]"
        placeholder=" 예상 답변 5"
        style="border: 1px solid black; border-radius: 10px"
      />
      <div class="col s1 offset-s11">
        <a
          class="waves-effect btn blue lighten-5"
          @click="add"
          v-show="addButton"
        >
          <i class="material-icons center">add</i>
        </a>
      </div>
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
      <a class="btn blue lighten-5" @click="write">작성 완료</a>&nbsp;&nbsp;
      <a class="btn grey lighten-2" @click="cancel">취소</a>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { createPost } from '@/api/post';

export default {
  components: {},

  data: () => ({
    title4: false,
    title5: false,
    addButton: true,
    fileName: '첨부파일은 최대 3개까지 입니다.',
    article: {
      title: '',
      content: '',
      opinions: [],
      category: '',
    },
    editorOption: {
      placeholder: '여기에 내용을 입력해주세요',
      theme: 'snow',
    },
    actions: [],
  }),

  methods: {
    add() {
      this.title4 = true;
      this.title5 = true;
      this.addButton = false;
    },
    handleFileChange() {
      const files = this.$refs.file.files;
      this.files = files;
      this.fileName = '';
      for (let i = 0; i < files.length; i++) {
        this.fileName += files[i].name + ' ';
      }
    },
    async write() {
      try {
        const formData = new FormData();
        const postData = {
          title: this.article.title,
          content: this.article.content,
          category: this.article.category,
          opinions: this.article.opinions,
        };
        for (let i = 0; i < this.files.length; i++) {
          formData.append('image', this.files[i]);
        }
        const json = JSON.stringify(postData);
        const blob = new Blob([json], { type: 'application/json' });
        formData.append('dto', blob);
        const res = await createPost(formData);
        console.log(res);
        await this.$router.push('/posts');
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.$router.push('/posts');
    },
  },

  computed: {
    name() {
      return this.$store.state.username;
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
</style>
