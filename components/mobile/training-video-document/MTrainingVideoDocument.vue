<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING_VIDEO_DOCUMENT.TITLE')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video-document.png'"
    />

    <section class="show training-video">
      <v-row>
        <v-col cols="1">
          <img
            src="/images/training/icon-video.png"
            alt="supportor-image"
            width="30"
            class="mr-2"
          />
        </v-col>
        <v-col cols="11">
          <span class="show__title">
            <i class="fa fa-chevron-left"
            @click="openPage('/training-video-document')"
            ></i>{{
            $t('TRAINING_VIDEO_DOCUMENT.VIDEO')
          }}</span>
          <hr />
        </v-col>
        <v-col cols="6" v-for="item in training_video" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training-video/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :duration="item.duration"
            :total_view="item.total_view"
          />
        </v-col>
      </v-row>
       <div v-if="mode_open_video" class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn depressed color="primary" @click="modeOpenVideo">
          {{ $t('TRAINING_VIDEO_DOCUMENT.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>
    <!-- <v-dialog v-model="video_detail_dialog" fullscreen hide-overlay>
      <MTrainingVideoDetail
        :id="dialog_video_id"
        @detail_dialog="closeVideoDetailDialog"
      />
    </v-dialog> -->

    <!-- <v-dialog v-model="document_detail_dialog" fullscreen hide-overlay>
      <MTrainingDocumentDetail
        :id="dialog_document_id"
        @detail_dialog="closeDocumentDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MTrainingVideoDetail from '~/components/mobile/training-video/MTrainingVideoDetail.vue'
  import MTrainingDocumentDetail from '~/components/mobile/training-document/MTrainingDocumentDetail.vue'
  export default {
    name: 'MTrainingVideoDocument',
    components: {
      MTrainingVideoDetail,
      MTrainingDocumentDetail,
      MArticleBanner,
      MArticleCard
    },
    data() {
      return {
        training_playlist_id: this.$route.query.training_playlist_id,
        image_url: process.env.image_url,
        video_detail_dialog: false,
        dialog_video_id: null,
        document_detail_dialog: false,
        dialog_document_id: null,
        training_video: [],
        perPage: 4,
        mode_open_video: true,
      }
    },
    async mounted() {
      await this.getTrainingVideo()
    },
    methods: {
    modeOpenVideo() {
      this.perPage = null
      this.mode_open_video = false
      this.getTrainingVideo()
    },
      openVideoDialog(id) {
        this.video_detail_dialog = true
        this.dialog_video_id = id
      },
      openDocumentDialog(id) {
        this.document_detail_dialog = true
        this.dialog_document_id = id
      },
      openPage(path) {
        this.$router.push({ path: path })
      },
      closeVideoDetailDialog(value) {
        this.video_detail_dialog = value
      },
      closeDocumentDetailDialog(value) {
        this.document_detail_dialog = value
      },
      async getTrainingVideo() {
        let res = await this.$store.dispatch('training_video/pagination', {
          page: 1,
          perPage: this.perPage,
          orderBy: 'created_at',
          isDesc: true,
          training_video_playlist_id: await this.training_playlist_id,
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
  .show {
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
  .training-video {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('/images/training/bg-video.png');
    margin: 12px -12px 12px -12px;
    padding: 12px;
  }
  .training-document {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('/images/training/bg-paper.png');
    margin: 0 -12px -12px -12px;
    padding: 0 12px 12px 12px;
  }
</style>
