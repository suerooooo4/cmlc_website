<template>
  <main>
    <v-container>
      <div class="search-container">
        <v-row>
          <v-col cols="4">
            <h1 class="search-title">{{ $t('SEARCH.TITLE') }}</h1>
          </v-col>

          <v-col cols="12" class="text-right">
            <v-list>
              <div>
                <v-select
                  :items="sort_item"
                  v-model="sort_by"
                  hide-details
                  item-value="value"
                  :label="$t('SEARCH.SORT')"
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
                  hide-details
                >
                </v-select>
              </div>
            </v-list>
          </v-col>
        </v-row>

        <div class="search-result pt-5">
          <div v-for="item of search_result" :key="item.id" class="result-list">
            <MMediaGeneralCard
              @open="openDetail(item)"
              :data="{
                name_th: item.article.name_th,
                name_en: item.article.name_en,
                detail_th: item.article.detail_th,
                detail_en: item.article.detail_en,
                total_view: item.article.total_view,
                created_at: item.created_at,
                image_url: item.image_path,
              }"
              :is_total_view="true"
            />
          </div>
        </div>
      </div>
    </v-container>
    <v-dialog v-model="detail_dialog" fullscreen hide-overlay>
      <MSearchDetail
        :data="detail_dialog_data"
        @detail_dialog="closeDetailDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
  import MSearchDetail from '~/components/mobile/search/MSearchDetail.vue'
  export default {
    name: 'MSearch',
    components: {
      MMediaGeneralCard,
      MSearchDetail,
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
        image_url: process.env.image_url,
        detail_dialog: false,
        detail_dialog_data: null,
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
      openDetail(data) {
        this.detail_dialog_data = data
        this.detail_dialog = true
      },
      closeDetailDialog(value) {
        this.detail_dialog = value
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
          data.image_path = `${this.image_url}${data.article.image}`

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
      },
    },
  }
</script>

<style scoped lang="scss">
  .search-container {
    width: 100%;
    margin: auto;

    .search-title {
      font-size: 36px;
    }
  }
</style>
