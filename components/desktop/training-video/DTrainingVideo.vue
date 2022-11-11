<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_VIDEO.TITLE')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video.png'"
    />

    <v-container>
      <section class="training-video-container">
        <v-row>
          <v-col cols="12" class="training-video">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/training-video-document')"
                ></i>
                {{ $t('TRAINING_VIDEO.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="video of training_video" :key="video.id" cols="4">
                <DArticleCard
                  :data="video"
                  :detail_path="'/training-video/detail'"
                  :duration="video.duration"
                  :total_view="video.total_view"
                  :training="'training_video'"
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
    name: 'DTrainingVideo',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
        training_playlist_id: this.$route.query.id,
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        per_page: 9,
        last_page: 0,
        total: 0,
        training_video: [],
      }
    },
    async mounted() {
      await this.getTrainingVideo()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getTrainingVideo()
      },
      async getTrainingVideo() {
        let res = await this.$store.dispatch('training_video/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
          training_video_playlist_id:await this.training_playlist_id
        })

        this.training_video = res.data.data.map((data) => {
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
  .training-video-container {
    padding: 25px 0 150px;

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .training-video-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>
