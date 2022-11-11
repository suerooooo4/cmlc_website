<template>
  <div class="search">
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-card class="category-container">
            <v-list class="pb-0 pt-5">
              <v-list-item>
                <h2 class="category-title white--text pl-2">
                  {{ $lang('ตัวกรอง', 'Filter') }}
                </h2>
              </v-list-item>
            </v-list>
            <v-list nav dense class="pb-5">
              <div class="pl-2 pr-2">
                <v-select
                  :items="sort_item"
                  v-model="sort_by"
                  hide-details
                  item-value="value"
                  label="เรียงตาม"
                  class="pb-2"
                  item-text="text"
                  solo
                  @change="getSearch"
                ></v-select>

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
                      v-model="start_date"
                      label="วันที่เริ่ม"
                      append-icon="mdi-calendar"
                      v-on="on"
                      class="pb-2"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    v-model="start_date"
                    locale="TH-th"
                    @input="menu_from = false"
                  >
                  </v-date-picker>
                </v-menu>

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
                      v-model="end_date"
                      label="วันที่สิ้นสุด"
                      append-icon="mdi-calendar"
                      v-on="on"
                      class="pb-2"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    no-title
                    v-model="end_date"
                    locale="TH-th"
                    @input="menu_to = false"
                  >
                  </v-date-picker>
                </v-menu>
                <v-select
                  :items="categorys"
                  v-model="category"
                  item-value="name_en"
                  :item-text="$lang('name_th', 'name_en')"
                  label="ประเภท"
                  solo
                  @change="getSearch"
                >
                </v-select>
              </div>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <div class="search-container">
            <v-row>
              <v-col cols="8">
                <h1 class="search-title">{{ $t('SEARCH.TITLE') }}</h1>
              </v-col>
            </v-row>

            <div class="search-result">
              <div
                v-for="result of search_result"
                :key="result.id"
                class="result-list"
              >
                <DSearchCard :data="result.article" />
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
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import DSearchCard from '~/components/desktop/search/DSearchCard.vue'

  export default {
    name: 'DSearch',
    components: {
      DSearchCard,
    },
    data() {
      return {
        keyword: this.$route.query.keyword,
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
        sort_by: 'created_at',
        page: 1,
        per_page: 10,
        last_page: 0,
        total: 0,
        search_result: [],
        start_date: '',
        end_date: '',
        menu_from: false,
        menu_to: false,
        categorys: [
          { name_en: 'news', name_th: 'ข่าวสาร' },
          { name_en: 'activity', name_th: 'กิจกรรม' },
          { name_en: 'course', name_th: 'หลักสูตร' },
          { name_en: 'law', name_th: 'กฎหมาย' },
          { name_en: 'training', name_th: 'การฝึกอบรม' },
          { name_en: 'media_global', name_th: 'ข่าวสารรอบโลก' },
        ],
        category: '',
      }
    },
    watch: {
      async $route() {
        this.keyword = this.$route.query.keyword
        await this.getSearch()
      },

      menu_from(val) {
        if (!val) {
          this.getSearch()
        }
      },
      menu_to(val) {
        if (!val) {
          this.getSearch()
        }
      },
    },
    async mounted() {
      await this.getSearch()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', {
          keyword: this.keyword,
          page: this.page,
        })
        await this.getSearch()
      },
      async getSearch() {
        let res = await this.$store.dispatch('article_sorting/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: this.sort_by,
          isDesc: true,
          keyword: this.keyword,
          start_date: this.start_date,
          end_date: this.end_date,
          category: this.category,
        })

        this.search_result = res.data.data.map((data) => {
          data.article.detail_th = this.$stripHtml(data.article.detail_th)
          data.article.detail_en = this.$stripHtml(data.article.detail_en)

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
      },
    },
  }
</script>

<style scoped lang="scss">
  .search {
    padding: 50px 0 100px;
  }
  .search-container {
    width: 90%;
    margin: auto;
    // padding: 50px 0 100px;

    .search-title {
      font-size: 36px;
    }

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .search .v-input__slot {
    background: #ffffff !important;
  }
  .search {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>
