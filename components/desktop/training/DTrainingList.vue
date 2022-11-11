<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING.TITLE')"
      :subtitle="$t('TRAINING.SUBTITLE')"
      :image="'/images/banner-training.png'"
    />

    <v-container>
      <section class="training-container">
        <v-row>
          <v-col cols="12" class="training">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/training')"
                ></i>
                {{ $t('TRAINING.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col
                v-for="training of training_list"
                :key="training.id"
                cols="4"
              >
                <DArticleCard
                  :data="training"
                  :detail_path="`/training/detail?type=${type}`"
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
    name: 'DTrainingList',
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
        type: this.$route.query.type,
        training_list: [],
      }
    },
    async mounted() {
      await this.getTraining()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { type: this.type, page: this.page })
        await this.getTraining()
      },
      async getTraining() {
        let res = await this.$store.dispatch('training/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
          type: this.type,
        })

        this.training_list = res.data.data.map((data) => {
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
  .training-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .training-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>