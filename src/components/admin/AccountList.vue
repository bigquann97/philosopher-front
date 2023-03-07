<template>
  <div>
    <AdminHeader />
    <div class="container">
      <div class="row valign-wrapper">
        <div class="col s6">
          <h1>쓰레드</h1>
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
          <a class="col s12 waves-effect btn teal lighten-2" @click="searching">
            <i class="material-icons center">search</i>
          </a>
        </div>
      </div>
      <div class="collection">
        <div class="row">
          <span class="col s3 center-align"> 이메일 </span>
          <span class="col s2 center-align"> 닉네임 </span>
          <span class="col s1 center-align"> 나이 </span>
          <span class="col s1 center-align"> 성별 </span>
          <span class="col s2 center-align"> 유저 등급 </span>
          <span class="col s2 center-align">유저 상태 </span>
        </div>
        <router-link
          tag="a"
          :to="{
            name: 'AccountList',
            params: { id: one.id },
            query: { page: 1 },
          }"
          class="collection-item row"
          v-for="one in list"
          :key="one.id"
        >
          <span class="col s3 center-align"> {{ one.email }} </span>
          <span class="col s2 center-align">{{ one.nickname }}</span>
          <span class="col s1 center-align"> {{ one.age }} </span>
          <span class="col s1 center-align">{{ one.gender }}</span>
          <span class="col s2 center-align">{{ one.userRole }}</span>
          <span class="col s2 center-align">{{ one.userStatus }}</span>
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
        <div class="col s6 right-align">
          <router-link to="/posts" class="waves-effect btn">글쓰기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import qstr from 'query-string';
import { listAccount } from '@/api/admin';
import AdminHeader from '@/components/admin/AdminHeader.vue';

export default {
  created() {
    this.beforeLoadPage();
  },
  components: {
    AdminHeader,
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
        this.$router.push(
          `/admin/accounts?page=1&${qstr.stringify(this.search)}`,
        );
      }
    },

    beforeLoadPage() {
      this.query = this.$route.query;
      this.search = {
        word: this.query.word !== undefined ? this.query.word : '',
      };
      if (this.query.page === undefined) {
        this.$router.push({ path: '/admin/accounts', query: { page: 1 } });
      } else {
        this.loadPage();
      }
    },

    async loadPage() {
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res = await listAccount(query);
      const result = res.data;
      console.log(result);
      this.list = res.data.content;
      this.pagination = {
        numberOfElements: res.data.numberOfElements,
        totalElements: res.data.totalElements,
        isFirst: res.data.first,
        isLast: res.data.last,
        currentPage: res.data.number,
        totalPages: res.data.totalPages - 1,
        pageSize: res.data.size,
      };
    },

    fullPath(val) {
      const target = _.cloneDeep(this.query);
      target.page = val;
      return { path: '/admin/accounts', query: target };
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
      const complimentedEOB = endOfBlock > total + 2 ? total + 2 : endOfBlock;
      return _.range(startOfBlock, complimentedEOB);
    },
  },

  beforeRouteUpdate(to, from, next) {
    next();
    this.beforeLoadPage();
  },
};
</script>
