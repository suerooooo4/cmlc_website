<template>
  <main>
    <MArticleBanner
      :title="$t('MEDIA_TRAINING.TITLE')"
      :image="'/images/banner-media-training.png'"
    />
    <section class="categories pt-3">
      <h1 class="categories__title">{{ $t('MEDIA_TRAINING.CATEGORY') }}</h1>
      <v-sheet class="mx-auto pt-2 pb-3" max-width="700">
        <v-slide-group class="a" show-arrows>
          <v-slide-item v-for="item in category_list" :key="item.id">
            <v-btn
              class="mx-2"
              :input-value="item.is_active"
              active-class="gray indigo--text"
              depressed
              rounded
              @click="
                openCategory('/media-training', { media_category_id: item.id })
              "
            >
              {{ $lang(item.name_th, item.name_en) }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>

    <section class="media_training">
      <h3 class="section-title">
        <span v-if="media_training.length">
          <i
            class="fa fa-chevron-left"
            @click="openPage('/media-training')"
          ></i>
          {{
            $lang(
              media_training[0].media_playlist.name_th,
              media_training[0].media_playlist.name_en
            )
          }}
        </span>
      </h3>
      <div
        v-for="(item, index) in media_training"
        :key="index"
        class="pt-2 mb-2"
      >
        <MMediaGeneralCard
          :detail_path="'/media-training/detail'"
          :data="item"
          :is_video="true"
          :is_total_view="true"
          class="media-general-card pb-2"
        />
      </div>
    </section>
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      ref="infiniteloading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <!-- <v-dialog v-model="media_training_dialog" fullscreen hide-overlay>
      <MMediaTrainingDetail
        :id="media_training_dialog_id"
        @detail_dialog="closeMediaGeneralDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
  import MMediaTrainingDetail from '~/components/mobile/media-training/MMediaTrainingDetail.vue'
  export default {
    name: 'MMediaTraining',
    components: {
      MArticleBanner,
      MMediaGeneralCard,
      MMediaTrainingDetail,
    },
    data() {
      return {
        image_url: process.env.image_url,
        category_list: [],
        sort_item: [
          {
            value: 'created_at',
            text: this.$t('SHARED.SORT_ORDER.CREATE_DATE'),
          },
          {
            value: this.$lang('name_th', 'name_en'),
            text: this.$t('SHARED.SORT_ORDER.NAME'),
          },
        ],

        media_playlist_id: this.$route.query.media_playlist_id
          ? parseInt(this.$route.query.media_playlist_id)
          : '',
        form: {
          keyword: '',
          sort_by: '',
        },
        typingTimer: null,
        doneTypingInterval: 1000,
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
        media_training: [],
        media_global: [],
        media_global_main: null,
        media_training_dialog: false,
        media_training_dialog_id: null,
        media_global_dialog: false,
        media_global_dialog_id: null,
      }
    },
    mounted() {
      this.getCategory()
      // this.getMedia()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      openCategory(path, query) {
        this.$router.push({ path, query })
        this.activeCategory(query.media_category_id)
        this.media_category_id = query.media_category_id
        this.$store.commit(
          'media_playlist/setMediaCategoryId',
          query.media_category_id
        )
        this.getMedia()
      },
      activeCategory(id) {
        this.category_list.map((data) => (data.is_active = false))
        const index = this.category_list.findIndex((data) => data.id == id)
        this.category_list[index].is_active = !this.category_list[index].is_active
      },
      openMediaGeneralDialog(id) {
        this.media_training_dialog = true
        this.media_training_dialog_id = id
      },
      closeMediaGeneralDialog(value) {
        this.media_training_dialog = value
      },
      keyDownInput(event) {
        clearTimeout(this.typingTimer)
      },
      changeInput(event) {
        clearTimeout(this.typingTimer)
        this.typingTimer = setTimeout(async () => {
          this.getMedia()
        }, this.doneTypingInterval)
      },
      async getCategory() {
        let res = await this.$store.dispatch('media_category/get')
        this.category_list = res.data.map((data) => {
          data.is_active = false
          return data
        })
        this.category_list.unshift({
          id: '',
          name_en: 'All',
          name_th: '?????????????????????',
        })
        this.activeCategory(this.$store.state.media_playlist.activeMenu)
      },
      async modelGetMedia() {
        return await this.$store.dispatch('media_training/pagination', {
          page: this.page,
          perPage: this.per_page,
          keyword: this.form.keyword,
          orderBy: this.form.sort_by,
          isDesc: false,
          media_playlist_id: await this.media_playlist_id,
        })
      },
      async getMedia() {
        this.page = 1
        let res = await this.modelGetMedia()
        this.media_training = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.$refs.infiniteloading.stateChanger.reset()
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      infiniteScroll($state = null) {
        setTimeout(async () => {
          let res = await this.modelGetMedia()
          if (res.data.data.length >= 1) {
            this.media_training = this.media_training.concat(
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
  .categories {
    max-width: 100vw;
    background-color: #f8f7f6;
    margin-left: -12px;
    margin-right: -12px;

    &__title {
      text-align: center;
      padding-top: 15px;
      font-size: 20px;
    }
    .v-sheet {
      background-color: unset;
      border-color: unset;
      color: #001538;
    }
  }
  .search {
    margin-top: 1rem;

    .v-input {
      .v-text-field__details {
        display: none !important;
      }
    }

    .v-btn {
      margin: 0 5px;
      background: #001538;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      color: #fff;
      width: 45%;
      height: 56px;
      padding: 7px 13px;
    }
  }
  .media_training {
    margin-top: 15px;
  }
  .media-general-card {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
</style>
