<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_VIDEO_DOCUMENT.TITLE')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video-document.png'"
    />

    <!-- <v-container> -->
    <section class="training-video-container training-video">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/training-video-document')"
                ></i><span> {{ $t('TRAINING_VIDEO_DOCUMENT.VIDEO') }}</span>
            </h2>

            <v-row>
              <v-col
                v-for="trainingVideo of training_video"
                :key="trainingVideo.id"
                cols="4"
              >
                <DArticleCard
                  :data="trainingVideo"
                  :detail_path="'/training-video/detail'"
                  :duration="trainingVideo.duration"
                  :total_view="trainingVideo.total_view"
                  :training="'training_video'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-row class="mt-5">
         <v-col  class="text-center">
          <v-btn @click="openPage('/training-video',{id:training_playlist_id})" large color="primary">
            {{ $t('TRAINING_VIDEO_DOCUMENT.ACTION_MORE') }}
          </v-btn>
        </v-col>
      </v-row>
    </section>

   
    <!-- </v-container> -->
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

  export default {
    name: 'DTrainingVideoDocument',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
        training_video: [],
        training_playlist_id: this.$route.query.training_playlist_id
      }
    },
    async mounted() {
      await this.getTrainingVideo()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getTrainingVideo() {
        let res = await this.$store.dispatch('training_video/pagination', {
          page: 1,
          perPage: 6,
          orderBy: 'created_at',
          isDesc: true,
          training_video_playlist_id:await this.training_playlist_id
        })

        this.training_video = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .training-video-container {
    padding: 50px 0;
  }

  .training-document-container {
    padding: 25px 0 150px;
  }

  .training-video {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('/images/training/bg-video.png');
  }

  .training-document {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('/images/training/bg-paper.png');
  }
</style>
