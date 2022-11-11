<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING_VIDEO_DOCUMENT.PLAYLIST')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video-document.png'"
    />
    <section class="media-master-container">
      <v-container>
            <h2 class="section-title">
             <img
                src="/images/training/icon-video.png"
                alt="supportor-image"
                width="40"
                class="mr-2"
              /><span>{{ $t('TRAINING_VIDEO_DOCUMENT.PLAYLIST_VIDEO')}}</span>
            </h2>
        <v-row>
          <v-col v-for="media of training_video" :key="media.id" cols="4">
            <div
              @click="
                openPage('/training-video-document/playlist', {
                  training_playlist_id: media.id,
                })
              "
              class="hover-card playlist"
            >
              <v-img
                :src="`${image_url}${media.image}`"
                alt="media-image"
                class="media-image"
                height="180px"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,.3)"
              >
                <v-row>
                  <v-col cols="8">
                    <div class="media-playlist-card white--text pl-1">
                      {{ $lang(media.name_th, media.name_en) }}
                    </div>
                  </v-col>
                  <v-col>
                    <div class="media-playlist-total_media">
                      <h1>
                        {{ media.total_training_video }}
                      </h1>
                      <img
                        src="@/static/images/media/media-card.png"
                        width="30"
                        style="margin: auto"
                      />
                    </div>
                  </v-col>
                </v-row>
              </v-img>
            </div>
          </v-col>
        </v-row>
        <div v-if="mode_open">
          <v-row class="mt-5">
            <v-col class="text-center">
              <v-btn @click="modeOpen" large color="primary">
                {{ $t('TRAINING_VIDEO_DOCUMENT.ACTION_MORE') }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div v-if="open_last" class="pagination">
          <v-pagination
            v-model="page"
            @input="changePage()"
            :length="last_page"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-container>
    </section>
    <section class="training-document-container training-document">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <img
                src="/images/training/icon-paper.png"
                alt="supportor-image"
                width="40"
                class="mr-2"
              /><span>{{ $t('TRAINING_VIDEO_DOCUMENT.DOCUMENT') }}</span>
            </h2>

            <v-row>
              <v-col
                v-for="trainingDocument of training_document"
                :key="trainingDocument.id"
                cols="4"
              >
                <DArticleCard
                  :data="trainingDocument"
                  :detail_path="'/training-document/detail'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn
              @click="openPage('/training-document')"
              large
              color="primary"
            >
              {{ $t('TRAINING_VIDEO_DOCUMENT.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'
export default {
  name: 'DTrainingVideoPlaylist',
  components: {
    DArticleBanner,
    DArticleCard,
  },
  data() {
    return {
      training_document: [],
      open_last: false,
      total: 0,
      last_page: 0,
      perPage: 6,
      mode_open: true,
      training_video: [],
      image_url: process.env.image_url,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
    }
  },
  async mounted() {
    await this.getTrainingVideo()
    await this.getTrainingDocument()
  },

  methods: {
    async getTrainingDocument() {
      let res = await this.$store.dispatch('training_document/pagination', {
        page: 1,
        perPage: 6,
        orderBy: 'created_at',
        isDesc: true,
      })

      this.training_document = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = this.$stripHtml(data.detail_en)

        return data
      })
    },
    async modeOpen() {
      this.perPage = 9
      this.mode_open = false
      this.open_last = true
      await this.getTrainingVideo()
    },
    async changePage() {
      this.openPage('', { page: this.page })

      await this.getTrainingVideo()
    },
    async getTrainingVideo() {
      let res = await this.$store.dispatch(
        'training_video_playlist/pagination',
        {
          page: this.page,
          perPage: this.perPage,
          orderBy: 'created_at',
          isDesc: true,
        }
      )

      this.training_video = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = this.$stripHtml(data.detail_en)

        return data
      })
      this.last_page = res.data.lastPage
      this.total = res.data.total
    },
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
  },
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 36px;
  margin-bottom: 2rem;
}
.media-master-container {
  padding: 50px 0 100px;

  // .category-container {
  // padding: 35px 35px 45px;
  // background-color: #001538 !important;
  // border-radius: 6px;

  // .category-title {
  //   margin-bottom: 15px;
  //   padding: 0 15px;
  //   font-size: 26px;
  // }

  // .category-list {
  //   list-style: none;
  //   padding: 0;

  //   li {
  //     padding: 15px;
  //     border-bottom: 1px solid #e5e5e5;
  //     cursor: pointer;
  //   }
  // }
  // }

  .filter-form,
  .media-container {
    padding-left: 30px;
  }

  .media-container {
    margin-top: 15px;

    .media {
      background: #f8f7f6;
      cursor: pointer;

      .media-image {
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: center;
        padding: 10px;
      }

      .media-info {
        padding: 15px;
        font-size: 14px;

        .media-name,
        .media-topic,
        .media-keyword,
        .media-creator,
        .media-branch {
          margin-bottom: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          .media-label {
            font-weight: bold;
          }

          .media-value {
            color: #8c8c8c;
          }
        }

        .media-name {
          padding-right: 30px;
        }
      }
    }
  }

  .pagination {
    margin-top: 50px;
  }
  .category-divider {
    border: 1px solid rgba(178, 178, 178, 0.14);
  }
}
.media-playlist-card {
  position: absolute;
  bottom: 0;
}
.media-playlist-total_media {
  background: rgba(0, 21, 56, 0.73);
  text-align: center;
  height: 180px;
  display: grid;
  padding: 50px 0 50px 0;
  color: #ffffff;
  text-shadow: 0 0 3px #000, 0 0 5px #000;
}
</style>

<style lang="scss">
.category-container .v-sheet {
  background-color: #001538 !important;
}
.list-hover {
  background-color: #ffffff1c;
}
.btn-filter.v-btn {
  padding: 15px !important;
  min-width: 20px !important;
}
.media-master-container {
  .pagination .v-pagination {
    justify-content: end;
  }
}
</style>
