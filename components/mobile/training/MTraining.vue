<template>
  <main>
    <MArticleBanner
      :title="$t('TRAINING.TITLE')"
      :subtitle="$t('TRAINING.SUBTITLE')"
      :image="'/images/banner-training.png'"
    />

    <section v-if="new_training_list.length" class="show">
      <v-row>
        <v-col cols="12">
          <span class="show__title">{{ $t('TRAINING.NEW_TRAINING') }}</span>
          <hr />
        </v-col>
        <v-col cols="6" v-for="item in new_training_list" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column align-center mt-3">
        <v-btn
          depressed
          color="primary"
          @click="openPage('/training/list', { type: 1 })"
        >
          {{ $t('TRAINING.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>

    <section class="show">
      <v-row>
        <v-col cols="12">
          <span class="show__title">{{ $t('TRAINING.LAST_TRAINING') }}</span>
          <hr />
        </v-col>
        <v-col cols="6" v-for="item in last_training_list" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn
          depressed
          color="primary"
          @click="openPage('/training/list', { type: 2 })"
        >
          {{ $t('TRAINING.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>
    
    <section class="activity">
      <v-row>
        <v-col cols="6">
          <span class="activity__title">{{
            $t('NEWS_ACTIVITY.ACTIVITY')
          }}</span>
          <hr />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" v-for="item in activity_list" :key="item.id">
          <MArticleCard
            :data="item" :detail_path="'/training/detail'"
            :image_path="image_url + item.image"
            :subtitle="item.created_at"
            :title="$lang(item.name_th, item.name_en)"
            :detail="$lang(item.detail_th, item.detail_en)"
            @open="openActivityDialog(item.id)"
          />
        </v-col>
      </v-row>
      <div class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn depressed color="primary" @click="openPage('activity')">
          {{ $t('NEWS_ACTIVITY.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>

    <!-- <v-dialog v-model="training_detail_dialog" fullscreen hide-overlay>
      <MTrainingDetail
        :id="dialog_training_id"
        @detail_dialog="closeTrainingDetailDialog"
      />
    </v-dialog> -->
    
 <!--    <v-dialog v-model="activity_detail_dialog" fullscreen hide-overlay>
      <MActivityDetail
        :id="dialog_activity_id"
        @detail_dialog="closeActivityDetailDialog"
      />
    </v-dialog> -->
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MTrainingDetail from '~/components/mobile/training/MTrainingDetail.vue'
 import MActivityDetail from '~/components/mobile/activity/MActivityDetail.vue'
  export default {
    name: 'MTraining',
    components: {
      MArticleCard,
      MArticleBanner,
      MTrainingDetail,
     MActivityDetail,
    },
    data() {
      return {
        image_url: process.env.image_url,
         activity_detail_dialog: false,
        training_detail_dialog: false,
        dialog_training_id: null,
        dialog_activity_id: null,
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
      openTrainingDialog(id) {
        this.training_detail_dialog = true
        this.dialog_training_id = id
      },
          openActivityDialog(id) {
        this.activity_detail_dialog = true
        this.dialog_activity_id = id
      },
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      closeTrainingDetailDialog(value) {
        this.training_detail_dialog = value
      },
        closeActivityDetailDialog(value, index) {
        this.activity_detail_dialog = value
      },
      async getNewTraining() {
        let res = await this.$store.dispatch('training/pagination', {
          page: 1,
          perPage: 4,
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
          perPage: 4,
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
          perPage: 4,
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
  .show {
    margin-top: 2rem;

    &__title {
      font-size: 1rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }
    &__content {
      .content-hot:not(:first-child) {
        margin-top: -12px;
      }
      margin-top: 15px;
      h2 {
        font-size: 14px;
        padding-left: 7px;
        color: #001538;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .date {
        color: #b2b2b2;
        font-size: 12px;
        padding-left: 7px;
        margin-bottom: 0;
      }
      .detail {
        color: #b2b2b2;
        font-size: 12px;
        padding: 0 7px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .submit {
      color: #001538 !important;
      border: 1px solid #001538 !important;
      background-color: transparent !important;
    }

    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ccc;
      padding: 0;
    }
  }

  .law {
    margin-top: 0.5rem;

    &__title {
      font-size: 1rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }

    .submit {
      color: #001538 !important;
      border: 1px solid #001538 !important;
      background-color: transparent !important;
    }
  }
  
  .activity {
    margin-top: 0.5rem;

    &__title {
      font-size: 1rem;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -4px;
        left: 0;
      }
    }

    .submit {
      color: #001538 !important;
      border: 1px solid #001538 !important;
      background-color: transparent !important;
    }
  }
</style>
