<template>
  <main>
    <MArticleBanner
      :title="$t('GALLERY.TITLE')"
      :image="'/images/banner-cmlc-gallery.png'"
    />

    <section class="info-header">
      <h1 class="info-header__title">{{ $t('GALLERY.INFO_HEADER.TITLE') }}</h1>
    </section>
    <section class="gallery_card">
      <v-row>
        <v-col cols="6" v-for="(item, index) in gallery_list" :key="index">
          <MArticleCard
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :is_gallery="true"
            :data="item"
            :detail_path="'/gallery/detail'"
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
    <v-dialog v-model="gallery_list_dialog" fullscreen hide-overlay>
      <MGalleryList
        :id="gallery_dialog_id"
        @detail_dialog="closeGalleryListDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MGalleryList from '~/components/mobile/gallery/MGalleryList.vue'
  export default {
    name: 'MGallery',
    components: {
      MArticleCard,
      MGalleryList,
      MArticleBanner,
    },
    data() {
      return {
        gallery_dialog_id: null,
        gallery_list_dialog: false,
        image_url: process.env.image_url,
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
        gallery_list: [],
      }
    },
    methods: {
      closeGalleryListDialog(value) {
        this.gallery_list_dialog = value
      },
      openGalleryDialog(id) {
        this.gallery_list_dialog = true
        this.gallery_dialog_id = id
      },
      infiniteScroll($state) {
        setTimeout(async () => {
          let res = await this.$store.dispatch('gallery/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
          })
          if (res.data.data.length >= 1) {
            this.gallery_list = this.gallery_list.concat(
              res.data.data.map((data) => {
                data.detail_th = this.$stripHtml(data.detail_th)
                data.detail_en = this.$stripHtml(data.detail_en)
                data.image = data.gallery_image[0].image
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
  .info-header {
    width: 100vw;
    margin: 13px 0 13px -12px;
    text-align: center;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }

    &__detail {
      font-size: 12px;
      padding: 0px 20px;
    }
  }
</style>
