<template>
  <main>
    <MArticleBanner
      :title="$t('MEDIA_MASTER.TITLE')"
      :subtitle="$t('MEDIA_MASTER.SUBTITLE')"
      :image="'/images/banner-media-master.png'"
    />
    <section class="categories pt-3">
      <h1 class="categories__title">{{ $t('MEDIA_MASTER.CATEGORY') }}</h1>
      <v-sheet class="mx-auto pt-2 pb-3" max-width="700">
        <v-slide-group class="a" show-arrows>
          <v-slide-item v-for="item in category_list" :key="item.id">
            <v-btn
              class="mx-2"
              :input-value="item.is_active"
              active-class="gray indigo--text"
              depressed
              rounded
              @click="
                openCategory('/media-master', { media_category_id: item.id })
              "
            >
              {{ $lang(item.name_th, item.name_en) }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>

    <section class="media-container">
      <h3 class="section-title">
        <span v-if="media_master.length">
          <i class="fa fa-chevron-left" @click="openPage('/media-master')"></i>
          {{
            $lang(
              media_master[0].media_playlist.name_th,
              media_master[0].media_playlist.name_en
            )
          }}
        </span>
      </h3>
      <v-row class="pt-3">
        <v-col v-for="media of media_master" :key="media.id" cols="6">
          <v-card class="media">
            <div  @click="openPage('/media-master/detail', {id:media.id})">
              <img
                :src="`${image_url}${media.image}`"
                alt="media-image"
                class="media-image"
              />

              <div class="media-info">
                <span>
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
                    {{ $lang(media.creator_name_th, media.creator_name_en) }}
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
            </div>
          </v-card>
        </v-col>
      </v-row>
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
    <!-- <v-dialog v-model="media_master_dialog" fullscreen hide-overlay>
      <MMediaMasterDetail
        :id="media_master_dialog_id"
        @detail_dialog="closeMediaGeneralDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaMasterDetail from '~/components/mobile/media-master/MMediaMasterDetail.vue'
  export default {
    name: 'MMediaMaster',
    components: {
      MArticleBanner,
      MMediaMasterDetail,
    },
    data() {
      return {
        media_master_dialog: false,
        media_master_dialog_id: null,
        image_url: process.env.image_url,
        typingTimer: null,
        doneTypingInterval: 1000,
        media_playlist_id: this.$route.query.media_playlist_id
          ? parseInt(this.$route.query.media_playlist_id)
          : '',
        form: {
          keyword: '',
          sort_by: '',
        },
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
        category_list: [],
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
        media_master: [],
      }
    },
    mounted() {
      this.getCategory()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      openCategory(path, query) {
        this.$router.push({ path, query })
        this.activeCategory(query.media_category_id)
        this.media_category_id = query.media_category_id
        this.$store.commit(
          'media_playlist/setMediaCategoryId',
          query.media_category_id
        )
        this.getMedia()
      },
      activeCategory(id) {
        this.category_list.map((data) => (data.is_active = false))
        const index = this.category_list.findIndex((data) => data.id == id)
        this.category_list[index].is_active = !this.category_list[index].is_active
      },
      openMediaMasterDialog(id) {
        this.media_master_dialog = true
        this.media_master_dialog_id = id
      },
      closeMediaGeneralDialog(value) {
        this.media_master_dialog = value
      },
      keyDownInput(event) {
        clearTimeout(this.typingTimer)
      },
      changeInput(event) {
        clearTimeout(this.typingTimer)
        this.typingTimer = setTimeout(async () => {
          this.getMedia()
        }, this.doneTypingInterval)
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
        this.activeCategory(this.$store.state.media_playlist.activeMenu)
      },
      async modelGetMedia() {
        return await this.$store.dispatch('media_master/pagination', {
          page: this.page,
          perPage: this.per_page,
          keyword: this.form.keyword,
          orderBy: this.form.sort_by,
          isDesc: false,
          media_playlist_id: await this.media_playlist_id,
        })
      },
      async getMedia() {
        this.page = 1
        let res = await this.modelGetMedia()
        this.media_master = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.$refs.infiniteloading.stateChanger.reset()
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      infiniteScroll($state = null) {
        setTimeout(async () => {
          let res = await this.modelGetMedia()
          if (res.data.data.length >= 1) {
            this.media_master = this.media_master.concat(
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
  .categories {
    max-width: 100vw;
    background-color: #f8f7f6;
    margin-left: -12px;
    margin-right: -12px;

    &__title {
      text-align: center;
      padding-top: 15px;
      font-size: 20px;
    }
    .v-sheet {
      background-color: unset;
      border-color: unset;
      color: #001538;
    }
  }
  .search {
    margin-top: 1rem;

    .v-input {
      .v-text-field__details {
        display: none !important;
      }
    }

    .v-btn {
      margin: 0 5px;
      background: #001538;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      color: #fff;
      width: 45%;
      height: 56px;
      padding: 7px 13px;
    }
  }
  .media-container {
    margin-top: 15px;

    .media {
      background: #ffffff;
      cursor: pointer;
      border-radius: 10px;

      .media-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        object-position: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .media-info {
        padding: 15px;
        font-size: 12px;

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

        .media-topic {
          padding-right: 30px;
        }
      }
    }
  }
</style>
