<template>
  <main>
    <MArticleBanner
      :title="$t('NEWS.TITLE')"
      :subtitle="$t('NEWS_ACTIVITY.SUBTITLE')"
      :image="'/images/banner-news-activity.png'"
    />
    <section class="back">
      <a
        @click="openPage('news-activity')"
        class="link d-flex align-center mt-4"
      >
        <v-btn icon>
          <i class="back"></i>
        </v-btn>
        {{ $t('NEWS.HEADER') }}
      </a>
    </section>
    <section class="news">
      <v-row>
        <v-col cols="6" v-for="item in news_list" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/news/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
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
   <!--  <v-dialog v-model="detail_dialog" fullscreen hide-overlay>
      <MNewsDetail :id="detail_dialog_id" @detail_dialog="closeDetailDialog" />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MNewsDetail from '~/components/mobile/news/MNewsDetail.vue'
  export default {
    name: 'MNews',
    components: {
      MArticleCard,
      MNewsDetail,
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
        news_list: [],
      }
    },
    methods: {
      openNewsDialog(id) {
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
          let res = await this.$store.dispatch('news/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
          })
          if (res.data.data.length >= 1) {
            this.news_list = this.news_list.concat(
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
  .news {
    margin-top: 1rem;
  }
</style>
