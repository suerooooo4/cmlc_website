<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_DOCUMENT.TITLE')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-document.png'"
    />

    <v-container>
      <section class="training-document-container">
        <v-row>
          <v-col cols="12" class="training-document">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/training-video-document')"
                ></i>
                {{ $t('TRAINING_DOCUMENT.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col
                v-for="document of training_document"
                :key="document.id"
                cols="4"
              >
                <DArticleCard
                  :data="document"
                  :detail_path="'/training-document/detail'"
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
    name: 'DTrainingDocument',
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
        training_document: [],
      }
    },
    async mounted() {
      await this.getTrainingDocument()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getTrainingDocument()
      },
      async getTrainingDocument() {
        let res = await this.$store.dispatch('training_document/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.training_document = res.data.data.map((data) => {
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
  .training-document-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .training-document-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>
