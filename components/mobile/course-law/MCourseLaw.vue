<template>
  <main>
    <MArticleBanner
      :title="$t('COURSE_LAW.TITLE')"
      :subtitle="$t('COURSE_LAW.SUBTITLE')"
      :image="'/images/banner-course-law.png'"
    />

 
    <section class="law mb-5">
      <v-row>
        <v-col cols="1">
          <img width="40" class="pr-3" src="/images/course-law/law.png" />
        </v-col>
        <v-col cols="11">
          <span class="law__title">{{ $t('COURSE_LAW.LAW') }}</span>
          <hr />
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="law of law_list" :key="law.id" cols="6">
          <v-hover v-slot="{ hover }">
            <v-card
              dark
              class="law-card hover-card"
              :color="hover ? 'grey' : 'primary'"
              @click="openPage('/law', { law_category_id: law.id })"
            >
              <div class="text-center pa-5">
                {{ $lang(law.name_en, law.name_en) }}
              </div>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </section>

    
    <v-dialog v-model="course_detail_dialog" fullscreen hide-overlay>
      <MCourseDetail
        :id="dialog_course_id"
        @detail_dialog="closeCourseDetailDialog"
      />
    </v-dialog>

    <v-dialog v-model="law_detail_dialog" fullscreen hide-overlay>
      <MLawDetail :id="dialog_law_id" @detail_dialog="closeLawDetailDialog" />
    </v-dialog>

   
  </main>
</template>

<script>
  import MArticleCard from '~/components/mobile/shared/MArticleCard.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'

  import MLawDetail from '~/components/mobile/law/MLawDetail.vue'
 

  export default {
    name: 'MCourseLaw',
    components: {
      MArticleCard,
     
      MLawDetail,
  
      MArticleBanner,
    },
    data() {
      return {
     
        law_detail_dialog: false,
        dialog_course_id: null,
        dialog_law_id: null,
       
        image_url: process.env.image_url,
     
        law_list: [],
      
      }
    },
    async mounted() {
     
      await this.getLaw()
 
    },
    methods: {

      openLawDialog(id) {
        this.law_detail_dialog = true
        this.dialog_law_id = id
      },
  
      openPage(path, query = null) {
        this.$router.push({ path: path, query })
      },
 
      closeLawDetailDialog(value, index) {
        this.law_detail_dialog = value
      },
      closeArticleDetailDialog(value, index) {
        this.article_detail_dialog = value
      },
 
      // async getLaw() {
      //   let res = await this.$store.dispatch('law/pagination', {
      //     page: 1,
      //     perPage: 4,
      //     orderBy: 'total_view',
      //     isDesc: true,
      //   })

      //   this.law_list = res.data.data.map((data) => {
      //     data.detail_th = this.$stripHtml(data.detail_th)
      //     data.detail_en = this.$stripHtml(data.detail_en)

      //     return data
      //   })
      // },
      async getLaw() {
        let res = await this.$store.dispatch('law/lawCategory')

        this.law_list = res.data
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

  .law,
  .article {
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
