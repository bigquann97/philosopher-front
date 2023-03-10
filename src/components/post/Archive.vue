<template>
  <div class="container">
    <div class="section">
      <div class="col s6">
        <b class="board-title">아카이브</b>
        <br />
        <small>토론이 끝난 쓰레드를 저장해놓는 아카이브입니다.</small>
      </div>
      <h5>
        <b>
          {{ detail.title }}
        </b>
      </h5>
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
      <div>의견 목록 :</div>
      <div v-if="detail.opinions[0] !== ''">
        <div>{{ detail.opinions[0] }}</div>
      </div>
      <div v-if="detail.opinions[1] !== ''">
        <div>{{ detail.opinions[1] }}</div>
      </div>
      <div v-if="detail.opinions[2] !== ''">
        <div>{{ detail.opinions[2] }}</div>
      </div>
      <div v-if="detail.opinions[3] !== ''">
        <div>{{ detail.opinions[3] }}</div>
      </div>
      <div v-if="detail.opinions[4] !== ''">
        <div>{{ detail.opinions[4] }}</div>
      </div>
    </div>
    <div class="section">
      <img :src="imageUrl" alt="" style="max-width: 300px; max-height: 300px" />
      <img
        :src="imageUrl1"
        alt=""
        style="max-width: 300px; max-height: 300px"
      />
      <img
        :src="imageUrl2"
        alt=""
        style="max-width: 300px; max-height: 300px"
      />
      <div v-html="detail.content"></div>
    </div>
    <div style="text-align: center; margin-bottom: 20px">
      <a>
        <img
          src="@/image/like_blue.png"
          alt=""
          style="width: 35px"
          @click="recommendThread"
        />
        <span style="font-size: xx-large"> {{ detail.recommendCount }}</span>
      </a>
    </div>
    <v-dialog v-model="threadReportDialog" width="500px">
      <v-card height="420">
        <v-card-title>
          신고하기
        </v-card-title>
        <v-card-text>
          <select
            class="browser-default"
            name="reportCategory"
            v-model="reportCategory"
          >
            <option value=""> 신고 카테고리를 선택해주세요.</option>
            <option value="ABUSE">욕설</option>
            <option value="IRRELEVANT">게시글 취지와 상관없는 게시글</option>
            <option value="ADVERTISEMENT">광고</option>
            <option value="SEXUAL_HARASSMENT"> 성희롱</option>
            <option value="SPAMMER">도배</option>
          </select>
          <v-textarea
            v-model="reportContent"
            height="200"
            solo
            auto-grow
            label="여기에 신고할 내용을 입력하세요."
          ></v-textarea>
          <a
            @click="confirmReportThread"
            class="btn col s2"
            style="background-color: white; float: right"
            >확인</a
          >
          <a
            @click="closeReportForm"
            class="btn col s2"
            style="background-color: white; float:right;"
            >취소</a
          >
          <p class="log">{{ logMessageSignup }}</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="divider"></div>
    <div class="section">
      <div class="row">
        <div class="collection">
          <h5>댓글 통계 📊</h5>
          <hr />
          <div
            tag="a"
            :to="{ name: 'Ratio', params: { id: ratio.id } }"
            class="collection-item row"
            v-for="ratio in ratios"
            :key="ratio.id"
          >
            <span>
              의견
              <span style="font-weight: bold; color:#3108a4;"
                >"{{ ratio.opinion }}"</span
              >
              에 대한 토론 참여자의 비율은
              <span style="font-weight: bold; color:#0f5132"
                >{{ ratio.ratio }}%</span
              >
              입니다.
            </span>
          </div>
          <h5>Top 3 베스트 댓글 💡</h5>
          <hr />
          <div
            tag="a"
            :to="{ name: 'Favorite', params: { id: fav.id } }"
            class="collection-item row"
            v-for="fav in favs"
            :key="fav.id"
          >
            <div class="col s1" style="width: 100%">
              <span style="float: left"
                ><img src="@/image/best.png" alt="" style="width: 30px"
              /></span>
              <span style="float: left; margin: auto 10px"># {{ fav.id }}</span>
              <span style="float: left; margin: auto 20px">
                {{ fav.nickname }}
              </span>
              <span style="float: left; margin: auto 20px">{{
                fav.createDate
              }}</span>
              <span style="float: left; font-size: medium">
                <img src="@/image/like_blue.png" alt="" style="width: 15px" />
                {{ fav.likeCount }}
              </span>
            </div>
            <div>
              <div class="col s2" style="width: 100%">
                <span style="color: #0f5132; font-weight: bold">의견: </span>
                <span>{{ fav.opinion }}</span>
              </div>
              <div style="float:left; width: 100%" class="col s4">
                <span style="color: #0f5132; font-weight: bold">내용: </span>
                <div v-html="fav.content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <div v-if="one.status === 'DELETED'">
              삭제된 댓글 입니다.
            </div>
            <div v-if="one.status === 'BLINDED'">
              블라인드 처리된 댓글 입니다.
            </div>
            <div v-if="one.status === 'ACTIVE'">
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
                      <div
                        v-html="three.content"
                        style="max-width: 500px"
                      ></div>
                    </template>
                  </v-tooltip>
                </div>
              </div>
              <div>
                <div class="col s2" style="width: 100%">
                  <span>{{ one.opinion }}</span>
                </div>
                <div v-for="three in one.mentioningComments" :key="three.id">
                  <v-tooltip top :close-delay="500" :open-delay="300">
                    <template v-slot:activator="{ on }">
                      <span
                        @mouseenter="on.mouseenter"
                        @mouseleave="on.mouseleave"
                        style="float: left; color: blue; font-size: small; margin-left: 12px"
                      >
                        #{{ three.id }}
                      </span>
                    </template>
                    <template v-slot:default>
                      <div
                        v-html="three.content"
                        style="max-width: 500px"
                      ></div>
                    </template>
                  </v-tooltip>
                </div>
                <div style="float:left; width: 100%" class="col s4">
                  <div v-html="one.content"></div>
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
                      @click="recommendComment(one.commentId)"
                    />
                    <span style="font-size: medium">
                      {{ one.recommendCount }}</span
                    >
                  </a>
                </div>
                <div
                  class="card-action right-align"
                  v-if="$store.state.username === one.nickname"
                ></div>
              </div>
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
  createRecommendComment,
  createRecommendThread,
  deleteRecommendComment,
  deleteRecommendThread,
} from '@/api/recommendation';
import qstr from 'query-string';
import { fetchThreadComment, fetchFavComment, fetchRatio } from '@/api/comment';
import _ from 'lodash';
import { fetchThread } from '@/api/thread';

