<template>
  <div>
    <DArticleBanner
      :title="$t('NEWS_ACTIVITY.TITLE')"
      :subtitle="$t('NEWS_ACTIVITY.SUBTITLE')"
      :image="'/images/banner-news-activity.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/activity', { page: previous_page })"
                ></i>
                {{ $t('ACTIVITY.HEADER') }}
              </span>
            </h2>

            <v-row v-if="activity">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ activity.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(activity.name_th, activity.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${activity.image}`"
                    alt="content-image"
                    class="content-image"
                  />

                  <div
                    class="content-detail"
                    v-html="$lang(activity.detail_th, activity.detail_en)"
                  ></div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

  export default {
    name: 'DActivityDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.activity.page,
        activity: null,
      }
    },
    async mounted() {
      await this.getActivity()
      await this.updateTotalView()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getActivity() {
        let res = await this.$store.dispatch('activity/find', this.id)
        this.activity = res.data
      },
      async updateTotalView() {
        await this.$store.dispatch('activity/updateTotalView', this.id)
      },
    },
  }
</script>

<style scoped lang="scss">
  .content-container {
    padding: 25px 0 150px;

    .content-date,
    .content-detail {
      margin-bottom: 5px;
    }

    .content-date {
      color: #b2b2b2;
      font-size: 14px;
    }

    .content-title {
      font-size: 26px;
      margin-bottom: 15px;
    }

    .content-image {
      width: 100%;
      margin-bottom: 15px;
    }
  }
</style>
