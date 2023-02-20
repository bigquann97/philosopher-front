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
      <div>{{ detail.content }}</div>
    </div>
    <div style="text-align: center; margin-bottom: 20px" @click="recommend">
      <v-btn>
        <img src="@/image/thumbs-up.png" alt="" style="width: 35px" />
        <span style="font-size: xx-large"> {{ detail.recommendCount }}</span>
      </v-btn>
    </div>
    <div class="divider"></div>
    <div v-for="(item, $index) in list" :key="$index">
      <!-- Hacker News item loop -->
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import qstr from 'query-string';
import axios from '../../libs/axios.custom';

export default {
  components: {},

  props: ['id'],

  async created() {
    const res = await axios.get(`/api/threads/${this.id}`);
    this.detail = res.data;
    console.log(res);
  },
  data: () => ({
    detail: {
      user: {},
    },
    page: 1,
    list: [],
  }),
  methods: {
    infiniteHandler($state) {
      axios
        .get(`/api/comments/thread/${this.id}`, {
          params: {
            page: this.page,
          },
        })
        .then(({ data }) => {
          if (data.hits.length) {
            this.page += 1;
            this.list.push(...data.hits);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
    toModify() {
      const query = qstr.stringify(this.$route.query);
      this.$router.push(`/board/${this.id}/modify?${query}`);
    },
    async recommend() {
      try {
        await axios.post(`/api/recommendations/thread/${this.id}`);
      } catch (error) {
        console.log(error);
      }
    },

    toList() {
      this.$router.push({ path: '/threads', query: this.$route.query });
    },
  },

  computed: {
    authorized() {
      return this.$store.getters.username === this.detail.user.username;
    },
  },
};
</script>
