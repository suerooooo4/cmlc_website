<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click="openPage('/training-video')">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="$emit('detail_dialog', false)"
          >{{ $t('TRAINING_VIDEO.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="content" v-if="training_video">
      <h2 class="content__title">
        {{ $lang(training_video.name_th, training_video.name_en) }}
      </h2>
      <div class="content__video">
        <video width="400" controls>
          <source
            :src="`${video_url}${training_video.video_file}`"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="content__header">
        <v-row>
          <v-col class="9">
            <p>
              {{ $t('TRAINING_VIDEO_DETAIL.TRAINER') }} :
              <span class="content__headerInfo">{{
                $lang(
                  training_video.trainer_name_th,
                  training_video.trainer_name_en
                )
              }}</span>
            </p>
            <p>
              {{ $t('TRAINING_VIDEO_DETAIL.PUBLISH_DATE') }} :
              <span class="content__headerInfo">{{
                training_video.created_at
              }}</span>
            </p>
          </v-col>
          <v-col class="3">
            <v-btn
              depressed
              @click.prevent="downloadItem(url=`${download_training_video_url}`+training_video.id)"
              color="error"
            >
              {{ $t('TRAINING_VIDEO_DETAIL.DOWNLOAD_DOCUMENT') }}
              <i class="paper-download"></i>
            </v-btn>
            <p class="total-download">
              {{
                $t('TRAINING_VIDEO_DETAIL.TOTAL_DOWNLOAD').replace(
                  '%s',
                  training_video.total_download
                )
              }}
            </p>
            <!-- <p v-if="!$store.state.user.user_id" class="warning-login">
              {{ $t('SHARED.OTHER.WARNING_LOGIN') }}
            </p> -->
          </v-col>
        </v-row>
      </div>
      <div
        v-html="$lang(training_video.detail_th, training_video.detail_th)"
        class="content__html"
      ></div>
    </section>
  </main>
</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    name: 'MTrainingVideoDetail',
    /* props: ['id'], */
    watch: {
      id: {
        async handler(val, oldVal) {
          await this.getVideo()
          await this.updateTotalView()
        },
        deep: true,
      },
    },
    data() {
      return {
        image_url: process.env.image_url,
        document_url: process.env.document_url,
        video_url: process.env.video_url,
        download_training_video_url: process.env.download_training_video_url,
        training_video: null,
        id: this.$route.query.id,
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
      async updateTotalDownload() {
        await this.$store.dispatch('training_video/updateTotalDownload', this.id)
        await this.getVideo()
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
    &__title {
      font-size: 22px;
      color: #001538;
    }
    &__video {
      widows: 100%;
      margin-left: -12px;
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
