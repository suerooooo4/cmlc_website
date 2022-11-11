<template>
  <div>
    <DArticleBanner
      :title="$t('COURSE_LAW.TITLE')"
      :subtitle="$t('COURSE_LAW.SUBTITLE')"
      :image="'/images/banner-course-law.png'"
    />

    <v-container>
   
      <section class="law-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <img
                width="40"
                class="mr-2"
                src="/images/course-law/law.png"
              /><span>{{ $t('COURSE_LAW.LAW') }}</span>
            </h2>

            <v-row>
              <v-col v-for="law of law_list" :key="law.id" cols="4">
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
    name: 'DCourseLaw',
    components: {
      DArticleBanner,
      DArticleCard,
    },
    data() {
      return {
           law_list: [],
      
      }
    },
    async mounted() {
         await this.getLaw()
    
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
          async getLaw() {
        let res = await this.$store.dispatch('law/lawCategory')

        this.law_list = res.data
      },
    
    },
  }
</script>

<style scoped lang="scss">

  .law-container {
    padding: 25px 0;
  }

  .article-container {
    padding: 25px 0 150px;
  }
  .law-card {
    border-radius: 16px;
    cursor: pointer;
  }
</style>
