<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_TRAINING.TITLE')"
      :image="'/images/banner-media-training.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="
                    openPage('/media-training/playlist', {
                      media_playlist_id: media.media_playlist_id,
                    })
                  "
                ></i>
                {{ $t('MEDIA_TRAINING.TITLE') }}
              </span>
            </h2>

            <v-row v-if="media">
              <v-col>
                <div>
                  <v-row>
                    <v-col>
                      <span class="media-label">
                        {{ $t('MEDIA_TRAINING.CREATOR') }}:
                      </span>

                      <span class="media-value">
                        {{
                          $lang(media.creator_name_th, media.creator_name_en)
                        }}
                      </span>
                    </v-col>

                    <!--           <v-col class="text-right">
                      {{
                        $lang(
                          media.media_branch.name_th,
                          media.media_branch.name_en
                        )
                      }}
                    </v-col> -->
                  </v-row>

                  <div class="media-player-container">
                    <div v-if="media.media_category_id == 1">
                      <div class="media-images">
                        <DCarousel
                          :starting-image="0"
                          :images="media.media_image"
                        />
                      </div>
                    </div>

                    <div v-else-if="media.media_category_id == 2">
                      <div class="media-audio">
                        <audio controls>
                          <source
                            :src="`${audio_url}${media.audio_file}`"
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>

                    <div v-else-if="media.media_category_id == 3">
                      <div class="media-video">
                        <video width="100%" height="100%" controls>
                          <source
                            :src="`${video_url}${media.video_file}`"
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>

                    <div v-else-if="media.media_category_id == 4">
                      <div class="media-document">
                        <img
                          :src="`${image_url}${media.image}`"
                          alt="media-image"
                        />
                      </div>
                    </div>
                  </div>
                  <v-card
                    color="#F8F7F6"
                    class="pl-7 pr-7 pt-5 pb-3 rounded-lg"
                    elevation="5"
                  >
                    <v-row>
                      <v-col>
                        <p class="media-creator">
                          <span class="media-label">
                            {{ $t('MEDIA_TRAINING.TOPIC') }}:
                          </span>

                          <span class="media-value">
                            {{ $lang(media.title_th, media.title_en) }}
                          </span>
                        </p>

                        <p class="media-creator">
                          <span class="media-label">
                            {{ $t('MEDIA_MASTER.NAME') }}:
                          </span>

                          <span class="media-value">
                            {{ $lang(media.name_th, media.name_en) }}
                          </span>
                        </p>

                        <p class="media-keyword">
                          <span class="media-label">
                            {{ $t('MEDIA_TRAINING.KEYWORD') }}:
                          </span>

                          <span class="media-value">
                            {{ $lang(media.keyword_th, media.keyword_en) }}
                          </span>
                        </p>

                        <p class="media-publish-date">
                          <span class="media-label">
                            {{ $t('MEDIA_TRAINING.PUBLISH_DATE') }}:
                          </span>

                          <span class="media-value">
                             {{ callDate(media.publish_date.slice(0, 10)) }}
                          </span>
                        </p>
                      </v-col>

                      <v-col class="text-right">
                          <v-btn
                            @click.prevent="downloadItem(
                            url=`${download_url}`+media.id
                          )"
                            depressed
                            large
                            color="error"
                            class="btn-download"
                          >
                            {{ $t('MEDIA_MASTER.DOWNLOAD') }}
                            <i class="fa fa-file-download"></i>
                          </v-btn>

                        <p class="total-download">
                          {{
                            $t('MEDIA_TRAINING.TOTAL_DOWNLOAD').replace(
                              '%s',
                              media.total_download
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
                      class="media-detail"
                      v-html="$lang(media.detail_th, media.detail_en)"
                    ></div>

                    <p class="media-location">
                      <span class="media-label">
                        {{ $t('MEDIA_TRAINING.LOCATION') }}:
                      </span>

                      <span class="media-value">
                        {{ $lang(media.location_th, media.location_en) }}
                      </span>
                    </p>

                    <div
                      v-if="
                        $lang(
                          media.co_creator_name_th,
                          media.co_creator_name_en
                        ) != null &&
                        $lang(
                          media.co_creator_name_th,
                          media.co_creator_name_en
                        ) != '-'
                      "
                    >
                      <p class="media-co-creator">
                        <span class="media-label">
                          {{ $t('MEDIA_TRAINING.CO_CREATOR') }}:
                        </span>

                        <span class="media-value">
                          {{
                            $lang(
                              media.co_creator_name_th,
                              media.co_creator_name_en
                            )
                          }}
                        </span>
                      </p>
                    </div>
                  </v-card>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
      <div v-if="media_pdf.media_category_id == 4" class="m-auto">
        <iframe
          :src="`${document_url}${media_pdf.document_file}`"
          frameborder="0"
          width="900px"
          height="1144px"
        >
        </iframe>
      </div>
    </v-container>
  </div>
</template>

<script>
import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
import DCarousel from '~/components/desktop/shared/DCarousel.vue'
import Swal from 'sweetalert2'

export default {
  name: 'DMediaTrainingDetail',
  components: {
    DArticleBanner,
    DCarousel,
  },
  data() {
    return {
      image_url: process.env.image_url,
      audio_url: process.env.audio_url,
      video_url: process.env.video_url,
      document_url: process.env.document_url,
      download_url: process.env.download_url,
      id: this.$route.query.id,
      previous_page: this.$store.state.media_training.page,
      media: null,
      media_pdf: [],
    }
  },
  async mounted() {
    await this.getMedia()
    await this.updateTotalView()
    await this.getMediaUrl()
  },
  methods: {
      callDate(date) {
      const datethai = new Date(date)
      const result = datethai.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      return result
    },
    async getMediaUrl() {
      let res = await this.$store.dispatch('media_master/find', this.id)
      this.media_pdf = res.data
    },
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getMedia() {
      let res = await this.$store.dispatch('media_training/find', this.id)
      this.media = res.data
      this.media.media_image.unshift({
        id: 0,
        image: this.media.image,
      })
    },
    async updateTotalView() {
      await this.$store.dispatch('media_training/updateTotalView', this.id)
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
          await this.$store.dispatch('media_master/updateTotalDownload', this.id)
          await this.getMedia()
      } 
    },
  },
}
</script>

<style scoped lang="scss">
.m-auto {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -5rem;
}
.content-container {
  padding: 25px 0 150px;

  .content-date,
  .content-detail {
    margin-bottom: 5px;
  }

  .content-date {
    color: #b2b2b2;
    font-size: 14px;
  }

  .content-title {
    font-size: 26px;
    margin-bottom: 15px;
  }

  .media-label {
    font-weight: bold;
  }

  .media-value,
  .media-detail {
    color: #8c8c8c;
  }

  .media-detail {
    margin: 15px 0 30px;
  }

  .media-player-container {
    margin: 50px 0 70px;

    .media-images {
      img {
        width: 100%;
      }

      .sub-image {
        margin-top: 15px;
        padding: 0 20%;

        img {
          opacity: 0.5;
        }
      }
    }

    .media-document {
      text-align: center;

      img {
        width: 50%;
      }
    }

    .media-audio {
      text-align: center;
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
