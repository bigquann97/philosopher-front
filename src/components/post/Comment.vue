<template>
  <div>
    <div>
      <div class="col s6 right-align">
        <div style="text-align: center; margin: 20px auto 20px auto">
          <v-btn>
            댓글쓰기
          </v-btn>
        </div>
      </div>
      <div class="collection">
        <div
          tag="a"
          :to="{ name: 'Comment', params: { id: one.id }, query: query }"
          class="collection-item row"
          v-for="one in list"
          :key="one.id"
        >
          <div class="col s7">
            <span style="float: left"># {{ one.commentId }}</span>
            <span style="float: left; margin: auto 20px">
              {{ one.nickname }}
            </span>
            <span style="float: left">{{ one.createDate }}</span>
          </div>
          <span class="col s8">
            <span>{{ one.opinion }}</span>
          </span>
          <span class="col s9">
            {{ one.content }}
          </span>
          <small class="col s1 center-align">{{ one.recommendCount }}</small>
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
import { fetchThreadComment } from '@/api/comment';
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
    beforeLoadPage() {
      const threadId = this.$route.params.id;
      this.query = this.$route.query;
      this.search = {
        word: this.query.word !== undefined ? this.query.word : '',
      };
      if (this.query.page === undefined) {
        this.$router.push({
          path: `/comments/thread/${threadId}`,
          query: { page: 1 },
        });
      } else {
        this.loadPage();
      }
    },

    async loadPage() {
      const threadId = this.$route.params.id;
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res = await fetchThreadComment(threadId, query);
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
      const threadId = this.$route.params.id;
      const target = _.cloneDeep(this.query);
      target.page = val;
      console.log();
      return { path: `/comments/thread/${threadId}`, query: target };
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
