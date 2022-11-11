<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING.TITLE')"
      :subtitle="$t('TRAINING.SUBTITLE')"
      :image="'/images/banner-training.png'"
    />
    <section class="back">
      <a @click="openPage('../training')" class="link d-flex align-center mt-4">
        <v-btn icon>
          <i class="back"></i>
        </v-btn>
        {{ $t('TRAINING.HEADER') }}
      </a>
    </section>
    <section class="training">
      <v-row>
        <v-col cols="6" v-for="(item, index) in training_list" :key="index">
          <MArticleCard
            :data="item" :detail_path="'/training/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            @open="openTrainingDialog(item.id)"
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
    <!-- <v-dialog v-model="detail_dialog" fullscreen hide-overlay>
      <MTrainingDetail
        :id="detail_dialog_id"
        @detail_dialog="closeDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MTrainingDetail from '~/components/mobile/training/MTrainingDetail.vue'
  export default {
    name: 'MTrainingList',
    data() {
      return {
        image_url: process.env.image_url,
        type: this.$route.query.type,
        page: 1,
        per_page: 8,
        last_page: 0,
        detail_dialog: false,
        detail_dialog_id: null,
        training_list: [],
      }
    },
    components: {
      MArticleCard,
      MTrainingDetail,
      MArticleBanner,
    },
    methods: {
      openTrainingDialog(id) {
        this.detail_dialog = true
        this.detail_dialog_id = id
      },
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      closeDetailDialog(value) {
        this.detail_dialog = value
      },
      infiniteScroll($state) {
        setTimeout(async () => {
          let res = await this.$store.dispatch('training/pagination', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
            type: this.type,
          })
          if (res.data.data.length >= 1) {
            this.training_list = this.training_list.concat(
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
  .training {
    margin-top: 1rem;
  }
</style>
