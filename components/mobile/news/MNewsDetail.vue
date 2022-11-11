<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click="openPage('/news', { page: previous_page })">
          <i class="back"></i>
        </v-btn>
        <a class="link"  @click="openPage('/news', { page: previous_page })"
          >{{ $t('NEWS.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>
    <div v-if="news">
      <section class="date">{{ news.created_at }}</section>
      <section class="content">
        <h1 class="content__title">{{ $lang(news.name_th, news.name_en) }}</h1>
        <div class="content__image">
          <img :src="`${image_url}${news.image}`" alt="content-image" />
        </div>
        <div
          v-html="$lang(news.detail_th, news.detail_en)"
          class="content__html"
        ></div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MNewsDetail',
/*   props: ['id'], */
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getNews()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      news: null,
      id: this.$route.query.id,
    }
  },
  async mounted() {
    await this.getNews()
    await this.updateTotalView()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getNews() {
      let res = await this.$store.dispatch('news/find', this.id)
      this.news = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('news/updateTotalView', this.id)
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  padding: 12px;
}
.header {
  &__topbar {
    color: #001538;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 6px;
      border-radius: 6px;
      background: #000;
      position: absolute;
      bottom: -11px;
      left: 0;
    }
    .link {
      color: #001538;
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #ccc;
    padding: 0;
  }
}
.date {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 1rem;
}

.content {
  &__title {
    font-size: 22px;
    color: #001538;
  }
  &__image > img {
    max-width: 100%;
    object-fit: cover;
  }
  &__html {
    color: #001538;
  }
}

.recommend {
  margin-left: -12px;
  padding-left: 12px;
  width: 100vw;
  background: #f8f7f6;

  &__title {
    padding-top: 12px;
    font-size: 22px;
    color: #001538;
  }
}
</style>
