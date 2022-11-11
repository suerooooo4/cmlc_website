<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_PORTFOLIO.TITLE')"
      :subtitle="$t('TRAINING_PORTFOLIO.SUBTITLE')"
      :image="'/images/banner-training-portfolio.png'"
    />

    <section class="portfolio-latest">
      <v-container>
        <h2 class="latest-title">
          {{ $t('TRAINING_PORTFOLIO.LATEST.TITLE') }}
        </h2>

        <v-row>
          <v-col
            v-for="latest of training_portfolio_latest"
            :key="latest.id"
            cols="6"
          >
            <DArticleCard
              :data="latest"
              :detail_path="'/training-portfolio/detail'"
              :training="'training_portfolio_latest'"
            />
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section v-if="training_portfolio_recommend" class="portfolio-recommend">
      <v-container>
        <h2 class="recommend-title">
          {{ $t('TRAINING_PORTFOLIO.RECOMMEND.TITLE') }}
        </h2>

        <v-row>
        <v-col cols="6" class="mb-5"  
          v-for="portfolio_recommend of training_portfolio_recommend"
          :key="portfolio_recommend.id" >
            <v-card class="hover-card training-portfolio-card pa-0">
              <v-row>
                <v-col class="pt-0 pb-0" cols="5">
                  <v-img
                    @click="
                      openPage('/training-portfolio/detail', {
                        id: portfolio_recommend.id,
                      })
                    "
                    height="200px"
                    :src="`${image_url}${portfolio_recommend.image}`"
                    alt="training-portfolio-recommend-image"
                  />
                </v-col>
                
                <v-col>
                  <p
                    @click="
                      openPage('/training-portfolio/detail', {
                        id: portfolio_recommend.id,
                      })
                    "
                    class="topic"
                  >
                    {{
                      $lang(
                        portfolio_recommend.name_th,
                        portfolio_recommend.name_en
                      )
                    }}
                  </p>

                  <p class="detail">
                    {{
                      $lang(
                        portfolio_recommend.detail_th,
                        portfolio_recommend.detail_en
                      )
                    }}
                  </p>
                  <v-card-actions class="pl-0">
                    <div><span>{{ portfolio_recommend.created_at }}</span></div>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col> 
        </v-row>
         <div class="pagination">
          <v-pagination
            v-model="page"
            @input="changePage()"
            :length="last_page"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-container>
    </section>

    <section class="portfolio-all">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                {{ $t('TRAINING_PORTFOLIO.ALL.TITLE') }}
              </span>
            </h2>

            <v-row>
              <v-col
                v-for="portfolio of training_portfolio"
                :key="portfolio.id"
                cols="4"
              >
                <DArticleCard
                  :data="portfolio"
                  :detail_path="'/training-portfolio/detail'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn
              @click="openPage('/training-portfolio/list')"
              large
              color="primary"
            >
              {{ $t('TRAINING_PORTFOLIO.ALL.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

  export default {
    name: 'DTrainingPortfolio',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
        image_url: process.env.image_url,
        training_portfolio_recommend: [],
        training_portfolio: [],
        training_portfolio_latest: [],
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        last_page: 0,
        perPage: 2,
      }
    },
    async mounted() {
      await this.getTrainingRecommend()
      await this.getTrainingAll()
      this.getTrainingLatest()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
         async changePage() {
        this.openPage('', { page: this.page })
        await this.getTrainingRecommend()
      },
      async getTrainingRecommend() {
        let res = await this.$store.dispatch('training_portfolio/recommend', {
          page: this.page,
          perPage: this.perPage,
          orderBy: 'created_at',
          isDesc: true,
          is_recommend:1,
        })

          this.training_portfolio_recommend = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.last_page = res.data.lastPage
      },
      async getTrainingAll() {
        let res = await this.$store.dispatch('training_portfolio/pagination', {
          page: 1,
          perPage: 6,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.training_portfolio = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
      getTrainingLatest() {
        this.training_portfolio_latest.push(this.training_portfolio[0])
        this.training_portfolio_latest.push(this.training_portfolio[1])
      },
    },
  }
</script>

<style scoped lang="scss">
  .portfolio-latest {
    padding: 25px 0 50px;

    .latest-title {
      margin: 30px 0 60px;
      font-size: 36px;
      text-align: center;
    }
  }

  .portfolio-recommend {
    padding: 25px 0 75px;
    background: #f8f7f6;

    .recommend-title {
      margin: 30px 0 60px;
      font-size: 36px;
      text-align: center;
    }

    img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      object-position: center;
      cursor: pointer;
    }

    .topic {
      font-weight: bold;
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

      .detail {
      white-space: nowrap;
      overflow: hidden;
       width: 280px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 14;
      -webkit-box-orient: vertical;
    }
       .pagination {
        margin-top: 50px;
    }
  }

  .portfolio-all {
    padding: 30px 0 150px;
  }

  .training-portfolio-card {
    border-radius: 16px;
  }
  .training-portfolio-card .v-image {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
</style>

<style lang="scss">
    .pagination .v-pagination {
      justify-content: end;
    }
</style>