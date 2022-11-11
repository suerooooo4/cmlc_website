<template>
  <main>
    <MArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.png'"
    />

    <section class="categories pt-3">
      <h1 class="categories__title text-center">
        {{ $t('MEDIA_GENERAL.CATEGORY') }}
      </h1>
      <v-sheet class="mx-auto pt-2" max-width="700">
        <v-slide-group class="a" show-arrows>
          <v-slide-item v-for="(item, index) in category_list" :key="index">
            <v-btn
              class="mx-2"
              :input-value="item.is_active"
              active-class="gray indigo--text"
              depressed
              rounded
              @click="openCategory('/media-general',{ media_category_id: item.id }, index),getGeneralSearch(item.id)"
            >
              {{ $lang(item.name_th, item.name_en) }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>

    <section class="pt-3">
      <v-container>
        <v-row class="pb-3">
          <v-col cols="12">
            <div class="">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="text"
                    name="input-search"
                    :label="$t('MEDIA_MASTER.SEARCH')"
                    append-icon="mdi-magnify"
                    solo
                    hide-details="true"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" class="pb-0">
                  <v-menu
                    v-model="menu_from"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        solo
                        hide-details
                        v-model="form.start_date"
                        label="วันที่เริ่ม"
                        append-icon="mdi-calendar"
                        v-on="on"
                        class="pb-2"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      no-title
                      v-model="form.start_date"
                      locale="TH-th"
                      @input="menu_from = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="pb-0 pt-1">
                  <v-menu
                    v-model="menu_to"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        solo
                        hide-details
                        v-model="form.end_date"
                        label="วันที่สิ้นสุด"
                        append-icon="mdi-calendar"
                        v-on="on"
                        class="pb-2"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      no-title
                      v-model="form.end_date"
                      locale="TH-th"
                      @input="menu_to = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" class="pt-1 pb-5">
                  <v-select
                    :items="sort_item"
                    item-text="text"
                    item-value="value"
                    v-model="form.sort_by"
                    @change="changeInput"
                    :label="$t('MEDIA_TRAINING.SORT')"
                    class="ma-0 pa-0"
                    single-line
                    solo
                    hide-details
                  ></v-select>
                </v-col>
              </v-row>
            </div>
            <div v-if="form.is_search">
              <div
                v-for="(item, index) in media_general"
                :key="index"
                class="pt-2 mb-2"
              >
               <MMediaGeneralCard
                  @open="openMediaGeneralDialog(item.id)"
                  :data="item"
                  :is_video="true"
                  :is_total_view="true"
                  class="media-general-card pb-2"
                />
              </div>
            </div>

            <div v-else class="" >
              <v-row>
                <v-col
                  v-for="media of media_playlist"
                  :key="media.id"
                  cols="12"
                >
                  <div
                    @click="
                      openPage('/media-general/playlist', {
                        media_playlist_id: media.id,
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
                              {{ media.total_media }}
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
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      ref="infiniteloading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
        <v-dialog v-model="media_general_dialog" fullscreen hide-overlay>
      <MMediaGeneralDetail
        :id.sync="media_general_dialog_id"
        @detail_dialog="closeMediaGeneralDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
  import MMediaGeneralDetail from '~/components/mobile/media-general/MMediaGeneralDetail.vue'

  export default {
    name: 'MMediaMasterPlaylist',
    components: {
      MArticleBanner,
      MMediaGeneralCard,
      MMediaGeneralDetail,
    },
    data() {
      return {
        text: '',
        image_url: process.env.image_url,
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        form: {
          is_search: false,
          keyword: '',
          sort_by: 'created_at',
          start_date: '',
          end_date: '',
        },
        sort_item: [
          {
            value: 'created_at',
            text: this.$t('SHARED.SORT_ORDER.CREATE_DATE'),
          },
          {
            value: this.$lang('name_th', 'name_en'),
            text: this.$t('SHARED.SORT_ORDER.NAME'),
          },
        ],
        per_page: 8,
        last_page: 0,
        total: 0,
        category_list: [],
        media_general: [],
        media_playlist: [],
        selectedItem: 0,
        category_list_icon: [
          require('@/static/icon/media-master-category/all.png'),
          require('@/static/icon/media-master-category/image-media.png'),
          require('@/static/icon/media-master-category/audio.png'),
          require('@/static/icon/media-master-category/video.png'),
          require('@/static/icon/media-master-category/document.png'),
        ],

        sort_by: 1,
        date_from: '',
        date_to: '',
        menu_from: false,
        menu_to: false,
        media_category_id: '',
        category_id: '',
        media_general_dialog: false,
        media_general_dialog_id: null,
      }
    },
    async mounted() {
      await this.getCategory()
      await this.getMedia()
    },
    watch: {
      text: function (val) {
        this.form.keyword = val.trim()
        if (this.form.keyword) {
          this.form.is_search = true
          this.page = 1
          this.getGeneralSearch()
        } else {
          this.form.is_search = false
          this.getMedia()
        }
      },
    },
 /*    watch: {
      menu_from(val) {
        if (!val) {
          this.getMedia()
        }
      },
      menu_to(val) {
        if (!val) {
          this.getMedia()
        }
      },
    }, */
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', {
          page: this.page,
        })
        await this.getMedia()
      },

      async search($event) {
        if ($event.key.toUpperCase() == 'ENTER') {
          this.form.keyword = this.form.keyword.trim()
          this.page = 1
          await this.getMedia()
        }
      },
      activeCategory(id) {
        this.category_list.map((data) => (data.is_active = false))
        const index = this.category_list.findIndex((data) => data.id == id)
        this.category_list[index].is_active = !this.category_list[index].is_active
      },
      async getCategory() {
        let res = await this.$store.dispatch('media_category/get')
        this.category_list = res.data.map((data) => {
          data.is_active = false
          return data
        })
        this.category_list.unshift({
          id: '',
          name_en: 'All',
          name_th: 'ทั้งหมด',
        })
        if (this.$route.query.media_category_id != null) {
          this.activeCategory(this.$route.query.media_category_id)
        } else {
          this.activeCategory(this.category_list[0].id)
        }
      },
      async modelGetMedia() {
        return await this.$store.dispatch('media_playlist/pagination', {
          page: this.page,
          perPage: this.per_page,
          type: 3,
          start_date: this.form.start_date,
          end_date: this.form.end_date,
          orderBy: this.form.sort_by,
          isDesc: true,
          keyword: this.form.keyword,
          media_category_id: this.$store.state.media_playlist.mediaCategoryId,
        })
      },
      async getMedia() {
        this.page = 1
        let res = await this.modelGetMedia()
        this.media_playlist = res.data.data.map((data) => {
          data.name_th = this.$stripHtml(data.name_th)
          data.name_en = this.$stripHtml(data.name_en)

          return data
        })
        this.$refs.infiniteloading.stateChanger.reset()
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      async getGeneralSearch(id) {
        if (id) {
          this.category_id = id
        }
        this.page =this.$route.query.page ? parseInt(this.$route.query.page) : 1;
      let res = await this.$store.dispatch('media_general/pagination', {
        page: this.page,
        perPage: this.per_page,
        keyword: this.form.keyword,
        orderBy: this.form.sort_by,
        isDesc: false,
        media_playlist_id: this.category_id,
        })
        this.media_general = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      async selectSort(value) {
        this.form.sort_by = value
        this.getMedia()
      },
      openMediaGeneralDialog(id) {
        this.media_general_dialog = true
        this.media_general_dialog_id = id
      },
      closeMediaGeneralDialog(value) {
        this.media_general_dialog = value
      },
      openCategory(path, query, index) {
        this.text = ''
        this.form.is_search = false
        this.$router.push({ path, query })
        this.activeCategory(query.media_category_id)
        this.$store.commit('media_playlist/setActiveMenu', index)

        this.$store.commit(
          'media_playlist/setMediaCategoryId',
          query.media_category_id
        )

        this.media_category_id = query.media_category_id
        this.getMedia()
      },
      changeInput(event) {
        clearTimeout(this.typingTimer)
        this.typingTimer = setTimeout(async () => {
          this.getMedia()
        }, this.doneTypingInterval)
      },
      infiniteScroll($state) {
        setTimeout(async () => {
          let res = await this.modelGetMedia()
          if (res.data.data.length >= 1) {
            this.media_playlist = this.media_playlist.concat(
              res.data.data.map((data) => {
                data.detail_th = this.$stripHtml(data.detail_th)
                data.detail_en = this.$stripHtml(data.detail_en)

                return data
              })
            )
            this.last_page = res.data.lastPage
            this.total = res.data.total
            this.page++
            $state.loaded()
          } else {
            $state.complete()
          }
        }, 500)
      },
    },
  }
</script>

<style scoped lang="scss">
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
