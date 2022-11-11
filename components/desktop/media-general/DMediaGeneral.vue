<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.png'"
    />

    <section class="media-general-container">
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
                        :class="hover ? 'mt-1 mb-2 list-hover' : 'mt-1 mb-2'"
                        @click="changeCategory(category.id, i)"
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
                    <span v-if="media_general.length">
                      <i
                        class="fa fa-chevron-left"
                        @click="openPage('/media-general')"
                      ></i>
                      {{
                        $lang(
                          media_general[0].media_playlist.name_th,
                          media_general[0].media_playlist.name_en
                        )
                      }}
                    </span>
                  </h2>
                </v-col>
              </v-row>
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
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col cols="3">&nbsp;</v-col>

          <v-col class="text-center">
            <v-btn
              @click="openPage('/media-general/list')"
              large
              color="primary"
            >
              {{ $t('MEDIA_GENERAL.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- <section class="media-global-container">
      <v-container>
        <v-row>
          <v-col cols="12" class="latest-news">
            <h2 class="section-title">
              <span>{{ $t('MEDIA_GLOBAL.TITLE') }}</span>
            </h2>

            <v-row>
              <v-col cols="5">
                <div class="pt-4">
                  <DArticleCard
                    v-if="media_global_main"
                    :data="media_global_main"
                    :detail_path="'/media-global/detail'"
                  />
                </div>
              </v-col>

              <v-col cols="7">
                <div v-for="media of media_global" :key="media.id">
                  <DMediaGlobalCard
                    :data="media"
                    :detail_path="'/media-global/detail'"
                  />
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col>&nbsp;</v-col>

          <v-col class="text-center">
            <v-btn
              @click="openPage('/media-global')"
              large
              outlined
              color="primary"
            >
              {{ $t('MEDIA_GLOBAL.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section> -->
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'
  import DMediaGeneralCard from '~/components/desktop/shared/DMediaGeneralCard.vue'
  import DMediaGlobalCard from '~/components/desktop/media-global/DMediaGlobalCard.vue'

  export default {
    name: 'DMediaGeneral',
    components: {
      DArticleBanner,
      DArticleCard,
      DMediaGeneralCard,
      DMediaGlobalCard,
    },
    data() {
      return {
        category_list: [],
        media_general: [],
        media_global: [],
        media_global_main: null,
        selectedItem: 0,
        category_list_icon: [
          require('@/static/icon/media-master-category/all.png'),
          require('@/static/icon/media-master-category/image-media.png'),
          require('@/static/icon/media-master-category/audio.png'),
          require('@/static/icon/media-master-category/video.png'),
          require('@/static/icon/media-master-category/document.png'),
        ],
      }
    },
    async mounted() {
      await this.getCategory()
      await this.getMedia()
      // await this.getMediaGlobal()
      this.selectedItem = this.$store.state.media_playlist.activeMenu
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getCategory() {
        let res = await this.$store.dispatch('media_category/get')
        let all = {
          id: 0,
          name_th: 'ทั้งหมด',
          name_en: 'All',
        }
        this.category_list = res.data
        this.category_list.unshift(all)
      },
      async changeCategory(id, index) {
        // if (id) {
        //   this.openPage('/media-general/list', {
        //     media_category_id: id,
        //   })
        // } else {
        //   this.openPage('media-general/list')
        // }
        this.$router.push('/media-general')
        this.$store.commit('media_playlist/setMediaCategoryId', id)
        this.$store.commit('media_playlist/setActiveMenu', index)
      },
      async getMedia() {
        let res = await this.$store.dispatch('media_general/pagination', {
          page: 1,
          perPage: 5,
          orderBy: 'created_at',
          media_playlist_id: this.$route.query.media_playlist_id,
          isDesc: true,
        })

        this.media_general = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
      async getMediaGlobal() {
        let res = await this.$store.dispatch('media_global/pagination', {
          page: 1,
          perPage: 5,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.media_global = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })

        this.media_global_main = this.media_global[0]
        this.media_global.shift()
      },
    },
  }
</script>

<style scoped lang="scss">
  .media-general-container {
    padding: 50px 0 50px;

    .category-container {
      // padding: 35px 35px 45px;
      // background: #f8f7f6;
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
    }

    .media-container {
      padding-left: 30px;
    }

    .media-container {
      margin-top: -15px;
    }
  }

  .media-global-container {
    padding: 50px 0 100px;
  }
</style>
