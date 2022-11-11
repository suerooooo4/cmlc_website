<template>
  <div>
    <DArticleBanner
      :title="$t('ARTICLE.TITLE')"
      :subtitle="$t('ARTICLE.SUBTITLEARTICLE')"
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
                  @click="openPage('/article', { page: previous_page })"
                ></i>
                {{ $t('ARTICLE.HEADER') }}
              </span>
            </h2>

            <v-row v-if="article">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ article.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(article.name_th, article.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${article.image}`"
                    alt="content-image"
                    class="content-image"
                  />

                  <div
                    class="content-detail"
                    v-html="$lang(article.detail_th, article.detail_en)"
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
    name: 'DArticleDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.article.page,
        article: null,
        pdfList: [],
      }
    },
    async mounted() {
      await this.getArticle()
      await this.updateTotalView()
      await this.getPdfList()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getArticle() {
        let res = await this.$store.dispatch('article/find', this.id)
        this.article = res.data
      },
      async updateTotalView() {
        await this.$store.dispatch('article/updateTotalView', this.id)
      },
      getPdfList() {
        var html = this.article.detail_th
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
