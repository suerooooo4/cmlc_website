<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_MASTER.TITLE')"
      :subtitle="$t('MEDIA_MASTER.SUBTITLE')"
      :image="'/images/banner-media-master.png'"
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
                        @click="changeCategory(category.id, i)"
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
            <div class="media-container">
              <v-row>
                <v-col>
                  <h2 class="section-title">
                    <span v-if="media_master.length">
                      <i
                        class="fa fa-chevron-left"
                        @click="openPage('/media-master')"
                      ></i>
                      {{
                        $lang(
                          media_master[0].media_playlist.name_th,
                          media_master[0].media_playlist.name_en
                        )
                      }}
                    </span>
                  </h2>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-for="media of media_master" :key="media.id" cols="6">
                  <v-card
                    @click="openPage('/media-master/detail', { id: media.id })"
                    class="media hover-card"
                  >
                    <img
                      :src="`${image_url}${media.image}`"
                      alt="media-image"
                      class="media-image"
                    />

                    <div class="media-info">
                      <span class="float-right">
                        <i
                          v-if="media.media_category_id == 1"
                          class="fa fa-image"
                        ></i>
                        <i
                          v-if="media.media_category_id == 2"
                          class="fa fa-volume-up"
                        ></i>
                        <i
                          v-if="media.media_category_id == 3"
                          class="fa fa-video"
                        ></i>
                        <i
                          v-if="media.media_category_id == 4"
                          class="fa fa-file-alt"
                        ></i>
                      </span>

                      <p class="media-name">
                        <span class="media-label">
                          {{ $t('MEDIA_MASTER.NAME') }}:
                        </span>

                        <span class="media-value">
                          {{ $lang(media.name_th, media.name_en) }}
                        </span>
                      </p>

                      <p class="media-topic">
                        <span class="media-label">
                          {{ $t('MEDIA_MASTER.TOPIC') }}:
                        </span>

                        <span class="media-value">
                          {{ $lang(media.title_th, media.title_en) }}
                        </span>
                      </p>

                      <p class="media-keyword">
                        <span class="media-label">
                          {{ $t('MEDIA_MASTER.KEYWORD') }}:
                        </span>

                        <span class="media-value">
                          {{ $lang(media.keyword_th, media.keyword_en) }}
                        </span>
                      </p>

                      <p class="media-creator">
                        <span class="media-label">
                          {{ $t('MEDIA_MASTER.CREATOR') }}:
                        </span>

                        <span class="media-value">
                          {{
                            $lang(media.creator_name_th, media.creator_name_en)
                          }}
                        </span>
                      </p>

                      <p class="media-branch">
                        <span class="media-label">
                          {{ $t('MEDIA_MASTER.BRANCH') }}:
                        </span>

                        <span class="media-value">
                          {{
                            $lang(
                              media.media_branch.name_th,
                              media.media_branch.name_en
                            )
                          }}
                        </span>
                      </p>
                    </div>
                  </v-card>
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

  export default {
    name: 'DMediaMaster',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        media_playlist_id: this.$route.query.media_playlist_id
          ? parseInt(this.$route.query.media_playlist_id)
          : '',
        form: {
          keyword: '',
          sort_by: 'created_at',
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
        media_master: [],
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
      }
    },

    async mounted() {
      await this.getCategory()
      await this.getMedia()
      this.selectedItem = this.$store.state.media_playlist.activeMenu
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', {
          media_playlist_id: this.media_playlist_id,
          page: this.page,
        })
        await this.getMedia()
      },
      async changeCategory(id, index) {
        this.$router.push('/media-master')
        this.$store.commit('media_playlist/setMediaCategoryId', id)
        this.$store.commit('media_playlist/setActiveMenu', index)
      },
      async search($event) {
        if ($event.key.toUpperCase() == 'ENTER') {
          this.form.keyword = this.form.keyword.trim()
          this.page = 1
          await this.getMedia()
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
        let res = await this.$store.dispatch('media_master/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: this.form.sort_by,
          isDesc: true,
          media_playlist_id: await this.media_playlist_id,
          keyword: this.form.keyword,
        })

        this.media_master = res.data.data.map((data) => {
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
      // margin-top: 15px;

      .media {
        background: #ffffff;
        cursor: pointer;
        border-radius: 16px;

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
