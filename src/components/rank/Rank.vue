<template>
  <div>
    <h3>랭킹 페이지입니다.</h3>
    <div class="black-bg" v-if="openModal == true">
      <div class="white-bg">
        <h4>상세페이지</h4>
        <p>상세페이지내용임</p>
        <button class="close">닫기</button>
      </div>
    </div>
        <div class="collection">
          <div
            class="collection-item row"
            v-for="one in list"
            :key="one.id"
            @click.prevent
          >
            <span class="col s6">
              <span>[{{ one.nickname }}] </span>
              <span>{{ one.count }}</span>
            </span>
          </div>
        </div>
        <div>
  </div>
</template>

<script>
import { getRank } from '@/api/rank';

export default {
  created() {
    this.loadPage();
  },
  data: () => ({
    list: [],
    openModal: false,
  }),
  methods: {
    async loadPage() {
      const res = await getRank();
      const result = res.data;
      console.log(result);
      this.list = res.data.content;
    },
  },
};
</script>
<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
}
.white-bg {
  width: 90%;
  margin: 80px auto;
  background: white;
  border-radius: 5px;
  padding: 20px 0;
}
.close {
  cursor: pointer;
  border: none;
  background: #6667ab;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 15px;
}
.close:hover {
  color: white;
  font-weight: bold;
  transform: scale(1.1);
  transition: all 0.5s;
}
</style>
