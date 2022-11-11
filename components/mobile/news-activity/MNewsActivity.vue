<template>
  <main>
    <MArticleBanner
      :title="$t('NEWS_ACTIVITY.TITLE')"
      :subtitle="$t('NEWS_ACTIVITY.SUBTITLE')"
      :image="'/images/banner-news-activity.png'"
    />
    <section class="show">
      <v-row>
        <v-col cols="6">
          <span class="show__title">{{ $t('NEWS_ACTIVITY.NEWS') }}</span>
          <hr />
          <div class="show__content" v-if="latest_news[0]">
            <MArticleCard
              :detail_path="'/news/detail'"
              :data="latest_news[0]"
              :image_path="image_url + latest_news[0].image"
              :subtitle="latest_news[0].created_at"
              :title="$lang(latest_news[0].name_th, latest_news[0].name_en)"
              :detail="
                $lang(latest_news[0].detail_th, latest_news[0].detail_en)
              "
            />
          </div>
        </v-col>
        <v-col cols="6">
          <span class="show__title">{{ $t('NEWS_ACTIVITY.HOT') }}</span>
          <hr />
          <div class="show__content">
            <v-row
              class="content-hot"
              v-for="(item, index) in top_news.slice(0, 3)"
              :key="item.id"
              @click="openPage('/news/detail',{id:item.id})"
            >
              <v-col cols="2">
                <h1>0{{ index + 1 }}</h1></v-col
              >
              <v-col cols="10">
                <div>
                  <p class="date">{{ item.created_at }}</p>
                  <h2 class="content-title">
                    {{ $lang(item.name_th, item.name_en) }}
                  </h2>
                  <p class="detail">
                    {{ $lang(item.detail_th, item.detail_en) }}
                  </p>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </section>

    <section class="news">
      <v-row>
        <v-col
          cols="6"
          v-for="(item, index) in latest_news"
          :key="index"
          v-show="index != 0"
        >
          <MArticleCard
            :detail_path="'/news/detail'"
            :data="item"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn depressed color="primary" @click="openPage('news')">
          {{ $t('NEWS_ACTIVITY.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>

  <!--   <v-dialog v-model="news_detail_dialog" fullscreen hide-overlay>
      <MNewsDetail
        :id="dialog_news_id"
        @detail_dialog="closeNewsDetailDialog"
      />
    </v-dialog> -->

  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MNewsDetail from '~/components/mobile/news/MNewsDetail.vue'

  export default {
    name: 'MNewsActivity',
    components: {
      MArticleCard,
      MNewsDetail,
    
      MArticleBanner,
    },
    data() {
      return {
        news_detail_dialog: false,
       
        dialog_news_id: null,
   
        image_url: process.env.image_url,
        top_news: [],
        latest_news: [],
     
      }
    },
    async mounted() {
      await this.getTopNews()
      await this.getLatestNews()
      
    },
    methods: {
      openNewsDialog(id) {
        this.news_detail_dialog = true
        this.dialog_news_id = id
      },
  
      openPage(path, query = null) {
      this.$router.push({ path, query })
      },
      closeNewsDetailDialog(value) {
        this.news_detail_dialog = value
      },
    
      async getTopNews() {
        let res = await this.$store.dispatch('news/pagination', {
          page: 1,
          perPage: 5,
          orderBy: 'total_view',
          isDesc: true,
        })

        this.top_news = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
      async getLatestNews() {
        let res = await this.$store.dispatch('news/pagination', {
          page: 1,
          perPage: 3,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.latest_news = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
    
    },
  }
</script>

<style scoped lang="scss">
  .show {
    margin-top: 0.5rem;

    &__title {
      font-size: 1rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }
    &__content {
      .content-hot:not(:first-child) {
        margin-top: -12px;
      }
      margin-top: 15px;
      h2 {
        font-size: 14px;
        padding-left: 7px;
        color: #001538;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .date {
        color: #b2b2b2;
        font-size: 12px;
        padding-left: 7px;
        margin-bottom: 0;
      }
      .detail {
        color: #b2b2b2;
        font-size: 12px;
        padding: 0 7px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ccc;
      padding: 0;
    }
  }

  .news {
    .submit {
      color: #001538 !important;
      border: 1px solid #001538 !important;
      background-color: transparent !important;
    }
  }

</style>
