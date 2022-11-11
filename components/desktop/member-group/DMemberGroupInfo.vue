<template>
  <div>
    <DArticleBanner
      :title="$t('MEMBER_GROUP_INFO.TITLE')"
      :image="'/images/banner-member-group.png'"
    />

    <div v-if="member_group">
      <section class="member-container">
        <v-container>
          <h2 class="section-title">
            <span>
              <i
                class="fa fa-chevron-left"
                @click="openPage('/member-group')"
              ></i>
              <!-- <img src="@/static/icon/group-member.png" width="40" /> -->
              {{
                `${$t('MEMBER_GROUP_INFO.MEMBER')}${$lang(
                  member_group.name_th,
                  member_group.name_en
                )}`
              }}
            </span>
          </h2>

          <v-row>
            <v-col v-for="member of member_list" :key="member.id" cols="4">
              <DMemberGroupMemberCard
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
        <v-container>
          <h2 class="section-title">
            <span>
              <i
                class="fa fa-chevron-left"
                @click="openPage('/member-group')"
              ></i>
              <!-- <img src="@/static/icon/group-work.png" width="30" /> -->

              {{
                `${$t('MEMBER_GROUP_INFO.PORTFOLIO')}${$lang(
                  member_group.name_th,
                  member_group.name_en
                )}`
              }}
            </span>
          </h2>

          <v-row v-if="portfolio_main" class="mb-5 pb-5 portfolio-main">
            <v-col cols="12" class="pb-0">
              <v-card class="mx-auto card-member-group hover-card">
                <v-row>
                  <v-col class="pt-0 pb-0">
                    <v-img
                      @click="
                        openPage('/member-group/portfolio-detail', {
                          member_group_id: member_group_id,
                          id: portfolio_main.id,
                        })
                      "
                      :src="`${image_url}${portfolio_main.image}`"
                    />
                  </v-col>

                  <v-col class="pb-0">
                    <p
                      @click="
                        openPage('/member-group/portfolio-detail', {
                          id: portfolio_main.id,
                          member_group_id: member_group_id,
                        })
                      "
                      class="topic"
                    >
                      {{
                        $lang(portfolio_main.name_th, portfolio_main.name_en)
                      }}
                    </p>

                    <p class="detail">
                      {{
                        $lang(
                          portfolio_main.detail_th,
                          portfolio_main.detail_en
                        )
                      }}
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-5 pt-5">
            <v-col
              v-for="portfolio of portfolio_list"
              :key="portfolio.id"
              cols="4"
            >
              <DArticleCard
                :data="portfolio"
                :detail_path="`/member-group/portfolio-detail?member_group_id=${member_group_id}`"
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
        </v-container>
      </section>
    </div>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'
  import DMemberGroupMemberCard from '~/components/desktop/member-group/DMemberGroupMemberCard.vue'

  export default {
    name: 'DMemberGroupInfo',
    components: {
      DArticleBanner,
      DArticleCard,
      DMemberGroupMemberCard,
    },
    data() {
      return {
        image_url: process.env.image_url,
        member_group_id: this.$route.query.id,
        member_group: null,
        member_list: [],
        portfolio_list: [],
        portfolio_main: null,
      }
    },
    async mounted() {
      await this.getMemberGroup()
      await this.getMember()
      await this.getPortfolio()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
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
          perPage: 6,
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
            perPage: 4,
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
    padding: 25px 0 50px;
  }

  .portfolio-container {
    padding: 25px 0 100px;
    background: #f8f7f6;

    .portfolio-title {
      margin: 30px 0 60px;
      font-size: 36px;
      text-align: center;
    }

    .portfolio-main {
      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
      }

      .topic {
        font-weight: bold;
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        cursor: pointer;
      }

      .detail {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 14;
        -webkit-box-orient: vertical;
      }
    }
  }
  .card-member-group {
    border-radius: 16px;
  }
  .card-member-group .v-image {
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
  }
</style>
