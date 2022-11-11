<template>
  <main>
    <MArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.png'"
    />
    <section class="categories pt-3">
      <h1 class="categories__title">{{ $t('MEDIA_GENERAL.CATEGORY') }}</h1>
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
                openCategory('/media-general', {
                  media_category_id: item.id,
                })
              "
            >
              {{ $lang(item.name_th, item.name_en) }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>

    <section class="media_general">
      <h3 class="section-title">
        <span v-if="media_general.length">
          <i class="fa fa-chevron-left" @click="openPage('/media-general')"></i>
          {{
            $lang(
              media_general[0].media_playlist.name_th,
              media_general[0].media_playlist.name_en
            )
          }}
        </span>
      </h3>
      <div
        v-for="(item, index) in media_general"
        :key="index"
        class="pt-2 mb-2"
      >
        <MMediaGeneralCard
          :detail_path="'/media-general/detail'"
          :data="item"
          :is_video="true"
          :is_total_view="true"
          class="media-general-card pb-2"
        />
      </div>
      <v-row class="mt-5">
        <v-col class="text-center">
          <v-btn @click="openPage('/media-general/list')" large color="primary">
            {{ $t('MEDIA_GENERAL.ACTION_MORE') }}
          </v-btn>
        </v-col>
      </v-row>
    </section>

    <!-- <section class="media_global">
      <v-container>
        <header class="header">
          <span class="header__topbar mt-4">
            <a
              class="link"
              @click="
                openPage('/member-group', {
                  member_group_id: member_group_id,
                })
              "
              >&nbsp;&nbsp;{{ $t('MEDIA_GLOBAL.TITLE') }}</a
            >
          </span>
          <hr />
        </header>
      </v-container>
      <div v-for="(item, index) in media_global" :key="index">
        <MMediaGeneralCard
          @open="openMediaGlobalDialog(item.id)"
          :data="item"
        />
      </div>
      <v-row class="mt-5">
        <v-col class="text-center">
          <v-btn
            @click="openPage('/media-global')"
            large
            outlined
            color="primary"
          >
            {{ $t('MEDIA_GENERAL.ACTION_MORE') }}
          </v-btn>
        </v-col>
      </v-row>
    </section> -->

  <!--   <v-dialog v-model="media_general_dialog" fullscreen hide-overlay>
      <MMediaGeneralDetail
        :id.sync="media_general_dialog_id"
        @detail_dialog="closeMediaGeneralDialog"
      />
    </v-dialog>
    <v-dialog v-model="media_global_dialog" fullscreen hide-overlay>
      <MMediaGlobalDetail
        :id.sync="media_global_dialog_id"
        @detail_dialog="closeMediaGlobalDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
  import MMediaGeneralDetail from '~/components/mobile/media-general/MMediaGeneralDetail.vue'
  import MMediaGlobalDetail from '~/components/mobile/media-global/MMediaGlobalDetail.vue'
  export default {
    name: 'MMediaGeneral',
    components: {
      MArticleBanner,
      MMediaGeneralCard,
      MMediaGeneralDetail,
      MMediaGlobalDetail,
    },
    data() {
      return {
        media_playlist_id: this.$route.query.media_playlist_id
          ? parseInt(this.$route.query.media_playlist_id)
          : '',
        form: {
          keyword: '',
          sort_by: '',
        },
        page: 1,
        per_page: 4,
        last_page: 0,
        total: 0,
        typingTimer: null,
        doneTypingInterval: 1000,
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
        media_general: [],
        media_global: [],
        media_general_dialog: false,
        media_general_dialog_id: null,
        media_global_dialog: false,
        media_global_dialog_id: null,
      }
    },
    mounted() {
      this.getCategory()
      this.getMedia()
      this.getMediaGlobal()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      openCategory(path, query) {
        this.$router.push({ path, query })
        this.$store.commit(
          'media_playlist/setMediaCategoryId',
          query.media_category_id
        )
      },
      openMediaGeneralDialog(id) {
        this.media_general_dialog = true
        this.media_general_dialog_id = id
      },
      closeMediaGeneralDialog(value) {
        this.media_general_dialog = value
      },
      openMediaGlobalDialog(id) {
        this.media_global_dialog = true
        this.media_global_dialog_id = id
      },
      closeMediaGlobalDialog(value) {
        this.media_global_dialog = value
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
      activeCategory(id) {
        this.category_list.map((data) => (data.is_active = false))
        const index = this.category_list.findIndex((data) => data.id == id)
        this.category_list[index].is_active = !this.category_list[index].is_active
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
          name_th: 'ทั้งหมด',
        })
        this.activeCategory(this.$store.state.media_playlist.activeMenu)
      },
      async getMedia() {
        this.page = 1
        let res = await this.$store.dispatch('media_general/pagination', {
          page: this.page,
          perPage: this.per_page,
          keyword: this.form.keyword,
          orderBy: this.form.sort_by,
          isDesc: false,
          media_playlist_id: this.media_playlist_id,
        })
        this.media_general = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      async getMediaGlobal() {
        this.page = 1
        let res = await this.$store.dispatch('media_global/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: false,
        })
        this.media_global = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
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
  .media_global {
    .header {
      margin-bottom: 15px;
      &__topbar {
        color: #001538;
        position: relative;

        &:after {
          content: '';
          display: block;
          width: 100%;
          height: 6px;
          border-radius: 6px;
          background: #000;
          position: absolute;
          bottom: -11px;
          left: 0;
        }
        .link {
          color: #001538;
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
  }
  .media_general {
    margin-top: 15px;
  }
  .media-general-card {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
</style>
