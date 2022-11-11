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
          <v-col cols="12" class="news">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/news-activity')"
                ></i>
                {{ $t('NEWS.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="news of news_list" :key="news.id" cols="4">
                <DArticleCard :data="news" :detail_path="'/news/detail'" />
              </v-col>
            </v-row>
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
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

  export default {
    name: 'DNews',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        per_page: 9,
        last_page: 0,
        total: 0,
        news_list: [],
      }
    },
    async mounted() {
      await this.getNews()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getNews()
      },
      async getNews() {
        let res = await this.$store.dispatch('news/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.news_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
      },
    },
  }
</script>

<style scoped lang="scss">
  .news-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>
