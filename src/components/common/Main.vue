<template>
  <div class="main">
    <img class="upper-img" src="@/image/athens.png" alt="" />
    <div class="main_container">
      <div class="first-row">
        <div class="board1">
          <div class="board-name"><h3>TODAY'S POST</h3></div>
          <div class="row">
            <router-link
              style="color: black"
              :to="{
                name: 'Post',
                params: { id: post.id },
                query: { page: 1 },
              }"
              tag="a"
              v-for="post in list1.slice(0, 6)"
              :key="post.id"
            >
              <div class="main_title">
                <span
                  ><span>[{{ post.category }}]</span>
                  {{ post.title }}
                </span>
                <div class="comment">
                  <img src="@/image/thumbs-up.png" alt="" />
                  <span>{{ post.recommendCount }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="board2">
          <div class="board-name"><h3>TODAY'S THREAD</h3></div>
          <div class="row">
            <router-link
              style="color: black"
              :to="{
                name: 'Thread',
                params: { id: thread.id },
                query: { page: 1 },
              }"
              tag="a"
              v-for="thread in list2.slice(0, 6)"
              :key="thread.id"
            >
              <div class="main_title">
                <span
                  ><span>[{{ thread.category }}]</span>
                  {{ thread.title }}
                  <span class="red-text">
                    [ {{ thread.commentCount }} ]
                  </span></span
                >
                <div class="comment">
                  <img src="@/image/thumbs-up.png" alt="" />
                  <span>{{ thread.recommendCount }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="second-row">
        <div class="board1">
          <div class="board-name"><h3>HOT THREADS</h3></div>
          <div class="row">
            <router-link
              style="color: black"
              :to="{
                name: 'Thread',
                params: { id: threadRcmnd.id },
                query: { page: 1 },
              }"
              tag="a"
              v-for="threadRcmnd in list3.slice(0, 6)"
              :key="threadRcmnd.id"
            >
              <div class="main_title">
                <span
                  ><span>[{{ threadRcmnd.category }}]</span>
                  {{ threadRcmnd.title }}
                  <span class="red-text">
                    [ {{ threadRcmnd.commentCount }} ]
                  </span></span
                >
                <div class="comment">
                  <img src="@/image/thumbs-up.png" alt="" />
                  <span>{{ threadRcmnd.recommendCount }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="board2">
          <div class="board-name"><h3>ARCHIVED</h3></div>
          <div class="row">
            <router-link
              style="color: black"
              :to="{
                name: 'Thread',
                params: { id: archivedThread.id },
                query: { page: 1 },
              }"
              tag="a"
              v-for="archivedThread in list4.slice(0, 6)"
              :key="archivedThread.id"
            >
              <div class="main_title">
                <span
                  ><span>[{{ archivedThread.category }}]</span>
                  {{ archivedThread.title }}
                  <span class="red-text">
                    [ {{ archivedThread.commentCount }} ]
                  </span></span
                >
                <div class="comment">
                  <img src="@/image/thumbs-up.png" alt="" />
                  <span>{{ archivedThread.recommendCount }}</span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <img class="lower-img" src="@/image/nbc.png" alt="" />
  </div>
</template>
<script>
import qstr from 'query-string';
import { fetchThreadList } from '@/api/thread';
import { fetchArchivedThreadList } from '@/api/thread';
import { fetchPostList } from '@/api/post';

export default {
  created() {
    this.loadPage();
  },

  data: () => ({
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    query: {},
  }),
  methods: {
    async loadPage() {
      const query =
        this.$route.query.page !== undefined
          ? qstr.stringify(this.$route.query)
          : 'page=1';
      const res1 = await fetchPostList(query);
      const res2 = await fetchThreadList(query);
      const res3 = await fetchThreadList('page=1&sort=RCMND');
      const res4 = await fetchArchivedThreadList(query);
      this.list1 = res1.data.content;
      this.list2 = res2.data.content;
      this.list3 = res3.data.content;
      this.list4 = res4.data.content;
    },
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.loadPage();
  },
};
</script>
<style>
/* 이하 main */

.upper-img {
  width: 100%;
  margin: 0px auto 50px;
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
  height: 62px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.board-name h3 {
  margin-left: 30px;
  font-size: 18px;
  font-weight: bold;
}

.main_title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 10px;
  font-size: 16px;
  border-bottom: 1px solid rgb(211, 211, 211);
}

.main_title span:hover {
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
</style>
