<template>
  <div>
    <DArticleBanner
      :title="$t('MEDIA_GLOBAL.TITLE')"
      :image="'/images/banner-media-general.jpg'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/media-global', { page: previous_page })"
                ></i>
                {{ $t('MEDIA_GLOBAL.TITLE') }}
              </span>
            </h2>

            <v-row v-if="media_global">
              <v-col>
                <div>
                  <p class="content-date">
                    {{ media_global.created_at }}
                  </p>

                  <h2 class="content-title">
                    {{ $lang(media_global.name_th, media_global.name_en) }}
                  </h2>

                  <img
                    :src="`${image_url}${media_global.image}`"
                    alt="content-image"
                    class="content-image"
                  />

                  <div
                    class="content-detail"
                    v-html="
                      $lang(media_global.detail_th, media_global.detail_en)
                    "
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
  name: 'DMediaGlobalDetail',
  components: {
    DArticleBanner,
  },
  data() {
    return {
      image_url: process.env.image_url,
      id: this.$route.query.id,
      previous_page: this.$store.state.media_global.page,
      media_global: null,
    }
  },
  async mounted() {
    await this.getMediaGlobal()
    await this.updateTotalView()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getMediaGlobal() {
      let res = await this.$store.dispatch('media_global/find', this.id)
      this.media_global = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('media_global/updateTotalView', this.id)
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
