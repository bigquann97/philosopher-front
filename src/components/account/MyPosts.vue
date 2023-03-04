<template>
  <div>
    <div class="container">
      <div class="row s1">
        <div class="col s3">
          내가 작성한 게시물
        </div>
        <div class="col s3 offset-s5">
          <input
            type="text"
            class="validate"
            v-model="search.word"
            placeholder="검색"
            style="text-align: center"
            @keydown.enter="searching"
          />
        </div>
        <div class="col s1">
          <a class="col s12 waves-effect btn teal lighten-5" @click="searching">
            <i class="material-icons center">search</i>
          </a>
        </div>
      </div>
      <div class="collection" ref="commentList">
        <router-link
          tag="a"
          :to="{
            name: 'MyComments',
            params: { id: one.id },
            query: { page: 0 },
          }"
          class="collection-item row"
          v-for="one in list"
          :key="one.id"
        >
          <span class="col s6">{{ [one.title] }}</span>
          <span class="col s6">{{ one.content }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { getMyPosts } from '@/api/account';
export default {
  name: 'MyComments',
  data() {
    return {
      list: [],
      search: {
        word: '',
      },
      pagination: {
        page: parseInt(this.$route.query.page) || 0,
        size: 10,
        totalElements: 0,
        totalPages: 0,
        presentationSize: 5,
      },
      loading: false,
    };
  },
  mounted() {
    this.loadPage();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  watch: {
    $route(to, from) {
      console.log('이전 라우트', from);
      console.log('새 라우트', to);
      if (to.query.page !== from.query.page) {
        this.loadPage();
      }
    },
  },
  computed: {
    presentedPages() {
      let from =
          this.pagination.page - Math.floor(this.pagination.presentationSize / 2);
      from = Math.max(from, 0);
      const to = from + this.pagination.presentationSize;
      return Array.from(
          { length: this.pagination.totalPages },
          (el, index) => index,
      )
      .slice(from, to)
      .filter(el => el >= 0);
    },
  },
  methods: {
    loadPage() {
      this.loading = true;
      getMyPosts({
        params: { page: this.pagination.page, size: this.pagination.size },
      })
      .then(response => {
        const data = response.data;
        this.list = data.content;
        this.pagination.totalElements = data.totalElements;
        this.pagination.totalPages = Math.ceil(
            data.totalElements / this.pagination.size,
        );
      })
      .finally(() => {
        this.loading = false;
      });
    },
    handleScroll() {
      if (
          window.innerHeight + window.pageYOffset >=
          document.documentElement.offsetHeight - 1 &&
          !this.loading
      ) {
        if (this.pagination.page + 1 < this.pagination.totalPages) {
          this.pagination.page++;
          this.loadPage();
        }
      }
    },
    searching() {
      this.pagination.page = 0;
      this.loadPage();
    },
  },
};
</script>

<style>
.s1 {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>