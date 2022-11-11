<template>
  <main>
    <MArticleBanner
      :title="$t('MEMBER_GROUP_INFO.TITLE')"
      :image="'/images/banner-member-group.png'"
    />
    <section class="member-container">
      <v-container>
        <header class="header">
          <span class="header__topbar mt-4">
            <v-btn
              icon
              @click="
                openPage('/member-group', {
                  member_group_id: member_group_id,
                })
              "
            >
              <i class="back"></i>
            </v-btn>
            <a
              class="link"
              @click="
                openPage('/member-group', {
                  member_group_id: member_group_id,
                })
              "
              >{{
                `${$t('MEMBER_GROUP_INFO.MEMBER')}${$lang(
                  member_group.name_th,
                  member_group.name_en
                )}`
              }}&nbsp;&nbsp;&nbsp;</a
            >
          </span>
          <hr />
        </header>

        <v-row>
          <v-col v-for="member of member_list" :key="member.id" cols="6">
            <MMemberGroupMemberCard
              :data="member"
              :detail_path="'/member-group/portfolio-detail'"
            />
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn
              @click="
                openPage('/member-group/member', {
                  member_group_id: member_group_id,
                })
              "
              large
              color="primary"
            >
              {{ $t('MEMBER_GROUP_INFO.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="portfolio-container">
      <header class="header">
        <span class="header__topbar mt-4">
          <v-btn
            icon
            @click="
              openPage('/member-group', {
                member_group_id: member_group_id,
              })
            "
          >
            <i class="back"></i>
          </v-btn>
          <a
            class="link"
            @click="
              openPage('/member-group', {
                member_group_id: member_group_id,
              })
            "
          >
            {{
              `${$t('MEMBER_GROUP_INFO.PORTFOLIO')}${$lang(
                member_group.name_th,
                member_group.name_en
              )}`
            }}
            &nbsp;&nbsp;&nbsp;</a
          >
        </span>
        <hr />
      </header>
      <v-row v-if="portfolio_main">
        <v-col cols="6" class="pr-0">
          <div class="thumbnail-video">
            <img
              @click="openPortfolioDialog(portfolio_main.id)"
              :src="`${image_url}${portfolio_main.image}`"
            />
            <v-btn icon @click="openPortfolioDialog(portfolio_main.id)">
              <i class="play"></i>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="6" class="pl-0">
          <div class="portfolio-container__content pl-2 pt-2">
            <h1
              class="portfolio-container__content-title"
              @click="openPortfolioDialog(portfolio_main.id)"
            >
              {{ $lang(portfolio_main.name_th, portfolio_main.name_en) }}
            </h1>
            <div class="portfolio-container__content-detail">
              {{ $lang(portfolio_main.detail_th, portfolio_main.detail_en) }}
            </div>
            <p class="portfolio-container__content-readMore">
              <v-btn
                depressed
                color="primary"
                @click="openPortfolioDialog(portfolio_main.id)"
              >
                อ่านเพิ่มเติม <i class="circle-next"></i
              ></v-btn>
            </p>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6" v-for="item in portfolio_list" :key="item.id">
          <MArticleCard
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            @open="openPortfolioDialog(item.id)"
          />
        </v-col>
      </v-row>

      <v-row class="mt-5">
        <v-col class="text-center">
          <v-btn
            @click="
              openPage('/member-group/portfolio', {
                member_group_id: member_group_id,
              })
            "
            large
            color="primary"
          >
            {{ $t('MEMBER_GROUP_INFO.ACTION_MORE') }}
          </v-btn>
        </v-col>
      </v-row>
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
  import MMemberGroupMemberCard from '~/components/mobile/member-group/MMemberGroupMemberCard.vue'
  import MMemberGroupPortfolioDetail from '~/components/mobile/member-group/MMemberGroupPortfolioDetail.vue'
  export default {
    name: 'MMemberGroupInfo',
    components: {
      MArticleBanner,
      MMemberGroupMemberCard,
      MArticleCard,
      MMemberGroupPortfolioDetail,
    },
    data() {
      return {
        image_url: process.env.image_url,
        member_group_id: this.$route.query.id,
        member_group: {
          name: null,
        },
        member_list: [],
        portfolio_list: [],
        portfolio_main: null,
        portfolio_detail_dialog: false,
        portfolio_detail_id: null,
      }
    },
    mounted() {
      this.getMemberGroup()
      this.getMember()
      this.getPortfolio()
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
      async getMemberGroup() {
        let res = await this.$store.dispatch(
          'member_group/find',
          this.member_group_id
        )

        this.member_group = res.data
      },
      async getMember() {
        let res = await this.$store.dispatch('member_group_member/pagination', {
          page: 1,
          perPage: 4,
          orderBy: 'created_at',
          isDesc: true,
          member_group_id: this.member_group_id,
        })

        this.member_list = res.data.data
      },
      async getPortfolio() {
        let res = await this.$store.dispatch(
          'member_group_portfolio/pagination',
          {
            page: 1,
            perPage: 5,
            orderBy: 'created_at',
            isDesc: true,
            member_group_id: this.member_group_id,
          }
        )

        this.portfolio_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
        this.portfolio_main = this.portfolio_list[0]
        this.portfolio_list.shift()
      },
    },
  }
</script>

<style scoped lang="scss">
  .member-container {
    padding: 10px 0;
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
        .thumbnail-video {
          position: relative;
          img {
            max-width: 100%;
            box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
            height: 150px;
            object-fit: cover;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
          .v-btn {
            position: absolute;
            left: 37%;
            top: 37%;
            i.play {
              width: 30px;
              height: 30px;
            }
          }
        }
        .portfolio-container__content {
          background: #ffffff;
          height: 150px;
          text-align: left;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
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
