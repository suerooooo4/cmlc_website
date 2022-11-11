<template>
  <div>
    <DArticleBanner
      :title="$t('MEMBER_GROUP_PORTFOLIO.TITLE')"
      :image="'/images/banner-member-group.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="
                    openPage('/member-group/portfolio', {
                      member_group_id: member_group_id,
                      page: previous_page,
                    })
                  "
                ></i>
                {{ $t('MEMBER_GROUP_PORTFOLIO.HEADER') }}
              </span>
            </h2>

            <v-row v-if="portfolio">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ portfolio.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(portfolio.name_th, portfolio.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${portfolio.image}`"
                    alt="content-image"
                    class="content-image"
                  />
                  <v-card
                    color="#F8F7F6"
                    class="pl-7 pr-7 pt-2 pb-3 rounded-lg"
                    elevation="5"
                  >
                    <div
                      class="content-detail"
                      v-html="$lang(portfolio.detail_th, portfolio.detail_en)"
                    ></div>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

  export default {
    name: 'DMemberGroupPortfolioDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.member_group_portfolio.page,
        member_group_id: this.$route.query.member_group_id,
        portfolio: null,
      }
    },
    mounted() {
      this.getPortfolio()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
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
  .content-container {
    padding: 25px 0 150px;

    .content-date,
    .content-detail {
      margin-bottom: 5px;
    }

    .content-date {
      color: #b2b2b2;
      font-size: 14px;
    }

    .content-title {
      font-size: 26px;
      margin-bottom: 15px;
    }

    .content-image {
      width: 100%;
      margin-bottom: 15px;
    }
  }
</style>
