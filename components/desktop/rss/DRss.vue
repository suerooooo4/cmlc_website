<template>
  <div>
    <v-container>
      <section class="rss-container">
        <v-row>
          <v-col cols="12" class="rss">
            <h2 class="section-title">
              <span>
                {{ $t('RSS.TITLE') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="rss of rss_list" :key="rss.id" cols="4">
                <DRssCard :data="rss" :detail_path="rss.url" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <div v-if="total" class="pagination">
          <v-pagination
            v-model="page"
            @input="changePage()"
            :length="last_page"
            :total-visible="7"
          ></v-pagination>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script>
import DRssCard from '~/components/desktop/rss/DRssCard.vue'

export default {
  name: 'DRss',
  components: {
    DRssCard,
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
  async mounted() {
    await this.getRss()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async changePage() {
      this.openPage('', { page: this.page })
      await this.getRss()
    },
    async getRss() {
      let res = await this.$store.dispatch('rss_feed/get', {
        page: this.page,
        perPage: this.per_page,
      })

      this.rss_list = res.data.data.map((data) => {
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
.rss-container {
  padding: 25px 0 150px;

  .pagination {
    margin-top: 50px;
  }
}
</style>
