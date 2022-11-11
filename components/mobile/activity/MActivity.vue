<template>
  <main>
    <MArticleBanner
      :title="$t('ACTIVITY.TITLE')"
      :subtitle="$t('NEWS_ACTIVITY.SUBTITLE')"
      :image="'/images/banner-news-activity.jpg'"
    />

    <section class="back">
      <a
        @click="openPage('training')"
        class="link d-flex align-center mt-4"
      >
        <v-btn icon>
          <i class="back"></i>
        </v-btn>
        {{ $t('ACTIVITY.HEADER') }}
      </a>
    </section>
    <section class="activity">
      <v-row>
        <v-col cols="6" v-for="item in activity_list" :key="item.id">
          <MArticleCard
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :data="item"
            :detail_path="'/activity/detail'"
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
      <MActivityDetail
        :id="detail_dialog_id"
        @detail_dialog="closeDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
import MActivityDetail from '~/components/mobile/activity/MActivityDetail.vue'
import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
export default {
  name: 'MActivity',
  components: {
    MArticleCard,
    MActivityDetail,
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
      activity_list: [],
    }
  },
  methods: {
    openActivityDialog(id) {
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
        let res = await this.$store.dispatch('activity/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        if (res.data.data.length >= 1) {
          this.activity_list = this.activity_list.concat(
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
.activity {
  margin-top: 1rem;
}
</style>
