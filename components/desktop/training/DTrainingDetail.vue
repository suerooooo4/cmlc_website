<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING.TITLE')"
      :subtitle="$t('TRAINING.SUBTITLE')"
      :image="'/images/banner-training.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="
                    openPage('/training/list', { type, page: previous_page })
                  "
                ></i>
                {{ $t('TRAINING.HEADER') }}
              </span>
            </h2>

            <v-row v-if="training">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ training.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(training.name_th, training.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${training.image}`"
                    alt="content-image"
                    class="content-image"
                  />

                  <v-card
                    color="#F8F7F6"
                    class="mt-3 pl-7 pr-7 pt-2 pb-2 rounded-lg"
                    elevation="5"
                  >
                    <div
                      class="content-detail"
                      v-html="$lang(training.detail_th, training.detail_en)"
                    ></div>
                  </v-card>
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
    name: 'DTrainingDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.training.page,
        type: this.$route.query.type,
        training: null,
      }
    },
    async mounted() {
      await this.getTraining()
      await this.updateTotalView()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getTraining() {
        let res = await this.$store.dispatch('training/find', this.id)
        this.training = res.data
      },
      async updateTotalView() {
        await this.$store.dispatch('training/updateTotalView', this.id)
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
      // margin-bottom: 15px;
    }
  }
</style>
