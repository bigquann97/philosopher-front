<template>
  <div>
    <div class="container">
      <div class="row s1">
        <div class="col s3">
          <h5 class="board">
            <b>추천한 댓글</b>
          </h5>
        </div>
        <div class="col s3 offset-s5"></div>
        <div class="col s1"></div>
      </div>
      <div class="collection">
        <div
          class="collection-item row"
          v-for="one in list"
          :key="one.id"
          @click.prevent
        >
          <span class="col s6">
            <div v-dompurify-html="one.content"></div>
          </span>
        </div>
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
import { getRecommendedComments } from '@/api/account';

export default {
  created() {
    this.beforeLoadPage();
  },

  data: () => ({
    pagination: {},
    list: [],
    blockSize: 5,
    query: {},
  }),

  methods: {
    beforeLoadPage() {
      this.query = this.$route.query;
      if (this.query.page === undefined) {
        this.$router.replace({
          path: '/recommendedComments',
          query: { page: 1 },
        });
      } else {
        this.loadPage();
      }
    },

    async loadPage() {
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res = await getRecommendedComments(query);
      const result = res.data;
      this.list = result.content;
      this.pagination = {
        numberOfElements: result.numberOfElements,
        totalElements: result.totalElements,
        isFirst: result.first,
        isLast: result.last,
        currentPage: result.number,
        totalPages: result.totalPages,
        pageSize: result.size,
      };
    },

    fullPath(val) {
      const target = _.cloneDeep(this.query);
      target.page = val;
      return { path: '/recommendedComments', query: target };
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
.board {
  width: 160%;
  margin-left: 30px;
  margin-top: 30px;
}
</style>
