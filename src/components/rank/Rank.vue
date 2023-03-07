<template>
  <div class="black-bg" v-if="modalOpen == true">
    <button id="exit" v-on:click="modalOpen = false">X</button>
    <div class="white-bg">
      <h3>🥇이번주 아테네 학당</h3>
      <div class="collection">
        <div class="collection-item row" v-for="one in list" :key="one.id">
          <span class="col s10">
            <span>[{{ one.nickname }}]님이 &nbsp;&nbsp; </span>
            <span>{{ one.count }}개의 지식력 획득</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getRank } from '@/api/rank';

export default {
  created() {
    this.loadPage();
  },
  data: () => ({
    modalOpen: true,
    list: [],
  }),
  methods: {
    async loadPage() {
      const res = await getRank();
      const result = res.data;
      console.log(result);
      this.list = res.data;
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
  width: 50%;
  height: 47%;
  right: 50%;
  background: rgba(0, 0, 0, 0.5);
  position: center;
  padding: 10px;
}

.white-bg {
  width: 85%;
  background: white;
  border-radius: 15px;
  padding: 20px;
}

.collection-item row {
  color: #0dcaf0;
}
</style>
