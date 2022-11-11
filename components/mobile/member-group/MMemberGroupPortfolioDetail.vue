<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click.native="$emit('detail_dialog', false)">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="$emit('detail_dialog', false)"
          >{{ $t('MEMBER_GROUP_PORTFOLIO.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="content" v-if="portfolio">
      <div class="content__subtitle">
        <!-- <span class="group">กลุ่มดอกคำใต้</span> -->
        <span class="date">{{ portfolio.created_at }}</span>
      </div>
      <h1 class="content__title">
        {{ $lang(portfolio.name_th, portfolio.name_en) }}
      </h1>
      <div class="content__image">
        <img :src="`${image_url}${portfolio.image}`" alt="content-image" />
      </div>
      <div
        v-html="$lang(portfolio.detail_th, portfolio.detail_en)"
        class="content__html"
      ></div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MMemberGroupPortfolioDetail',
  props: ['id'],
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getPortfolio()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      portfolio: null,
    }
  },
  async mounted() {
    await this.getPortfolio()
    await this.updateTotalView()
  },
  methods: {
    async getPortfolio() {
      let res = await this.$store.dispatch(
        'member_group_portfolio/find',
        this.id
      )
      this.portfolio = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch(
        'member_group_portfolio/updateTotalView',
        this.id
      )
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
  &__image > img {
    max-width: 100%;
    object-fit: cover;
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
