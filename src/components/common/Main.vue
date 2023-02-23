<template>
  <div class="container">
    <img class="upper-img" src="@/image/athens.png" alt="" />
    <div class="row">
      <div class="board1" style="float:left; width: 50%">
        <div class="board-name"><h3>TODAY'S POST</h3></div>
        <div class="title">
          <span>공룡은 치킨인가?</span>
          <div class="comment">
            <img src="@/image/thumbs-up.png" alt="" />
            <span>311</span>
          </div>
        </div>
        <div class="title">
          <span>닭이 먼저임 알이 먼저임?</span>
          <div class="comment">
            <img src="@/image/thumbs-up.png" alt="" />
            <span>321</span>
          </div>
        </div>
        <div class="title">
          <span>팥붕 vs 슈붕</span>
          <div class="comment">
            <img src="@/image/thumbs-up.png" alt="" />
            <span>364</span>
          </div>
        </div>
        <div class="title">
          <span>민초 vs 반민초</span>
          <div class="comment">
            <img src="@/image/thumbs-up.png" alt="" />
            <span>132</span>
          </div>
        </div>
        <div class="title">
          <span>깻잎 젓가락으로 들어주는 게 왜 안됨??</span>
          <div class="comment">
            <img src="@/image/thumbs-up.png" alt="" />
            <span>114</span>
          </div>
        </div>
        <div class="title">
          <span>쌀떡 vs 밀떡</span>
          <div class="comment">
            <img src="@/image/thumbs-up.png" alt="" />
            <span>491</span>
          </div>
        </div>
      </div>

      <div class="board2" style="float:left; width: 50%">
        <div class="board-name"><h3>TODAY'S THREAD</h3></div>
        <div class="row">
          <router-link
            style="color: black"
            :to="{ name: 'Thread', params: { id: one.id }, query: { page: 1 } }"
            tag="a"
            v-for="one in list.slice(0, 6)"
            :key="one.id"
          >
            <div class="title">
              <span
                >{{ one.title }}
                <span class="red-text"> [ {{ one.commentCount }} ] </span></span
              >
              <div class="comment">
                <img src="@/image/thumbs-up.png" alt="" />
                <span>{{ one.recommendCount }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="board1" style="float:left; width: 50%">
        <div class="board-name"><h3>WEEKLY THREAD</h3></div>
        <div class="title">
          <span>전애인 결혼식 간다 vs 안간다</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>342</span>
          </div>
        </div>
        <div class="title">
          <span>5억년 버튼 누르고 천만원 vs 안누르고 그냥 살기</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>123</span>
          </div>
        </div>
        <div class="title">
          <span>갤럭시 vs 아이폰</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>453</span>
          </div>
        </div>
        <div class="title">
          <span>민초 vs 반민초</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>121</span>
          </div>
        </div>
        <div class="title">
          <span>엄마 vs 아빠</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>432</span>
          </div>
        </div>
        <div class="title">
          <span>닭이 먼저임 알이 먼저임?</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>213</span>
          </div>
        </div>
      </div>

      <div class="board2" style="float:left; width: 50%">
        <div class="board-name"><h3>ARCHIVE</h3></div>
        <div class="title">
          <span>전애인 결혼식 간다 vs 안간다</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>234</span>
          </div>
        </div>
        <div class="title">
          <span>닭이 먼저임 알이 먼저임?</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>342</span>
          </div>
        </div>
        <div class="title">
          <span>이과 vs 문과</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>435</span>
          </div>
        </div>
        <div class="title">
          <span>영원히 끝나지 않는 싸움</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>221</span>
          </div>
        </div>
        <div class="title">
          <span>식욕 vs 수면욕</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>234</span>
          </div>
        </div>
        <div class="title">
          <span>갤럭시 vs 아이폰</span>
          <div class="comment">
            <img src="@/image/comment.png" alt="" />
            <span>453</span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <img class="lower-img" src="@/image/nbc.png" alt="" />
    </div>
  </div>
</template>
<script>
import qstr from 'query-string';
import { fetchThreadList } from '@/api/thread';

export default {
  created() {
    this.loadPage();
  },

  data: () => ({
    list: [],
    query: {},
  }),
  methods: {
    async loadPage() {
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res = await fetchThreadList(query);
      console.log(res);
      this.list = res.data.content;
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.loadPage();
  },
};
</script>
<style>
 {
  box-sizing: border-box;
}

.company-name {
  width: 25%;
  display: flex;
  align-items: center;
}

.company-name a {
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  color: #111111;
  display: flex;
  align-items: center;
  margin-right: 3px;
}

.company-name a img {
  width: 50px;
  border-radius: 50%;
}

/*  */

.menu {
  width: 50%;
}

.menu ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
}

.menu li a {
  white-space: nowrap;
  font-size: 1.1rem;
  text-decoration: none;
  color: #111111;
  padding: 0 20px;
}

.menu li a:hover {
  color: dodgerblue;
}

.navbar {
  width: 25%;
}

.navbar ul {
  display: flex;
  float: right;
  list-style-type: none;
}

.navbar li a {
  white-space: nowrap;
  font-size: 1.1rem;
  margin-right: 10px;
  text-decoration: none;
  color: dodgerblue;
  padding: 6px 12px;
}

.navbar li a:hover {
  color: rgb(0, 17, 168);
}

/* 이하 main */

.upper-img {
  width: 100%;
  margin: 0 auto 50px;
}

.first-row {
  display: flex;
  justify-content: space-between;
}

.second-row {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.board1,
.board2 {
  /* background-color: #f1f1f1; */
  flex: 50%;
}

.board1 {
  padding-right: 25px;
}

.board2 {
  padding-left: 25px;
}

.board-name {
  border: 1px solid rgb(208, 236, 255);
  background-color: rgb(208, 236, 255);
  border-radius: 10px;
  margin-bottom: 20px;
}

.board-name h3 {
  margin-left: 30px;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(211, 211, 211);
}

.title span:hover {
  color: dodgerblue;
}

.comment {
  display: flex;
  align-items: center;
}

.comment img {
  width: 20px;
}

.comment span {
  margin-top: 0;
  margin-bottom: 0;
  width: 10px;
  font-size: 0.9rem;
  margin-left: 10px;
  margin-right: 16px;
}

.noborder {
  margin-top: 10px;
  padding-bottom: 5px;
  margin-left: 15px;
  margin-right: 15px;
}

.lower-img {
  margin-top: 40px;
  margin-bottom: 30px;
  width: 100%;
}

footer {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f1f1f1;
  padding: 5px;
}

footer div p {
  line-height: 0.5rem;
  font-size: 0.9rem;
}

footer a img {
  width: 60px;
  border-radius: 50%;
}
</style>
