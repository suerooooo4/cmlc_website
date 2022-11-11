<template>
  <div>
    <DArticleBanner
      :title="$t('ARTICLE.TITLE')"
      :subtitle="$t('ARTICLE.SUBTITLEARTICLE')"
      :image="'/images/banner-course-law.png'"
    />

    <v-container>
      <section class="article-container">
        <v-row>
          <v-col cols="12" class="article">
            <h2 class="section-title">
              <span>
               <img
                class="pr-2"
                width="40"
                src="/images/course-law/article.png"
              />
                {{ $t('ARTICLE.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="article of article_list" :key="article.id" cols="4">
                <DArticleCard
                  :data="article"
                  :detail_path="'/article/detail'"
                />
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
    name: 'DArticle',
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
        article_list: [],
      }
    },
    async mounted() {
      await this.getArticle()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getArticle()
      },
      async getArticle() {
        let res = await this.$store.dispatch('article/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.article_list = res.data.data.map((data) => {
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
  .article-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .article-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>