export default {
  props: ['id'],

  async created() {
    try {
      this.beforeLoadPage();
      const threadId = this.$route.params.id;
      const res = await fetchThread(threadId);
      console.log(this.id);
      this.detail = res.data;
      this.imageUrl = res.data.images[0];
      this.imageUrl1 = res.data.images[1];
      this.imageUrl2 = res.data.images[2];
      console.log(res);
    } catch (error) {
      alert(error.response.data.message);
      await this.$router.push('/threads');
    }
  },
  data: () => ({
    list: {
      commentId: '',
      nickname: '',
      opinion: '',
      content: '',
      createDate: '',
      status: '',
      recommendCount: '',
      mentioningComments: [],
      mentionedComments: [],
    },
    modifyContent: '',
    commentEditandDeleteButton: true,
    commentEditForm: false,
    commentWriteForm: false,
    commentWriteButton: true,
    comment: '',
    modifyOpinions: '',
    opinions: '',
    opinion: '',
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
    blockSize: 5,
    query: {},
    ratios: {
      opinion: '',
      ratio: '',
    },
    favs: {
      id: '',
      nickname: '',
      opinion: '',
      content: '',
      createDate: '',
      likeCount: '',
    },
  }),
  methods: {
    async recommendComment(commentId) {
      try {
        const res = await createRecommendComment(commentId);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        const res = await deleteRecommendComment(commentId);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      }
    },
    async recommendThread() {
      try {
        const res = await createRecommendThread(this.id);
        console.log(res);
        this.$router.go(this.$router.currentRoute);
      } catch (error) {
        const res = await deleteRecommendThread(this.id);
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
      const favorite = await fetchFavComment(threadId);
      const ratio = await fetchRatio(threadId);
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
      this.favs = favorite.data;
      this.ratios = ratio.data;
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
<style>
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
</style>
