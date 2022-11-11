<template>
  <main>
    <MArticleBanner
      :title="$t('MEDIA_GENERAL.TITLE')"
      :image="'/images/banner-media-general.png'"
    />
    <section class="media-general-container">
      <v-container>
        <header class="header">
          <span class="header__topbar mt-4">
            <v-btn icon @click="openPage('/media-general', {})">
              <i class="back"></i>
            </v-btn>
            <a class="link" @click="openPage('/media-general', {})"
              >{{ $t('MEDIA_GENERAL.TITLE') }}&nbsp;&nbsp;&nbsp;</a
            >
          </span>
          <hr />
        </header>
      </v-container>
    </section>
    <section class="categories pt-3">
      <h1 class="categories__title">{{ $t('FORUM.CATEGORY') }}</h1>
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
                openCategory('/media-general/list', {
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
    <section class="search">
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-text-field
            append-icon="mdi-magnify"
            type="text"
            :label="$t('MEDIA_TRAINING.SEARCH')"
            v-model="form.keyword"
            @keyup="changeInput"
            @keydown="keyDownInput"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-select
            :items="sort_item"
            item-text="text"
            item-value="value"
            v-model="form.sort_by"
            @change="changeInput"
            :label="$t('MEDIA_TRAINING.SORT')"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </section>
    <section class="media_general">
      <div v-for="(item, index) in media_general" :key="index" class="pt-2">
        <MMediaGeneralCard
          @open="openMediaGeneralDialog(item.id)"
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
    <v-dialog v-model="media_general_dialog" fullscreen hide-overlay>
      <MMediaGeneralDetail
        :id.sync="media_general_dialog_id"
        @detail_dialog="closeMediaGeneralDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
  import MMediaGeneralDetail from '~/components/mobile/media-general/MMediaGeneralDetail.vue'
  export default {
    name: 'MMediaGeneralList',
    components: {
      MArticleBanner,
      MMediaGeneralCard,
      MMediaGeneralDetail,
    },
    data() {
      return {
        category_list: [],
        image_url: process.env.image_url,
        typingTimer: null,
        doneTypingInterval: 1000,
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
        media_category_id: this.$route.query.media_category_id
          ? parseInt(this.$route.query.media_category_id)
          : '',
        form: {
          keyword: '',
          sort_by: '',
        },
        page: 1,
        per_page: 8,
        last_page: 0,
        media_general: [],
        media_general_dialog: false,
        media_general_dialog_id: null,
      }
    },
    mounted() {
      this.getCategory()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      openCategory(path, query) {
        this.$router.push({ path, query })
        this.activeCategory(query.media_category_id)
        this.media_category_id = query.media_category_id
        this.getMedia()
      },
      activeCategory(id) {
        this.category_list.map((data) => (data.is_active = false))
        const index = this.category_list.findIndex((data) => data.id == id)
        this.category_list[index].is_active = !this.category_list[index].is_active
      },
      openMediaGeneralDialog(id) {
        this.media_general_dialog = true
        this.media_general_dialog_id = id
      },
      closeMediaGeneralDialog(value) {
        this.media_general_dialog = value
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
          id: 0,
          name_en: 'All',
          name_th: 'ทั้งหมด',
        })
        if (this.$route.query.media_category_id != null) {
          this.activeCategory(this.$route.query.media_category_id)
        } else {
          this.activeCategory(this.category_list[0].id)
        }
      },
      async modelGetMedia() {
        return await this.$store.dispatch('media_general/pagination', {
          page: this.page,
          perPage: this.per_page,
          keyword: this.form.keyword,
          orderBy: this.form.sort_by,
          isDesc: false,
          media_category_id:
            this.media_category_id != 0 ? this.media_category_id : '',
        })
      },
      async getMedia() {
        this.page = 1
        let res = await this.modelGetMedia()
        this.media_general = res.data.data.map((data) => {
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
            this.media_general = this.media_general.concat(
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
  .media-general-container {
    padding: 10px 0;
    .header {
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
    .v-sheet {
      background-color: unset;
      border-color: unset;
      color: #001538;
    }
  }
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
  .media-general-card {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
</style>
