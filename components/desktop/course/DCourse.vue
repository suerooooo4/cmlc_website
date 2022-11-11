<template>
  <div>
    <DArticleBanner
      :title="$t('COURSE.TITLE')"
      :subtitle="$t('COURSE.SUBTITLECOURSE')"
      :image="'/images/banner-course-law.png'"
    />

    <v-container>
      <section class="course-container">
        <v-row>
          <v-col cols="12" class="course">
            <h2 class="section-title">
              <span>
             <img
                class="pr-2"
                width="40"
                src="/images/course-law/course.png"
              />
                {{ $t('COURSE.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="course of course_list" :key="course.id" cols="4">
                <DArticleCard :data="course" :detail_path="'/course/detail'" />
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
    name: 'DCourse',
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
        course_list: [],
      }
    },
    async mounted() {
      await this.getCourse()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getCourse()
      },
      async getCourse() {
        let res = await this.$store.dispatch('course/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.course_list = res.data.data.map((data) => {
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
  .course-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .course-container {
    padding: 25px 0 150px;

    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>
