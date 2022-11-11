<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.png'"
    />

    <section class="media-master-container">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-card class="category-container">
              <v-list class="pb-0 pt-5">
                <v-list-item>
                  <h2 class="category-title white--text pl-2">
                    {{ $t('MEDIA_MASTER.CATEGORY') }}
                  </h2>
                </v-list-item>
              </v-list>
              <v-list nav dense class="pb-5">
                <v-list-item-group v-model="selectedItem" color="#ffffff">
                  <div
                    v-for="(category, i) in category_list"
                    :key="i"
                    class="ma-2"
                  >
                    <v-hover v-slot:default="{ hover }">
                      <v-list-item
                        @click="
                          changeCategory(category.id, i),
                            getGeneralSearch(category.id)
                        "
                        :class="hover ? 'mt-1 mb-2 list-hover' : 'mt-1 mb-2'"
                      >
                        <v-list-item-icon class="mr-3">
                          <img
                            :src="category_list_icon[i]"
                            width="23"
                            height="20"
                          />
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title class="white--text">
                            {{ $lang(category.name_th, category.name_en) }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-hover>
                    <v-divider
                      v-if="i < category_list.length - 1"
                      class="category-divider"
                    ></v-divider>
                  </div>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>

          <v-col cols="9">
            <div class="filter-form">
              <v-row>
                <v-col cols="5" class="pr-0">
                  <v-text-field
                    v-model="form.keyword"
                    @keypress="search"
                    name="input-search"
                    :label="$t('MEDIA_MASTER.SEARCH')"
                    append-icon="mdi-magnify"
                    solo
                  ></v-text-field>
                </v-col>

                <v-col cols="3" class="pr-0">
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
                <v-col cols="3" class="pr-0">
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
                <v-col cols="1">
                  <v-menu offset-y>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        solo
                        v-bind="attrs"
                        v-on="on"
                        large
                        height="48"
                        color="white"
                        class="btn-filter"
                      >
                        <img src="@/static/icon/filter.svg" width="20" />
                      </v-btn>
                    </template>

                    <v-list style="width: 100px">
                      <v-list-item-group>
                        <v-list-item
                          v-for="(item, i) in sort_item"
                          :key="i"
                          @change="selectSort(item.value)"
                        >
                          <v-list-item-title
                            v-text="item.text"
                          ></v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </div>
            <div v-if="form.is_search">
              <div
                v-for="media of media_general"
                :key="media.id"
                class="media-list"
              >
                <DMediaGeneralCard
                  :data="media"
                  :detail_path="'/media-general/detail'"
                />
              </div>
            </div>
            <div v-else class="media-container">
              <v-row>
                <v-col v-for="media of media_playlist" :key="media.id" cols="4">
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

        <div v-if="total" class="pagination">
          <v-pagination
            v-model="page"
            @input="changePage()"
            :length="last_page"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DMediaGeneralCard from '~/components/desktop/shared/DMediaGeneralCard.vue'
  export default {
    name: 'DMediaMaster',
    components: {
      DArticleBanner,
      DMediaGeneralCard,
    },
    data() {
      return {
        menu_to: '',
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
      }
    },
    async mounted() {
      await this.getCategory()
      await this.getMedia()
      this.selectedItem = this.$store.state.media_playlist.activeMenu
    },

    watch: {
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
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', {
          page: this.page,
        })
         if (this.form.keyword) {
          await this.getGeneralSearch()
        } else{
          await this.getMedia()
        }      
      },

    async search($event) {
      if ($event.key.toUpperCase() == 'ENTER') {
        this.form.keyword = this.form.keyword.trim()
        if (this.form.keyword) {
          this.form.is_search = true
          this.page = 1
          await this.getGeneralSearch()
        } else {
          this.page = 1
          this.form.is_search = false
          this.getMedia()
        }
      } else {
        this.getMedia()
      }
    },
      async getCategory() {
        let res = await this.$store.dispatch('media_category/get')
        let all = {
          id: '',
          name_th: 'ทั้งหมด',
          name_en: 'All',
        }
        this.category_list = res.data
        this.category_list.unshift(all)
      },
      async getMedia() {
        let res = await this.$store.dispatch('media_playlist/pagination', {
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

        this.media_playlist = res.data.data
        this.last_page = res.data.lastPage
        this.total = res.data.total
      },
    async getGeneralSearch(id) {
      if (id) {
        this.category_id = id
      }
      let res = await this.$store.dispatch('media_general/pagination', {
        page: this.page,
        perPage: this.per_page,
        orderBy: this.form.sort_by,
        isDesc: true,
        media_category_id: this.category_id,
        keyword: this.form.keyword,
      })

      this.media_general = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = this.$stripHtml(data.detail_en)

        return data
      })
      this.last_page = res.data.lastPage
      this.total = res.data.total
    },
      async selectSort(value) {
        this.form.sort_by = value
        this.getMedia()
      },

      async changeCategory(id, index) {
        this.form.keyword = ''
        this.form.is_search = false
        this.$store.commit('media_playlist/setMediaCategoryId', id)
        this.$store.commit('media_playlist/setActiveMenu', index)

        await this.getMedia()
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
  .playlist {
    cursor: pointer;
  }
</style>
