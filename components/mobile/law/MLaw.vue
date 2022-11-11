<template>
  <main>
    <MArticleBanner
      :title="$t('LAW.TITLE')"
      :subtitle="$t('COURSE_LAW.SUBTITLE')"
      :image="'/images/banner-course-law.png'"
    />
    <section class="back">
      <a @click="openPage('course-law')" class="link d-flex align-center mt-4">
        <v-btn icon>
          <i class="back"></i>
        </v-btn>
        {{
          law_list.length
            ? $lang(
                law_list[0].law_category.name_th,
                law_list[0].law_category.name_en
              )
            : $t('COURSE_LAW.LAW')
        }}
      </a>
    </section>
    <section class="law">
      <v-row>
        <v-col cols="6" v-for="(item, index) in law_list" :key="index">
          <MArticleCard
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :total_view="item.total_view"
            :data="item"
            :detail_path="'/law/detail'"
          />
        </v-col>
      </v-row>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
        force-use-infinite-wrapper=".el-table__body-wrapper"
        ref="infiniteloading"
      >
        <div slot="no-more"></div>
        <div slot="no-results"></div>
      </infinite-loading>
    </section>
<!--     <v-dialog v-model="detail_dialog" fullscreen hide-overlay>
      <MLawDetail :id="detail_dialog_id" @detail_dialog="closeDetailDialog" />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MLawDetail from '~/components/mobile/law/MLawDetail.vue'
  export default {
    name: 'MLaw',
    components: {
      MArticleCard,
      MLawDetail,
      MArticleBanner,
    },
    data() {
      return {
        detail_dialog: false,
        detail_dialog_id: null,
        image_url: process.env.image_url,
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
        law_list: [],
        law_category_id: this.$route.query.law_category_id,
      }
    },
    methods: {
      openLawDialog(id) {
        this.detail_dialog = true
        this.detail_dialog_id = id
      },
      openPage(path) {
        this.$router.push({ path: path })
      },
      closeDetailDialog(value) {
        this.detail_dialog = value
      },
      infiniteScroll($state) {
        setTimeout(async () => {
          let res = await this.$store.dispatch('law/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
            law_category_id: this.law_category_id,
          })
          if (res.data.data.length >= 1) {
            this.law_list = this.law_list.concat(
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
  .back {
    .link {
      color: #001538;
    }
  }
  .law {
    margin-top: 1rem;
  }
</style>
