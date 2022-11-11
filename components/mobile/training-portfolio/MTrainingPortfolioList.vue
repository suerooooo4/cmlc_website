<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING_PORTFOLIO.TITLE')"
      :subtitle="$t('TRAINING_PORTFOLIO.SUBTITLE')"
      :image="'/images/banner-training-portfolio.png'"
    />
    <section class="back">
      <a
        @click="openPage('../training-portfolio')"
        class="link d-flex align-center mt-4"
      >
        <v-btn icon>
          <i class="back"></i>
        </v-btn>
        {{ $t('TRAINING_PORTFOLIO.ALL.TITLE') }}
      </a>
    </section>
    <section class="training_portfolio">
      <v-row>
        <v-col cols="6" v-for="item in training_portfolio" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training-portfolio/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :total_view="item.total_view"
            :is_read_more="true"
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
    <!-- <v-dialog v-model="detail_dialog" fullscreen hide-overlay>
      <MTrainingPortfolioDetail
        :id="detail_dialog_id"
        @detail_dialog="closeDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MTrainingPortfolioDetail from '~/components/mobile/training-portfolio/MTrainingPortfolioDetail.vue'
  export default {
    name: 'MTrainingPortfolioList',
    data() {
      return {
        image_url: process.env.image_url,
        detail_dialog: false,
        detail_dialog_id: null,
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
        training_portfolio: [],
      }
    },
    components: {
      MArticleCard,
      MTrainingPortfolioDetail,
      MArticleBanner,
    },
    methods: {
      openTrainingPortfolioDialog(id) {
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
          let res = await this.$store.dispatch('training_portfolio/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
          })
          if (res.data.data.length >= 1) {
            this.training_portfolio = this.training_portfolio.concat(
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
  .training_portfolio {
    margin-top: 1rem;
  }
</style>
