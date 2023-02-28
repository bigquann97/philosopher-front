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
        작성일 : {{ detail.modifiedDate }}
      </span>
      <div>추천수 : {{ detail.recommendCount }}</div>
      <div>카테고리 : {{ detail.category }}</div>
    </div>
    <div class="divider"></div>
    <div>
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
      <div>{{ detail.content }}</div>
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
    <div class="divider"></div>
  </div>
</template>

<script>
import { fetchPost } from '@/api/post';

export default {
  props: ['id'],

  async created() {
    const postId = this.$route.params.id;
    const res = await fetchPost(postId);
    console.log(this.id);
    this.detail = res.data;
    this.imageUrl = res.data.images[0];
    console.log(res);
  },
  data: () => ({
    detail: [],
  }),
  methods: {},
};
</script>
