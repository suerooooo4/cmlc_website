<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING_VIDEO_DOCUMENT.PLAYLIST')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video-document.png'"
    />
    <section class="pt-3">
      <v-container>
        <v-row class="pb-3">
          <v-col cols="12">
            <v-row>
              <v-col v-for="media of training_video" :key="media.id" cols="12">
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
          </v-col>
        </v-row>
        <div v-if="mode_open_playlist" class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn depressed color="primary" @click="modeOpenPlaylist">
          {{ $t('TRAINING_VIDEO_DOCUMENT.ACTION_MORE') }}
        </v-btn>
        </div>
        <!-- <div v-if="total" class="pagination">
          <v-pagination
            v-model="page"
            @input="changePage()"
            :length="last_page"
            :total-visible="7"
          ></v-pagination>
        </div> -->
      </v-container>
    </section>
    <section class="show training-document">
      <v-row>
        <v-col cols="1">
          <img
            src="/images/training/icon-paper.png"
            alt="supportor-image"
            width="30"
            class="mr-2"
          />
        </v-col>
        <v-col cols="11">
          <span class="show__title">{{
            $t('TRAINING_VIDEO_DOCUMENT.DOCUMENT')
          }}</span>
          <hr />
        </v-col>
        <v-col cols="6" v-for="item in training_document" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training-document/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :total_view="item.total_view"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn depressed color="primary" @click="modeOpenDocument">
          {{ $t('TRAINING_VIDEO_DOCUMENT.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>
  </main>
</template>

<script>
import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
import MMediaMasterDetail from '~/components/mobile/media-master/MMediaMasterDetail.vue'

export default {
  name: 'MMediaMasterPlaylist',
  components: {
    MArticleBanner,
    MMediaMasterDetail,
    MArticleCard
  },
  data() {
    return {
      training_video: [],
      image_url: process.env.image_url,
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      per_page: 4,
      total: 0,
      mode_open_playlist:true,
      mode_open_document: true,
      training_document: [],
      }
  },
  async mounted() {
    await this.getTrainingVideo()
    await this.getTrainingDocument()
  },

  methods: {
    modeOpenDocument(){
      this.perPage = null
      this.mode_open_document = false
      this.getTrainingDocument()
    },
    modeOpenPlaylist(){
        this.per_page=null
        this.mode_open_playlist=false
        this.getTrainingVideo()
    },
    openMediaMasterDialog(id) {
      this.media_master_dialog = true
      this.media_master_dialog_id = id
    },
    closeMediaGeneralDialog(value) {
      this.media_master_dialog = value
    },
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getTrainingVideo() {
      let res = await this.$store.dispatch(
        'training_video_playlist/pagination',
        {
          page: 1,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        }
      )
      this.training_video = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = this.$stripHtml(data.detail_en)
        return data
      })
    },
    async getTrainingDocument() {
        let res = await this.$store.dispatch('training_document/pagination', {
          page: 1,
          perPage: this.perPage,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.training_document = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
    },
  },
}
</script>

<style scoped lang="scss">
.media-labels {
  font-weight: bold;
}
.media-infos {
  padding: 15px;
  font-size: 12px;
}
.media-topics {
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.media-names {
  margin-bottom: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
  .media-images {
    width: 230px;
    height: 180px;
    object-fit: cover;
    object-position: center;
    padding: 10px;
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
