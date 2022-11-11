<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING_DOCUMENT.TITLE')"
      :subtitle="$t('TRAINING_VIDEO_DOCUMENT.SUBTITLE')"
      :image="'/images/banner-training-video-document.png'"
    />
    <section class="back">
      <a
        @click="openPage('training-video-document')"
        class="link d-flex align-center mt-4"
      >
        <v-btn icon>
          <i class="back"></i>
        </v-btn>
        {{ $t('TRAINING_DOCUMENT.HEADER') }}
      </a>
    </section>
    <section class="document">
      <v-row>
        <v-col cols="6" v-for="item in training_document" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training-document/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            :total_view="item.total_view"
            @open="openDocumentDialog(item.id)"
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
      <MTrainingDocumentDetail
        :id="detail_dialog_id"
        @detail_dialog="closeDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MTrainingDocumentDetail from '~/components/mobile/training-document/MTrainingDocumentDetail.vue'
  export default {
    name: 'MTrainingDocument',
    data() {
      return {
        image_url: process.env.image_url,
        detail_dialog: false,
        detail_dialog_id: null,
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
        training_document: [],
      }
    },
    components: {
      MArticleCard,
      MTrainingDocumentDetail,
      MArticleBanner,
    },
    methods: {
      openDocumentDialog(id) {
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
          let res = await this.$store.dispatch('training_document/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
          })
          if (res.data.data.length >= 1) {
            this.training_document = this.training_document.concat(
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
  .document {
    margin-top: 1rem;
  }
</style>
