<template>
  <div>
    <DArticleBanner
      :title="$t('NEWS_ACTIVITY.TITLE')"
      :subtitle="$t('NEWS_ACTIVITY.SUBTITLE')"
      :image="'/images/banner-news-activity.png'"
    />

    <v-container>
      <section class="news-container">
        <v-row>
          <v-col cols="8" class="latest-news">
            <h2 class="section-title">
              <span>{{ $t('NEWS_ACTIVITY.NEWS') }}</span>
            </h2>

            <v-row>
              <v-col v-for="news of latest_news" :key="news.id" cols="6">
                <DArticleCard :data="news" :detail_path="'/news/detail'" />
              </v-col>
            </v-row>
          </v-col>

          <v-col col="4" class="top-news">
            <h2 class="section-title">
              <span>{{ $t('NEWS_ACTIVITY.HOT') }}</span>
            </h2>

            <v-row>
              <v-col cols="12">
                <v-row v-for="(topNews, index) of top_news" :key="topNews.id">
                  <v-col cols="3">
                    <span class="top-news-no">{{ `0${index + 1}` }}</span>
                  </v-col>

                  <v-col cols="9">
                    <p class="top-news-date">{{ topNews.created_at }}</p>

                    <p
                      @click="openPage('/news/detail', { id: topNews.id })"
                      class="top-news-topic"
                    >
                      {{ $lang(topNews.name_th, topNews.name_en) }}
                    </p>

                    <p class="top-news-detail">
                      {{ $lang(topNews.detail_th, topNews.detail_en) }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn @click="openPage('/news')" large color="primary">
              {{ $t('NEWS_ACTIVITY.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </section>

     
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

  export default {
    name: 'DNewsActivity',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
        top_news: [],
        latest_news: [],
        activity_list: [],
      }
    },
    async mounted() {
      await this.getTopNews()
      await this.getLatestNews()
      await this.getActivity()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getTopNews() {
        let res = await this.$store.dispatch('news/pagination', {
          page: 1,
          perPage: 5,
          orderBy: 'total_view',
          isDesc: true,
        })

        this.top_news = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
      async getLatestNews() {
        let res = await this.$store.dispatch('news/pagination', {
          page: 1,
          perPage: 4,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.latest_news = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
      async getActivity() {
        let res = await this.$store.dispatch('activity/pagination', {
          page: 1,
          perPage: 6,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.activity_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .news-container {
    padding: 15px 0;

    .top-news {
      padding-left: 50px;

      .top-news-no {
        font-size: 48px;
        line-height: 48px;
        color: #b2b2b2;
      }

      .top-news-date,
      .top-news-topic,
      .top-news-detail {
        margin-bottom: 5px;
      }

      .top-news-date,
      .top-news-detail {
        font-size: 14px;
        color: #b2b2b2;
      }

      .top-news-topic,
      .top-news-detail {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .top-news-topic {
        font-weight: bold;
        font-size: 18px;
        -webkit-line-clamp: 1;
        cursor: pointer;
      }

      .top-news-detail {
        -webkit-line-clamp: 2;
      }
    }
  }

  .activity-container {
    padding: 25px 0 150px;
  }
</style>
