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
    <Comment></Comment>
  </div>
</template>

<script>
import {
  createRecommendThread,
  deleteRecommendThread,
} from '@/api/recommendation';
import { fetchThread } from '@/api/thread';
import Comment from '@/components/post/Comment.vue';

export default {
  components: {
    Comment,
  },

  props: ['id'],

  async created() {
    const threadId = this.$route.params.id;
    const res = await fetchThread(threadId);
    console.log(this.id);
    this.detail = res.data;
    this.imageUrl = res.data.images[0];
    console.log(res);
  },
  data: () => ({
    detail: {
      user: {},
    },
    imageUrl: {},
  }),
  methods: {
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
  },
};
</script>
