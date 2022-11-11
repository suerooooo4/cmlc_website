<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING_PORTFOLIO.TITLE')"
      :subtitle="$t('TRAINING_PORTFOLIO.SUBTITLE')"
      :image="'/images/banner-training-portfolio.png'"
    />
    <section class="latest_work">
      <h1 class="latest_work__title">
        {{ $t('TRAINING_PORTFOLIO.LATEST.TITLE') }}
      </h1>
    </section>
    <section class="slider">
      <v-sheet class="mx-auto">
        <v-slide-group active-class="success" center-active show-arrows>
          <v-slide-item
            v-for="item in training_portfolio_latest"
            :key="item.id"
          >
            <div class="ma-4" style="max-width: 220px">
              <v-row>
                <v-col cols="12">
                  <MArticleCard            
                    :data="item" :detail_path="'/training-portfolio/detail'"
                    :image_path="image_url + item.image"
                    :subtitle="item.created_at"
                    :title="$lang(item.name_th, item.name_en)"
                    :detail="$lang(item.detail_th, item.detail_en)"
                    :total_view="item.total_view"
                    :is_read_more="true"
                  />
                </v-col>
              </v-row>
            </div>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>
    <section class="recommend pb-3">
      <h1 class="recommend__title">
        {{ $t('TRAINING_PORTFOLIO.RECOMMEND.TITLE') }} 
      </h1>
        <v-container v-if="training_portfolio_recommend.length">
          <v-card
            class="training-portfolio-recommend-mobile" 
          >
          <v-carousel
            cycle
            height="160"
            hide-delimiter-background
            :show-arrows="false"
          >
            <v-carousel-item
              v-for="portfolio_recommend of training_portfolio_recommend"
              :key="portfolio_recommend.id"
              @click="openPage('/training-portfolio/detail',{id:portfolio_recommend.id})"
            >
              <v-sheet
                height="100%"
              >
                <v-row justify="center" align="center">
                  <v-col cols="6" class="pa-0">
                    <v-img
                      height="140"
                      :src="`${image_url}${portfolio_recommend.image}`"
                    />
                  </v-col>
                  <v-col cols="6">
                    <div class="recommend__content">
                        <h1
                          class="recommend__content-title"
                        >
                        {{
                          $lang(
                          portfolio_recommend.name_th,
                          portfolio_recommend.name_en
                          )
                        }}
                        </h1>
                      <div class="recommend__content-detail"
                        >     
                        {{
                          $lang(
                          portfolio_recommend.detail_th,
                          portfolio_recommend.detail_en
                          )
                        }}
                      </div>
                      <p class="recommend__content-date">15/02/2564</p>
                    </div>
                  </v-col>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-container>
    </section> 
    <section class="performance">
      <v-row>
        <v-col cols="12">
          <span class="performance__title">{{
            $t('TRAINING_PORTFOLIO.ALL.TITLE')
          }}</span>
          <hr />
        </v-col>
        <v-col cols="6" v-for="item in training_portfolio" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training-portfolio/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :total_view="item.total_view"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn
          depressed
          color="primary"
          @click="openPage('training-portfolio/list')"
        >
          {{ $t('TRAINING_PORTFOLIO.ALL.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>
    <!-- <v-dialog
      v-model="training_portfolio_detail_dialog"
      fullscreen
      hide-overlay
    >
      <MTrainingPortfolioDetail
        :id="dialog_training_portfolio_id"
        @detail_dialog="closeTrainingPortfolioDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MTrainingPortfolioDetail from '~/components/mobile/training-portfolio/MTrainingPortfolioDetail.vue'
  export default {
    name: 'MTrainingPortfolio',
    components: {
      MArticleCard,
      MArticleBanner,
      MTrainingPortfolioDetail,
    },
    data() {
      return {
        training_portfolio_detail_dialog: false,
        dialog_training_portfolio_id: null,
        image_url: process.env.image_url,
        training_portfolio_recommend: [],
        training_portfolio: [],
        training_portfolio_latest: [],
      }
    },
    async mounted() {
      await this.getTrainingRecommend()
      await this.getTrainingAll()
      this.getTrainingLatest()
    },
    methods: {
      openTrainingPortfolioDialog(id) {
        this.training_portfolio_detail_dialog = true
        this.dialog_training_portfolio_id = id
      },
      openPage(path, query = null) {
      this.$router.push({ path, query })
      },
      closeTrainingPortfolioDetailDialog(value) {
        this.training_portfolio_detail_dialog = value
      },
      async getTrainingRecommend() {
        let res = await this.$store.dispatch('training_portfolio/recommend', {
          page: 1,
          perPage: 6,
          orderBy: 'created_at',
          isDesc: true,
          is_recommend:1,
        })

          this.training_portfolio_recommend = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
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
  .latest_work {
    width: 100vw;
    height: 30px;
    margin-top: 13px;
    margin-left: -12px;
    text-align: center;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }

    &__detail {
      font-size: 12px;
      padding: 0px 20px;
    }
  }
  .recommend {
    width: 100vw;
    margin-top: 13px;
    margin-left: -12px;
    background: #f8f7f6;
    text-align: center;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }
    .row {
      padding: 0 12px 0 12px;

      .col {
        .thumbnail-video {
          position: relative;
          img {
            max-width: 100%;
            height: 150px;
            object-fit: cover;
          }
          .v-btn {
            position: absolute;
            left: 37%;
            top: 37%;
            i.play {
              width: 30px;
              height: 30px;
            }
          }
        }
        .recommend__content {
          text-align: left;
          margin-top: 10px;
          &-title {
            font-size: 16px;
            color: #001538;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &-subtitle { 
            font-size: 12px;
            color: #001538;
          }
          &-detail,
          &-date {
            font-size: 12px;
            margin: 0;
            color: #b2b2b2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
  .performance {
    margin-top: 2rem;

    &__title {
      font-size: 1rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }
    &__content {
      .content-hot:not(:first-child) {
        margin-top: -12px;
      }
      margin-top: 15px;
      h2 {
        font-size: 14px;
        padding-left: 7px;
        color: #001538;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .date {
        color: #b2b2b2;
        font-size: 12px;
        padding-left: 7px;
        margin-bottom: 0;
      }
      .detail {
        color: #b2b2b2;
        font-size: 12px;
        padding: 0 7px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .submit {
      color: #001538 !important;
      border: 1px solid #001538 !important;
      background-color: transparent !important;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ccc;
      padding: 0;
    }
  }
  .training-portfolio-recommend-mobile {
    border-radius: 10px;
  
    .v-image {
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
  }
</style>

<style lang="scss">
.recommend{
  .v-btn--icon.v-size--small .v-icon, .v-btn--fab.v-size--small .v-icon {
    height: 12px;
    font-size: 12px;
    width: 12px;
    margin-top: 1rem;
  }
  .v-btn > .v-btn__content .v-icon {
    color: #c7c2be;;
  }
  .v-carousel__controls__item .v-icon {
    opacity: 1;
  }
  .v-btn--icon.v-size--small {
    height: 12px;
    width: 12px;
  }
  .mdi:before, .mdi-set {
    font-size: 12px;
  }
}
</style>