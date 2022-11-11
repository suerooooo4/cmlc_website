<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon  @click="openPage('/media-training/playlist',{ media_playlist_id: media.media_playlist_id,})">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="openPage('/media-training/playlist',{ media_playlist_id: media.media_playlist_id,})"
          >{{ $t('MEDIA_MASTER.TITLE') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="content" v-if="media">
      <div class="content__header">
        <v-row>
          <v-col cols="6">
            <p>
              {{ $t('MEDIA_GENERAL.CREATOR') }}:
              <span class="content__headerInfo">{{
                $lang(media.creator_name_th, media.creator_name_en)
              }}</span>
            </p>
          </v-col>
          <!--   <v-col
            cols="6"
            class="d-flex justify-content-end"
            v-if="media.media_branch"
          >
            <p>
              {{
                $lang(media.media_branch.name_th, media.media_branch.name_en)
              }}
            </p>
          </v-col> -->
        </v-row>
      </div>

      <div v-if="media.media_category_id == 1">
        <MCarousel :starting-image="1" :images="media.media_image"></MCarousel>
      </div>

      <div v-else-if="media.media_category_id == 2">
        <div class="content__audio">
          <audio controls>
            <source
              :src="`${audio_url}${media.audio_file}`"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>

      <div class="content__video" v-else-if="media.media_category_id == 3">
        <video style="width: 100vw" controls>
          <source :src="`${video_url}${media.video_file}`" type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </div>

      <div class="content__images" v-else-if="media.media_category_id == 4">
        <div class="content__document">
          <img :src="`${image_url}${media.image}`" alt="media-image" />
        </div>
      </div>

      <div class="content__header">
        <v-row>
          <v-col cols="6">
            <p>
              {{ $t('MEDIA_GENERAL.TOPIC') }}:
              <span class="content__headerInfo">{{
                $lang(media.creator_name_th, media.creator_name_en)
              }}</span>
            </p>
            <p>
              {{ $t('MEDIA_GENERAL.KEYWORD') }}:
              <span class="content__headerInfo">{{
                $lang(media.keyword_th, media.keyword_en)
              }}</span>
            </p>
            <p>
              {{ $t('MEDIA_GENERAL.PUBLISH_DATE') }}:
              <span class="content__headerInfo">{{
                callDate(media.created_at)
              }}</span>
            </p>
          </v-col>
          <v-col cols="6">
             <v-btn
                @click.prevent="
                  downloadItem(
                    url=`${download_url}`+media.id
                  )
                "
                depressed
                color="error"
              >
                {{ $t('TRAINING_VIDEO_DETAIL.DOWNLOAD_DOCUMENT') }}
                <i class="paper-download"></i>
              </v-btn>
            <p class="total-download">
              {{
                $t('TRAINING_VIDEO_DETAIL.TOTAL_DOWNLOAD').replace(
                  '%s',
                  media.total_download
                )
              }}
            </p>
          </v-col>
        </v-row>
      </div>
      <div
        v-html="$lang(media.detail_th, media.detail_en)"
        class="content__html"
      ></div>
      <div class="content__header">
        <v-row>
          <v-col cols="12">
            <p>
              {{ $t('MEDIA_GENERAL.LOCATION') }}:
              <span class="content__headerInfo">{{
                $lang(media.location_th, media.location_en)
              }}</span>
            </p>

            <div
              v-if="
                $lang(media.co_creator_name_th, media.co_creator_name_en) !=
                  '-' &&
                $lang(media.co_creator_name_th, media.co_creator_name_en) !=
                  null
              "
            >
              <p>
                {{ $t('MEDIA_GENERAL.CO_CREATOR') }}:
                <span class="content__headerInfo">{{
                  $lang(media.co_creator_name_th, media.co_creator_name_en)
                }}</span>
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>
    <div v-if="media.media_category_id == 4" class="m-auto">
      <iframe
        :src="`${image_url}${media.document_file}`"
        frameborder="0"
        width="90%"
        height="500px"
      >
      </iframe>
    </div>
  </main>
</template>

<script>
import MCarousel from '~/components/mobile/shared/MCarousel.vue'
import Swal from 'sweetalert2'

export default {
  name: 'MMediaTrainingDetail',
/*   props: ['id'], */
  components: {
    MCarousel,
  },
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getMedia()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      audio_url: process.env.audio_url,
      video_url: process.env.video_url,
      document_url: process.env.document_url,
      download_url: process.env.download_url,
      media: [],
      id: this.$route.query.id,
    }
  },
  async mounted() {
    await this.getMedia()
    await this.updateTotalView()
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
    async updateTotalDownload() {
      await this.$store.dispatch('media_training/updateTotalDownload', this.id)
      await this.getMedia()
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
          await this.updateTotalDownload() 
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
}
.main {
  padding: 12px;
}
.header {
  &__topbar {
    color: #001538;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 6px;
      border-radius: 6px;
      background: #000;
      position: absolute;
      bottom: -11px;
      left: 0;
    }
    .link {
      color: #001538;
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #ccc;
    padding: 0;
  }
}

.content {
  margin-top: 12px;
  &__video {
    widows: 100%;
    margin-left: -12px;
  }
  &__images {
    img {
      width: 100%;
    }

    .sub-image {
      margin-top: 15px;
      padding: 0 5%;

      img {
        opacity: 0.5;
      }
    }
  }

  &__document {
    text-align: center;

    img {
      width: 100%;
    }
  }

  &__audio {
    text-align: center;
  }
  &__header {
    color: #001538;
    margin-top: 12px;
    font-size: 11px !important;
    &Info {
      color: #8c8c8c !important;
    }
    .v-btn {
      font-size: 10px !important;
    }
  }
  &__html {
    font-size: 14px !important;
    color: #001538;
  }
  .total-download {
    margin: 10px 0;
    font-size: 12px;
    text-align: center;
    color: #b2b2b2;
  }
  .warning-login {
    font-size: 12px;
    text-align: center;
    color: #f00;
  }
}

.recommend {
  margin-left: -12px;
  padding-left: 12px;
  width: 100vw;
  background: #f8f7f6;

  &__title {
    padding-top: 12px;
    font-size: 22px;
    color: #001538;
  }
}
</style>
