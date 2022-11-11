<template>
  <div>
    <DArticleBanner
      :title="$t('COURSE_LAW.TITLE')"
      :subtitle="$t('COURSE_LAW.SUBTITLE')"
      :image="'/images/banner-course-law.png'"
    />

    <v-container>
      <section class="law-container">
        <v-row>
          <v-col cols="12" class="law">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/course-law')"
                ></i>
                {{
                  law_list.length
                    ? $lang(
                        law_list[0].law_category.name_th,
                        law_list[0].law_category.name_en
                      )
                    : $t('COURSE_LAW.LAW')
                }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="law of law_list" :key="law.id" cols="4">
                <DArticleCard :data="law" :detail_path="'/law/detail'" />
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
    name: 'DLaw',
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
        law_list: [],
        law_category_id: this.$route.query.law_category_id,
      }
    },
    async mounted() {
      await this.getLaw()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getLaw()
      },
      async getLaw() {
        let res = await this.$store.dispatch('law/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
          law_category_id: this.law_category_id,
        })

        this.law_list = res.data.data.map((data) => {
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
  .law-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .law-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>
