<template>
  <div>
    <DArticleBanner
      :title="$t('COURSE_LAW.TITLE')"
      :subtitle="$t('COURSE_LAW.SUBTITLE')"
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
                  @click="openPage('/law', { page: previous_page })"
                ></i>
                {{ $t('LAW.HEADER') }}
              </span>
            </h2>

            <v-row v-if="law">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ law.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(law.name_th, law.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${law.image}`"
                    alt="content-image"
                    class="content-image"
                  />

                  <div
                    class="content-detail"
                    v-html="$lang(law.detail_th, law.detail_en)"
                  ></div>

                  <div class="m-auto">
                    <ul>
                      <li v-for="(pdf, idx) in pdfList" :key="idx">
                        <iframe
                          :src="pdf.href"
                          width="900px"
                          height="800px"
                        />
                      </li>
                    </ul>
                  </div>
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
  name: 'DLawDetail',
  components: {
    DArticleBanner,
  },
  data() {
    return {
      image_url: process.env.image_url,
      id: this.$route.query.id,
      previous_page: this.$store.state.law.page,
      law: null,
      pdfList: [],
    }
  },
  async mounted() {
    await this.getLaw()
    await this.updateTotalView()
    await this.getPdfList()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getLaw() {
      let res = await this.$store.dispatch('law/find', this.id)
      this.law = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('law/updateTotalView', this.id)
    },
    getPdfList() {
      var html = this.law.detail_th
      var parser = new DOMParser()
      var wrapper = parser.parseFromString(html, 'text/html')
      this.pdfList = wrapper.getElementsByTagName('a')
    },
  },
}
</script>

<style scoped lang="scss">
  ul li {
    display: block;
    width: 100%;
    margin-bottom: 3rem;
  }
  .m-auto {
    display: flex;
    justify-content: center;
    width: 100%;
  }
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
