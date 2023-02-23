<template>
  <div class="container">
    <div class="section">
      <h3>
        {{ detail.title }}
      </h3>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div>
        닉네임 : <a>{{ detail.nickname }}</a>
      </div>
      <span style="font-size: medium; float: right">
        시작일 : {{ detail.createdDate }}
      </span>
      <div>추천수 : {{ detail.recommendCount }}</div>
      <span style="font-size: medium; float: right">
        종료일 : {{ detail.endDate }}
      </span>
      <div>카테고리 : {{ detail.category }}</div>
    </div>
    <div class="divider"></div>
    <div>
      <span
        >1. {{ detail.opinions[0] }} 2.{{ detail.opinions[1] }} 3.
        {{ detail.opinions[2] }}</span
      >
    </div>
    <div class="section">
      <img :src="imageUrl" alt="" style="max-width: 300px; max-height: 300px" />
      <div>{{ detail.content }}</div>
    </div>
    <div style="text-align: center; margin-bottom: 20px">
      <a>
        <img
          src="@/image/like_blue.png"
          alt=""
          style="width: 35px"
          @click="recommend"
        />
        <span style="font-size: xx-large"> {{ detail.recommendCount }}</span>
      </a>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div v-show="commentWriteForm">
        <select class="browser-default" name="opinions" v-model="opinions">
          <option value=""> 의견을 선택해주세요.</option>
          <option :value="detail.opinions[0]">
            {{ detail.opinions[0] }}
          </option>
          <option :value="detail.opinions[1]">{{ detail.opinions[1] }}</option>
          <option :value="detail.opinions[2]">{{ detail.opinions[2] }}</option>
        </select>
        <v-textarea
          solo
          auto-grow
          v-model="content"
          label="여기에 댓글을 입력하세요. #번호로 멘션을 할 수 있습니다."
        ></v-textarea>
        <a
          @click="createComment"
          class="btn col s2"
          style="background-color: white; float: right"
          >확인</a
        >
        <a
          @click="closeCommentWriteForm"
          class="btn col s2"
          style="background-color: white; float:right;"
          >닫기</a
        >
      </div>
      <a
        v-show="commentWrite"
        @click="commentWrite2"
        class="btn col s2"
        style="background-color: white; float: right;"
        >댓글작성</a
      >
    </div>
    <div class="section">
      <div class="row">
        <div class="collection">
          <div
            tag="a"
            :to="{ name: 'Comment', params: { id: one.id }, query: query }"
            class="collection-item row"
            v-for="one in list"
            :key="one.id"
          >
            <div class="col s1" style="width: 100%">
              <span style="float: left"># {{ one.commentId }}</span>
              <span style="float: left; margin: auto 20px">
                {{ one.nickname }}
              </span>
              <span style="float: left">{{ one.createDate }}</span>
              <div v-for="three in one.mentionedComments" :key="three.id">
                <v-tooltip top :close-delay="500" :open-delay="300">
                  <template v-slot:activator="{ on }" class="col s8">
                    <span
                      @mouseenter="on.mouseenter"
                      @mouseleave="on.mouseleave"
                      style="float: left; margin-left: 12px; color: blue; font-size: small"
                    >
                      >>{{ three.id }}
                    </span>
                  </template>
                  <template v-slot:default>
                    <div style="max-width: 500px">{{ three.content }}</div>
                  </template>
                </v-tooltip>
              </div>
            </div>
            <div class="col s2" style="width: 100%">
              <span>{{ one.opinion }}</span>
            </div>
            <div
              v-for="three in one.mentioningComments"
              :key="three.id"
              class="col s3"
              style="width: 100%"
            >
              <v-tooltip top :close-delay="500" :open-delay="300">
                <template v-slot:activator="{ on }">
                  <u
                    @mouseenter="on.mouseenter"
                    @mouseleave="on.mouseleave"
                    style="float: left; color: blue; font-size: small"
                  >
                    # {{ three.id }}
                  </u>
                </template>
                <template v-slot:default>
                  <div style="max-width: 500px">{{ three.content }}</div>
                </template>
              </v-tooltip>
            </div>
            <div style="float:left; width: 100%" class="col s4">
              <span>
                {{ one.content }}
              </span>
            </div>
            <div
              class="col s5"
              style="text-align: center; margin-bottom: 20px; width: 100%"
            >
              <a>
                <img
                  src="@/image/like_blue.png"
                  alt=""
                  style="width: 15px"
                  @click="recommend"
                />
                <span style="font-size: medium"> {{ one.recommendCount }}</span>
              </a>
            </div>
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
  </div>
</template>

<script>
import {
  createRecommendThread,
  deleteRecommendThread,
} from '@/api/recommendation';
import { fetchThread } from '@/api/thread';
import qstr from 'query-string';
import {
  createComment,
  deleteComment,
  fetchThreadComment,
} from '@/api/comment';
import _ from 'lodash';

export default {
  components: {},

  props: ['id'],

  async created() {
    this.beforeLoadPage();
    const threadId = this.$route.params.id;
    const res = await fetchThread(threadId);
    console.log(this.id);
    this.detail = res.data;
    this.imageUrl = res.data.images[0];
    console.log(res);
  },
  data: () => ({
    comment: '',
    opinions: '',
    content: '',
    opinion: '',
    commentWriteForm: false,
    commentWrite: true,
    modifyForm: false,
    dialog: false,
    dialog2: false,
    check: false,
    detail: {
      user: {},
    },
    imageUrl: {},
    pagination: {},
    search: {},
    list: [],
    blockSize: 5,
    query: {},
  }),
  methods: {
    async commentWrite2() {
      this.commentWriteForm = true;
      this.commentWrite = false;
    },
    async closeCommentWriteForm() {
      this.commentWriteForm = false;
      this.commentWrite = true;
    },
    async createComment() {
      try {
        await createComment(this.id, {
          opinion: this.opinions,
          content: this.content,
        });
        this.dialog = false;
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.log(error.response);
      }
    },
    async deleteComment() {
      try {
        await deleteComment(this.id);
        this.dialog = false;
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        console.log(error.response);
      }
    },
    async recommend() {
      try {
        const res = await deleteRecommendThread(this.id);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        const res = await createRecommendThread(this.id);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      }
    },
    beforeLoadPage() {
      const threadId = this.$route.params.id;
      const query = { ...this.$route.query };
      if (query.page === undefined) {
        query.page = 1;
        this.$router.push({
          path: `/comments/thread/${threadId}`,
          query,
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
      const complimentedEOB = endOfBlock > total + 2 ? total + 1 : endOfBlock;
      return _.range(startOfBlock, complimentedEOB);
    },
  },

  beforeRouteUpdate(to, from, next) {
    next();
    this.beforeLoadPage();
  },
};
</script>
