<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click="openPage('/training-portfolio/list', {page: previous_page,})">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="openPage('/training-portfolio/list', {page: previous_page,})"
          >{{ $t('TRAINING_PORTFOLIO.ALL.TITLE') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="content" v-if="training_portfolio">
      <h1 class="content__title">
        {{ $lang(training_portfolio.name_th, training_portfolio.name_en) }}
      </h1>
      <div class="content__subtitle">
        <!-- <span class="group">กลุ่มดอกคำใต้</span> -->
        <span class="date">{{ training_portfolio.created_at }}</span>
      </div>

      <div v-if="training_portfolio.video_file" class="content__video">
        <video width="400" controls>
          <source
            :src="`${video_url}${training_portfolio.video_file}`"
            type="video/mp4"
          />
        </video>
      </div>

      <div v-else class="content__image">
        <img
          :src="`${image_url}${training_portfolio.image}`"
          alt="content-image"
        />
      </div>

      <div
        v-html="
          $lang(training_portfolio.detail_th, training_portfolio.detail_en)
        "
        class="content__html"
      ></div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MTrainingPortfolioDetail',
  /* props: ['id'], */
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getTrainingPortfolio()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      video_url: process.env.video_url,
      training_portfolio: null,
      id: this.$route.query.id,
    }
  },
  async mounted() {
    await this.getTrainingPortfolio()
    await this.updateTotalView()
  },
  methods: {
     openPage(path, query = null) {
        this.$router.push({ path, query })
      },
    async getTrainingPortfolio() {
      let res = await this.$store.dispatch('training_portfolio/find', this.id)
      this.training_portfolio = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('training_portfolio/updateTotalView', this.id)
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

.content {
  margin-top: 1rem;
  &__video {
    widows: 100%;
    margin-left: -12px;
  }
  &__image > img {
    max-width: 100%;
    object-fit: cover;
  }
  &__subtitle {
    font-size: 12px;
    color: #8c8c8c;
    .group {
      color: #001538;
      padding-right: 1rem;
    }
  }
  &__title {
    font-size: 22px;
    color: #001538;
  }
  &__html {
    margin-top: 1rem;
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
