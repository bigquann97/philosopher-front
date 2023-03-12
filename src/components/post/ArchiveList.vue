<template>
  <div>
    <div class="container">
      <div class="row valign-wrapper">
        <div class="col s6">
          <h5 class="board-name">
            <b class="board-title">아카이브</b>
            <br />
            <small>토론이 끝난 쓰레드를 저장해놓는 아카이브입니다.</small>
          </h5>
        </div>
        <div class="col s2"></div>
        <div class="col s3">
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
      <div class="row">
        <select
          class="browser-default"
          v-model="sort"
          @change="searching"
          style="width: 80px; float: right"
        >
          <option value="">-정렬순서-</option>
          <option value="NEW">--최신순--</option>
          <option value="RCMND">--추천순--</option>
        </select>
        <select
          class="browser-default"
          v-model="category"
          @change="searching"
          style="width: 80px; float: left"
        >
          <option value="">-카테고리-</option>
          <option :value="1">---철학---</option>
          <option :value="2">---논쟁---</option>
          <option :value="3">---예술---</option>
          <option :value="4">---공상---</option>
          <option :value="5">---사회---</option>
          <option :value="6">---경제---</option>
          <option :value="7">---연애---</option>
        </select>
      </div>
      <div class="collection">
        <router-link
          tag="a"
          :to="{ name: 'Archive', params: { id: one.id }, query: { page: 1 } }"
          class="collection-item row"
          v-for="one in list"
          :key="one.id"
        >
          <span class="col s7">
            <span style="color: deepskyblue; margin-right: 5px"
              >[{{ one.category }}]</span
            >
            <span>{{ one.title }}</span>
            <span class="red-text"> [ {{ one.commentCount }} ] </span></span
          >
          <small class="col s2 center-align">{{ one.nickname }}</small>
          <small class="col s1 center-align">{{ one.recommendCount }}</small>
          <small class="col s2 center-align">{{ one.createdDate }}</small>
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
import _ from 'lodash';
import qstr from 'query-string';
import { fetchArchiveList } from '@/api/archive';

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
    sort: '',
    category: '',
  }),

  methods: {
    searching() {
      const keyword = this.search.word.trim();
      const category = this.category;
      const sort = this.sort;
      if (category !== '' && keyword === '' && sort === '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify({ category })}`,
        );
      }
      if (sort !== '' && keyword === '' && category === '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify({ sort })}`,
        );
      }
      if (keyword !== '' && category === '' && sort === '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify(this.search)}`,
        );
      }
      if (keyword !== '' && category !== '' && sort === '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify(
            this.search,
          )}&${qstr.stringify({
            category,
          })}`,
        );
      }
      if (keyword !== '' && sort !== '' && category === '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify(
            this.search,
          )}&${qstr.stringify({
            sort,
          })}`,
        );
      }
      if (category !== '' && sort !== '' && keyword === '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify({
            category,
          })}&${qstr.stringify({
            sort,
          })}`,
        );
      }
      if (keyword !== '' && category !== '' && sort !== '') {
        this.$router.push(
          `/threads/archived?page=1&${qstr.stringify(
            this.search,
          )}&${qstr.stringify({
            category,
          })}&${qstr.stringify({ sort })}`,
        );
      }
      if (keyword === '' && category === '' && sort === '') {
        this.$router.push(`/threads/archived`);
      }
    },

    beforeLoadPage() {
      this.query = this.$route.query;
      this.search = {
        word: this.query.word !== undefined ? this.query.word : '',
      };
      if (this.query.page === undefined) {
        this.$router.push({ path: '/threads/archived', query: { page: 1 } });
      } else {
        this.loadPage();
      }
    },

    async loadPage() {
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res = await fetchArchiveList(query);
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
      return { path: '/threads/archived', query: target };
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
@media (max-width: 375px) {
  /* 모든 요소의 폰트 크기를 조정 */
  body {
    font-size: 14px;
  }

  /* 네비게이션 바와 푸터의 높이를 조정 */
  nav,
  footer {
    height: auto;
  }

  /* 이미지와 동영상의 크기를 조정 */
  img,
  video {
    max-width: 100%;
    height: auto;
  }

  /* 그 외 요소들의 너비를 조정 */
  * {
    max-width: 100%;
    box-sizing: border-box;
  }
}
</style>
