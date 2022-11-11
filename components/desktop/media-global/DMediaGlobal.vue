<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_GLOBAL.TITLE')"
      :image="'/images/banner-media-general.jpg'"
    />

    <v-container>
      <section class="media-global-container">
        <v-row>
          <v-col cols="12" class="media-global">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/media-general')"
                ></i>
                {{ $t('MEDIA_GLOBAL.TITLE') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="media of media_global" :key="media.id" cols="4">
                <DArticleCard
                  :data="media"
                  :detail_path="'/media-global/detail'"
                />
              </v-col>
            </v-row>

            <div class="pagination">
              <v-pagination
                v-model="page"
                @input="changePage()"
                :length="last_page"
                :total-visible="7"
              ></v-pagination>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

export default {
  name: 'DMediaGlobal',
  components: {
    DArticleBanner,
    DArticleCard,
  },
  data() {
    return {
      page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
      per_page: 9,
      last_page: 0,
      total: 0,
      media_global: [],
    }
  },
  async mounted() {
    await this.getMediaGlobal()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async changePage() {
      this.openPage('', { page: this.page })
      await this.getMediaGlobal()
    },
    async getMediaGlobal() {
      let res = await this.$store.dispatch('media_global/pagination', {
        page: this.page,
        perPage: this.per_page,
        orderBy: 'created_at',
        isDesc: true,
      })

      this.media_global = res.data.data.map((data) => {
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
.media-global-container {
  padding: 25px 0 150px;

  .pagination {
    margin-top: 50px;
  }
}
</style>
