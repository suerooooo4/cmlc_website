<template>
  <div>
    <v-container>
      <h2 class="section-title">
        <span>
          {{ $t('RSS.TITLE') }}
        </span>
      </h2>
      <section class="rss-container">
        <v-row>
          <v-col cols="12" class="rss">
            <v-row>
              <v-col v-for="rss of rss_list" :key="rss.id" cols="6">
                <MRssCard :data="rss" :detail_path="rss.url" />
              </v-col>
            </v-row>
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
    </v-container>
  </div>
</template>

<script>
import MRssCard from '~/components/mobile/rss/MRssCard.vue'

export default {
  name: 'MRss',
  components: {
    MRssCard,
  },
  data() {
    return {
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      per_page: 9,
      last_page: 0,
      total: 0,
      rss_list: [],
    }
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    infiniteScroll($state) {
      setTimeout(async () => {
        let res = await this.$store.dispatch('rss_feed/get', {
          page: this.page,
          perPage: this.per_page,
        })
        if (res.data.data.length >= 1) {
          this.rss_list = this.rss_list.concat(
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
.rss-container {
  padding: 25px 0 25px 0;

  .pagination {
    margin-top: 50px;
  }
}
</style>
