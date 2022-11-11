<template>
  <div>
    <DArticleBanner
      :title="$t('GALLERY.TITLE')"
      :image="'/images/banner-cmlc-gallery.png'"
    />

    <v-container>
      <section class="gallery-container">
        <v-row>
          <v-col cols="12" class="gallery">
            <h2 class="gallery-title">
              <img class="pr-2" width="40" src="/images/gallery/gallery.png" />
              <span>
                {{ $t('GALLERY.HEADER') }}
              </span>
            </h2>

            <v-row>
              <v-col v-for="gallery of gallery_list" :key="gallery.id" cols="4">
                <DArticleCard
                  :data="gallery"
                  :detail_path="'/gallery/detail'"
                />
              </v-col>
            </v-row>
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
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

  export default {
    name: 'DGallery',
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
        gallery_list: [],
      }
    },
    async mounted() {
      await this.getGallery()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getGallery()
      },
      async getGallery() {
        let res = await this.$store.dispatch('gallery/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.gallery_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)
          data.image = data.gallery_image[0].image

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
      },
    },
  }
</script>

<style scoped lang="scss">
  .gallery-container {
    padding: 25px 0 150px;

    .gallery-title {
      margin: 30px 0 60px;
      font-size: 36px;
      text-align: center;
    }

    .pagination {
      margin-top: 50px;
    }
  }
</style>

<style lang="scss">
  .gallery-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
</style>

