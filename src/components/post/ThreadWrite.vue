<template>
  <div class="container">
    <div class="row">
      <h1>{{ job }}</h1>
    </div>
    <div class="row">
      <div class="input-field">
        <i class="material-icons prefix">account_circle</i>
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
    </div>
    <div class="row">
      <div class="input-field">
        <i class="material-icons prefix">subject</i>
        <input
          id="title"
          name="title"
          type="text"
          class="validate"
          v-model="article.title"
          placeholder="제목"
        />
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <quill-editor
          v-model="article.content"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </quill-editor>
      </div>
    </div>
    <div class="row center">
      <a class="btn" @click="write">작성 완료</a>&nbsp;&nbsp;
      <a class="btn grey" @click="cancel">취소</a>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

export default {
  components: {
    quillEditor,
  },

  data: () => ({
    job: '게시물 작성',
    article: {
      title: '',
      content: '',
    },
    editorOption: {
      placeholder: '여기에 내용을 입력해주세요',
      theme: 'snow',
    },
    actions: [],
  }),

  methods: {
    cancel() {
      this.$router.push('/threads');
    },

    onEditorBlur(quill) {
      this.actions.push(quill);
    },

    onEditorFocus(quill) {
      this.actions.push(quill);
    },

    onEditorReady(quill) {
      this.actions.push(quill);
    },

    onEditorChange({ quill, html }) {
      this.content = html;
      this.actions.push(quill);
    },
  },

  computed: {
    name() {
      return this.$store.state.userDetail
        ? this.$store.state.userDetail.name
        : '';
    },

    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>

<style scoped>
.quill-editor {
  border: none;
  height: auto;
}
</style>
