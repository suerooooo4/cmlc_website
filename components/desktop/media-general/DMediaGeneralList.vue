<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.png'"
    />

    <section class="media-general-container">
      <v-container>
        <v-row>
          <v-col>
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/media-general')"
                ></i>
                {{ $t('MEDIA_GENERAL.TITLE') }}
              </span>
            </h2>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <!-- <div class="category-container">
              <h2 class="category-title">
                {{ $t('MEDIA_GENERAL.CATEGORY') }}
              </h2>

              <ul class="category-list">
                <li @click="changeCategory()">
                  {{ $lang('ทั้งหมด', 'All') }}
                </li>

                <li
                  v-for="category of category_list"
                  :key="category.id"
                  @click="changeCategory(category.id)"
                >
                  {{ $lang(category.name_th, category.name_en) }}
                </li>
              </ul>
            </div> -->
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
                      >
                        <v-list-item-icon class="mr-3">
                          <img
                            :src="category_list_icon[i]"
                            width="23"
                            height="20"
                          />
                        </v-list-item-icon>

                        <v-list-item-content>
                          <v-list-item-title
                            class="white--text"
                            @click="changeCategory(category.id)"
                          >
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
                <v-col cols="7">
                  <v-text-field
                    v-model="form.keyword"
                    @keypress="search"
                    name="input-search"
                    :label="$t('MEDIA_GENERAL.SEARCH')"
                    append-icon="mdi-magnify"
                    solo
                  ></v-text-field>
                </v-col>

                <v-col cols="5">
                  <v-select
                    v-model="form.sort_by"
                    :items="sort_item"
                    item-text="text"
                    item-value="value"
                    @change="getMedia"
                    :label="$t('MEDIA_GENERAL.SORT')"
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </div>

            <div class="media-container">
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

            <div v-if="total" class="pagination">
              <v-pagination
                v-model="page"
                @input="changePage()"
                :length="last_page"
                :total-visible="7"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DMediaGeneralCard from '~/components/desktop/shared/DMediaGeneralCard.vue'

  export default {
    name: 'DMediaTraining',
    components: {
      DArticleBanner,
      DMediaGeneralCard,
    },
    data() {
      return {
        image_url: process.env.image_url,
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        media_category_id: this.$route.query.media_category_id
          ? parseInt(this.$route.query.media_category_id)
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
        media_general: [],
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
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', {
          media_category_id: this.media_category_id,
          page: this.page,
        })
        await this.getMedia()
      },
      async changeCategory(id = null) {
        if (id) {
          this.media_category_id = id
          this.openPage('', { media_category_id: this.media_category_id })
        } else {
          this.media_category_id = ''
          this.openPage('')
        }

        this.page = 1
        await this.getMedia()
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
          id: 0,
          name_th: 'ทั้งหมด',
          name_en: 'All',
        }
        this.category_list = res.data
        this.category_list.unshift(all)
      },
      async getMedia() {
        let res = await this.$store.dispatch('media_general/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: this.form.sort_by,
          isDesc: true,
          media_category_id: this.media_category_id,
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
    },
  }
</script>

<style scoped lang="scss">
  .media-general-container {
    padding: 50px 0 100px;

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

    .filter-form,
    .media-container {
      padding-left: 30px;
    }

    .media-container {
      margin-top: 15px;
    }

    .pagination {
      margin-top: 50px;
    }
  }
</style>
