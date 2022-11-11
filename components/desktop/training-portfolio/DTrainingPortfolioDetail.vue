<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_PORTFOLIO.TITLE')"
      :subtitle="$t('TRAINING_PORTFOLIO.SUBTITLE')"
      :image="'/images/banner-training-portfolio.png'"
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
                    openPage('/training-portfolio/list', {
                      page: previous_page,
                    })
                  "
                ></i>
                {{ $t('TRAINING_PORTFOLIO.ALL.TITLE') }}
              </span>
            </h2>

            <v-row v-if="training_portfolio">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ training_portfolio.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{
                      $lang(
                        training_portfolio.name_th,
                        training_portfolio.name_en
                      )
                    }}
                  </h2>

                  <video
                    v-if="training_portfolio.video_file"
                    width="100%"
                    height="100%"
                    controls
                  >
                    <source
                      :src="`${video_url}${training_portfolio.video_file}`"
                      type="video/mp4"
                    />
                  </video>

                  <img
                    v-else
                    :src="`${image_url}${training_portfolio.image}`"
                    alt="content-image"
                    class="content-image"
                  />
                  <v-card
                    color="#F8F7F6"
                    class="mt-3 pl-7 pr-7 pt-2 pb-3 rounded-lg"
                    elevation="5"
                  >
                    <div
                      class="content-detail"
                      v-html="
                        $lang(
                          training_portfolio.detail_th,
                          training_portfolio.detail_en
                        )
                      "
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
    name: 'DTrainingPortfolioDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        video_url: process.env.video_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.training_portfolio.page,
        training_portfolio: null,
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
