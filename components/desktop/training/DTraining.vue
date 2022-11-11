<template>
  <div>
    <DArticleBanner
      :title="$t('TRAINING.TITLE')"
      :subtitle="$t('TRAINING.SUBTITLE')"
      :image="'/images/banner-training.png'"
    />

    <v-container>
      <section v-if="new_training_list.length" class="new-training-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>{{ $t('TRAINING.NEW_TRAINING') }}</span>
            </h2>

            <v-row>
              <v-col
                v-for="newTraining of new_training_list"
                :key="newTraining.id"
                cols="4"
              >
                <DArticleCard
                  :data="newTraining"
                  :detail_path="'/training/detail?type=1'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn
              @click="openPage('/training/list', { type: 1 })"
              large
              outlined
              color="primary"
            >
              {{ $t('TRAINING.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </section>

      <section class="last-training-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>{{ $t('TRAINING.LAST_TRAINING') }}</span>
            </h2>

            <v-row>
              <v-col
                v-for="lastTraining of last_training_list"
                :key="lastTraining.id"
                cols="4"
              >
                <DArticleCard
                  :data="lastTraining"
                  :detail_path="'/training/detail?type=2'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn
              @click="openPage('/training/list', { type: 2 })"
              large
              color="primary"
            >
              {{ $t('TRAINING.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </section>
       <section class="activity-container">
        <v-row>
          <v-col cols="12" class="latest-news">
            <h2 class="section-title">
              <span>{{ $t('NEWS_ACTIVITY.ACTIVITY') }}</span>
            </h2>

            <v-row>
              <v-col
                v-for="activity of activity_list"
                :key="activity.id"
                cols="4"
              >
                <DArticleCard
                  :data="activity"
                  :detail_path="'/activity/detail'"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-5">
          <v-col class="text-center">
            <v-btn @click="openPage('/activity')" large color="primary">
              {{ $t('NEWS_ACTIVITY.ACTION_MORE') }}
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DArticleCard from '~/components/desktop/shared/DArticleCard.vue'

  export default {
    name: 'DTraining',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
        new_training_list: [],
        last_training_list: [],
        activity_list: [],
      }
    },
    async mounted() {
      await this.getNewTraining()
      await this.getLastTraining()
        await this.getActivity()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getNewTraining() {
        let res = await this.$store.dispatch('training/pagination', {
          page: 1,
          perPage: 3,
          orderBy: 'created_at',
          isDesc: true,
          type: 1,
        })

        this.new_training_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
      async getLastTraining() {
        let res = await this.$store.dispatch('training/pagination', {
          page: 1,
          perPage: 3,
          orderBy: 'created_at',
          isDesc: true,
          type: 2,
        })

        this.last_training_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
       async getActivity() {
        let res = await this.$store.dispatch('activity/pagination', {
          page: 1,
          perPage: 6,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.activity_list = res.data.data.map((data) => {
          data.detail_th = this.$stripHtml(data.detail_th)
          data.detail_en = this.$stripHtml(data.detail_en)

          return data
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .new-training-container {
    padding: 25px 0;
  }

  .last-training-container {
    padding: 25px 0 150px;
  }
</style>
