<template>
  <main>
    <MArticleBanner
      :title="$t('MEMBER_GROUP.TITLE')"
      :image="'/images/banner-member-group.png'"
    />
    <section class="portfolio-container">
      <header class="header">
        <span class="header__topbar mt-4">
          <v-btn
            icon
            @click="
              openPage('/member-group/info', {
                id: member_group_id,
              })
            "
          >
            <i class="back"></i>
          </v-btn>
          <a
            class="link"
            @click="
              openPage('/member-group/info', {
                id: member_group_id,
              })
            "
          >
            {{ $t('MEMBER_GROUP_PORTFOLIO.HEADER') }} &nbsp;&nbsp;&nbsp;</a
          >
        </span>
        <hr />
      </header>
      <v-row>
        <v-col cols="6" v-for="(item, index) in portfolio_list" :key="index.id">
          <MArticleCard
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            @open="openPortfolioDialog(item.id)"
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
    <v-dialog v-model="portfolio_detail_dialog" fullscreen hide-overlay>
      <MMemberGroupPortfolioDetail
        :id="portfolio_detail_id"
        @detail_dialog="closePortfolioDetailDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MMemberGroupPortfolioDetail from '~/components/mobile/member-group/MMemberGroupPortfolioDetail.vue'
  export default {
    name: 'MMemberGroupPortfolio',
    components: {
      MArticleBanner,
      MArticleCard,
      MMemberGroupPortfolioDetail,
    },
    data() {
      return {
        image_url: process.env.image_url,
        member_group_id: this.$route.query.member_group_id,
        portfolio_list: [],
        portfolio_detail_dialog: false,
        portfolio_detail_id: null,
        page: 1,
        per_page: 8,
        last_page: 0,
        total: 0,
      }
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      openPortfolioDialog(id) {
        this.portfolio_detail_dialog = true
        this.portfolio_detail_id = id
      },
      closePortfolioDetailDialog(value) {
        this.portfolio_detail_dialog = value
      },
      async modelGetMedia() {
        return await this.$store.dispatch('member_group_portfolio/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
          member_group_id: this.member_group_id,
        })
      },
      async getMedia() {
        this.page = 1
        let res = await this.modelGetMedia()
        this.portfolio_list = res.data.data.map((data) => {
          data.name_th = this.$stripHtml(data.name_th)
          data.name_en = this.$stripHtml(data.name_en)

          return data
        })
        this.$refs.infiniteloading.stateChanger.reset()
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      infiniteScroll($state) {
        setTimeout(async () => {
          let res = await this.modelGetMedia()
          if (res.data.data.length >= 1) {
            this.portfolio_list = this.portfolio_list.concat(
              res.data.data.map((data) => {
                data.name_th = this.$stripHtml(data.name_th)
                data.name_en = this.$stripHtml(data.name_en)

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
  .portfolio-container {
    width: 100vw;
    margin-top: 13px;
    margin-left: -12px;
    background: #f8f7f6;
    .header {
      padding: 10px 0;
      margin: 0 24px;

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
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }
    .row {
      margin: 12px;

      .col {
        .portfolio-container__content {
          text-align: left;
          &-title {
            font-size: 16px;
            color: #001538;
          }
          &-subtitle {
            font-size: 12px;
            color: #001538;
          }
          &-detail,
          &-date {
            font-size: 12px;
            margin: 0;
            color: #b2b2b2;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          &-readMore {
            .v-btn {
              padding: 0;
              font-size: 12px;
              color: #001538;
              background-color: transparent !important;
            }
          }
        }
      }
    }
  }
</style>
