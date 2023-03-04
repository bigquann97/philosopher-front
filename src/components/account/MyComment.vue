<template>
  <div>
    <div class="container">
      <div class="row s1">
        <div class="col s3">
          댓글
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
      <div class="collection">
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
          <span class="col s6">{{ one.content }}</span>
          <small class="col s2 center-align">{{ one.nickname }}</small>
        </router-link>
      </div>
      <div class="row valign-wrapper">
        <div class="col s6">
          <ul class="pagination">
            <li class="waves-effect">
              <a @click="previous">
                <i class="material-icons">chevron_left</i>
              </a>
            </li>
            <router-link
              tag="li"
              v-for="present in presentedPages"
              :key="present"
              active-class="active"
              :to="fullPath(present + 1)"
              exact
            >
              <a>{{ present + 1 }}</a>
            </router-link>
            <li class="waves-effect">
              <a @click="forward">
                <i class="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyComments } from '@/api/account';
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
    };
  },
  mounted() {
    this.loadPage();
  },
  watch: {
    $route(to, from) {
      console.log('이전 라우트', from);
      console.log('새 라우트', to);
      this.loadPage();
      this.loadPage();
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
      getMyComments({
        params: { page: this.pagination.page, size: this.pagination.size },
      })
        .then(response => {
          const data = response.data;
          this.list = data.content;
          this.pagination.totalElements = data.totalElements;
          this.pagination.totalPages = data.totalPages;
        })
        .catch(error => {
          console.log(error);
          alert('데이터를 불러오는 중 오류가 발생했습니다.');
        });
    },
    searching() {
      const query = {};
      if (this.search.word) {
        query.word = this.search.word;
      }
      this.$router.push({
        name: 'MyComments',
        params: { id: this.$route.params.id },
        query: query,
      });
    },
    fullPath(page) {
      const query = {};
      if (this.search.word) {
        query.word = this.search.word;
      }
      return {
        name: 'MyComments',
        params: { id: this.$route.params.id },
        query: { ...query, page: page },
      };
    },
    previous() {
      if (this.pagination.page > 0) {
        this.pagination.page--;
        this.$router.push(this.fullPath(this.pagination.page));
      }
    },
    forward() {
      if (this.pagination.page < this.pagination.totalPages - 1) {
        this.pagination.page++;
        this.$router.push(this.fullPath(this.pagination.page));
      }
    },
  },
};
</script>

<style scoped></style>
