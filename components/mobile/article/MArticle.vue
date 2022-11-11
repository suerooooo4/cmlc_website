<template>
  <main>
    <MArticleBanner
      :title="$t('ARTICLE.TITLE')"
      :subtitle="$t('ARTICLE.SUBTITLEARTICLE')"
      :image="'/images/banner-course-law.png'"
    />
    <section class="back">
      <a @click="openPage('course-law')" class="link d-flex align-center mt-4">
        <v-btn icon>
            <img class="pr-2" width="40" src="/images/course-law/article.png" />
        </v-btn>
        {{ $t('ARTICLE.HEADER') }}
      </a>
    </section>
    <section class="article">
      <v-row>
        <v-col cols="6" v-for="item in article_list" :key="item.id">
          <MArticleCard
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :total_view="item.total_view"
            :data="item"
            :detail_path="'/article/detail'"
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
      <MArticleDetail
        :id="detail_dialog_id"
        @detail_dialog="closeDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleDetail from '~/components/mobile/article/MArticleDetail.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  export default {
    name: 'MArticle',
    components: {
      MArticleCard,
      MArticleDetail,
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
        article_list: [],
      }
    },

    methods: {
      openArticleDialog(id) {
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
          let res = await this.$store.dispatch('article/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
          })
          if (res.data.data.length >= 1) {
            this.article_list = this.article_list.concat(
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
  .article {
    margin-top: 1rem;
  }
</style>
