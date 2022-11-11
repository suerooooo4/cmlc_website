<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_VIDEO.TITLE')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/training-video-document/playlist',{training_playlist_id:training_video.training_video_playlist_id})"
                ></i>
                {{ $t('TRAINING_VIDEO.HEADER') }}
              </span>
            </h2>

            <v-row v-if="training_video">
              <v-col>
                <div>
                  <h2 class="content-title">
                    {{ $lang(training_video.name_th, training_video.name_en) }}
                  </h2>

                  <video width="100%" height="100%" controls>
                    <source
                      :src="`${video_url}${training_video.video_file}`"
                      type="video/mp4"
                    />
                  </video>
                  <v-card
                    color="#F8F7F6"
                    class="mt-3 pl-7 pr-7 pt-2 pb-3 rounded-lg"
                    elevation="5"
                  >
                    <v-row class="mt-5 mb-3">
                      <v-col>
                        <p class="trainer-name">
                          <span>{{ $t('TRAINING_VIDEO_DETAIL.TRAINER') }}</span>
                          <span>{{
                            $lang(
                              training_video.trainer_name_th,
                              training_video.trainer_name_en
                            )
                          }}</span>
                        </p>

                        <p class="publish-date">
                          <span>
                            {{ $t('TRAINING_VIDEO_DETAIL.PUBLISH_DATE') }}
                          </span>
                          <span>{{ training_video.created_at }}</span>
                        </p>
                      </v-col>

                      <v-col class="text-right">
                         <v-btn
                            @click.prevent="downloadItem(
                            url=`${download_training_video_url}`+training_video.id
                          )"
                            depressed
                            large
                            color="error"
                            class="btn-download"
                          >
                          {{ $t('TRAINING_VIDEO_DETAIL.DOWNLOAD_DOCUMENT') }}
                          <i class="fa fa-file-download"></i>
                          </v-btn>

                        <p class="total-download">
                          {{
                            $t('TRAINING_VIDEO_DETAIL.TOTAL_DOWNLOAD').replace(
                              '%s',
                              training_video.total_download
                            )
                          }}
                        </p>

                        <!-- <p
                          v-if="!$store.state.user.user_id"
                          class="warning-login"
                        >
                          {{ $t('SHARED.OTHER.WARNING_LOGIN') }}
                        </p> -->
                      </v-col>
                    </v-row>

                    <div
                      class="content-detail"
                      v-html="
                        $lang(
                          training_video.detail_th,
                          training_video.detail_th
                        )
                      "
                    ></div>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import Swal from 'sweetalert2'

  export default {
    name: 'DTrainingVideoDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        document_url: process.env.document_url,
        video_url: process.env.video_url,
        download_training_video_url: process.env.download_training_video_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.training_video.page,
        training_video: null,
      }
    },
    async mounted() {
      await this.getVideo()
      await this.updateTotalView()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getVideo() {
        let res = await this.$store.dispatch('training_video/find', this.id)
        this.training_video = res.data
      },
      async updateTotalView() {
        await this.$store.dispatch('training_video/updateTotalView', this.id)
      },
      async downloadItem(url) {
        if (!this.$store.state.user.user_id) {
          Swal.fire({
            text: this.$t(`SHARED.OTHER.WARNING_LOGIN`),
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
          })
        } else {
            const a = document.createElement('a')
            a.href = url
            a.download = url.split('/').pop()
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)        
            await this.$store.dispatch(
              'training_video/updateTotalDownload',
              this.id
            )
            await this.getVideo()
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .content-container {
    padding: 25px 0 150px;

    .content-detail {
      margin-bottom: 5px;
    }

    .content-title {
      font-size: 26px;
      margin-bottom: 15px;
    }

    .trainer-name,
    .publish-date {
      span:first-child {
        font-weight: bold;
      }

      span:last-child {
        color: #8c8c8c;
      }
    }

    .btn-download {
      i.fa {
        margin-left: 15px;
        font-size: 20px;
      }
    }

    .total-download {
      margin: 10px 0;
      font-size: 14px;
      color: #b2b2b2;
    }

    .warning-login {
      font-size: 14px;
      color: #f00;
    }
  }
</style>
