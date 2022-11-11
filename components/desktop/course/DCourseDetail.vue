<template>
  <div>
    <DArticleBanner
      :title="$t('COURSE.TITLE')"
      :subtitle="$t('COURSE.SUBTITLECOURSE')"
      :image="'/images/banner-course-law.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/course', { page: previous_page })"
                ></i>
                {{ $t('COURSE.HEADER') }}
              </span>
            </h2>

            <v-row v-if="course">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ course.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(course.name_th, course.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${course.image}`"
                    alt="content-image"
                    class="content-image"
                  />

                  <v-card
                    color="#F8F7F6"
                    class="pl-7 pr-7 pt-2 pb-3 rounded-lg"
                    elevation="5"
                  >
                    <div
                      class="content-detail"
                      v-html="$lang(course.detail_th, course.detail_en)"
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
    name: 'DCourseDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.course.page,
        course: null,
      }
    },
    async mounted() {
      await this.getCourse()
      await this.updateTotalView()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getCourse() {
        let res = await this.$store.dispatch('course/find', this.id)
        this.course = res.data
      },
      async updateTotalView() {
        await this.$store.dispatch('course/updateTotalView', this.id)
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
