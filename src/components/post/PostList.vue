<template>
  <div>
    <div class="container">
      <div class="row valign-wrapper">
        <div class="col s3">
          <h5 class="board-name">
            <b class="board-title">게시물</b>
            <br />
            <small>추천 수 5 이상이면 의견을 나눌 수 있습니다.<br /></small
            ><small>여러분의 생각을 펼쳐보세요!</small>
          </h5>
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
          <a class="col s12 waves-effect btn blue lighten-5" @click="searching">
            <i class="material-icons center">search</i>
          </a>
        </div>
      </div>
      <div class="collection">
        <router-link
          tag="a"
          :to="{ name: 'Post', params: { id: one.id }, query: { page: 1 } }"
          class="collection-item row"
          v-for="one in list"
          :key="one.id"
        >
          <div v-if="one.status === 'DELETED'" style="margin-left: 10px">
            삭제된 게시글 입니다.
          </div>
          <div v-if="one.status === 'BLINDED'" style="margin-left: 10px">
            블라인드 처리된 게시글 입니다.
          </div>
          <div v-if="one.status === 'ACTIVE'">
            <span class="col s6">
              <span style="color: deepskyblue; margin-right: 5px"
                >[{{ one.category }}]</span
              >
              <span>{{ one.title }}</span>
            </span>
            <span class="col s2 center-align">{{ one.nickname }}</span>
            <span class="col s2 center-align">
              <img src="@/image/thumbs-up.png" alt="" style="width: 15px" />{{
                one.recommendCount
              }}</span
            >
            <span class="col s2 center-align">{{ one.createdDate }}</span>
          </div>
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
        <div v-if="isUserLogin" class="col s6 right-align">
          <router-link to="/post" class="waves-effect btn blue lighten-5"
            >글쓰기</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import qstr from 'query-string';
import { fetchPostList } from '@/api/post';

export default {
  created() {
    this.beforeLoadPage();
  },

  data: () => ({
    pagination: {},
    search: {},
    list: [],
    blockSize: 5,
    query: {},
  }),

  methods: {
    searching() {
      const keyword = this.search.word.trim();
      if (keyword !== '') {
        this.$router.push(`/posts?page=1&${qstr.stringify(this.search)}`);
      }
    },

    beforeLoadPage() {
      this.query = this.$route.query;
      this.search = {
        word: this.query.word !== undefined ? this.query.word : '',
      };
      if (this.query.page === undefined) {
        this.$router.push({ path: '/posts', query: { page: 1 } });
      } else {
        this.loadPage();
      }
    },

    async loadPage() {
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res = await fetchPostList(query);
      const result = res.data;
      console.log(result);
      this.list = res.data.content;
      this.pagination = {
        numberOfElements: res.data.numberOfElements,
        totalElements: res.data.totalElements,
        isFirst: res.data.first,
        isLast: res.data.last,
        currentPage: res.data.number,
        totalPages: res.data.totalPages,
        pageSize: res.data.size,
      };
    },

    fullPath(val) {
      const target = _.cloneDeep(this.query);
      target.page = val;
      return { path: '/posts', query: target };
    },

    previous() {
      const page =
        _.first(this.presentedPages) - 1 < 0 ? 1 : _.first(this.presentedPages);
      this.$router.push(this.fullPath(page));
    },

    forward() {
      const total =
        this.pagination.totalPages === 1 ? 1 : this.pagination.totalPages;
      const page =
        _.last(this.presentedPages) === total
          ? total + 1
          : _.last(this.presentedPages) + 2;
      this.$router.push(this.fullPath(page));
    },
  },

  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    presentedPages() {
      const current = this.pagination.currentPage;
      const blockSize = this.blockSize;
      const total =
        this.pagination.totalPages === 0 ? 0 : this.pagination.totalPages - 1;

      const startOfBlock = current - (current % blockSize);
      const endOfBlock = startOfBlock + blockSize;
      const complimentedEOB = endOfBlock > total + 1 ? total + 1 : endOfBlock;
      return _.range(startOfBlock, complimentedEOB);
    },
  },

  beforeRouteUpdate(to, from, next) {
    next();
    this.beforeLoadPage();
  },
};
</script>
<style>
* {
  color: black;
}

.board-name {
  width: 300%;
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

@media (max-width: 1640px) {
  .navbar ul li span {
    display: none;
  }
}

@media (max-width: 1390px) {
  body {
    width: 90%;
  }
  header {
    width: 90%;
  }
  .menu li a {
    padding: 0 10px;
  }
  .navbar li a {
    font-size: 1.1rem;
    margin-right: 10px;
    padding: 6px 6px;
  }
}

@media (min-width: 931px) {
  .menu ul li a.menu-icon {
    display: none;
  }
  .dropdown li:not(:last-child) {
    border-right: 1px solid rgb(211, 211, 211);
  }
}

@media (max-width: 930px) {
  .company-name a span {
    display: none;
  }
  .first-row {
    flex-direction: column;
  }
  .second-row {
    flex-direction: column;
  }
  .board1 {
    margin-bottom: 50px;
  }
  .board1,
  .board2 {
    padding: 0;
  }
  .menu ul li.dropdown li {
    display: block;
  }
  .menu ul li ul.dropdown {
    background-color: white;
    position: absolute;
    z-index: 999;
    display: none;
    padding: 0;
    margin: 0;
  }
  .menu ul li a:hover {
    background-color: white;
    color: dodgerblue;
  }
  .menu ul li:hover ul.dropdown {
    display: block;
  }
}

@media (max-width: 420px) {
  .menu ul {
    margin-right: 100px;
    width: 20%;
  }
}
</style>
