<template>
  <div>
    <DArticleBanner
      :title="$t('GALLERY.TITLE')"
      :image="'/images/banner-cmlc-gallery.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/gallery', { page: previous_page })"
                ></i>
                {{ $t('GALLERY.HEADER') }}
              </span>
            </h2>

            <div v-if="gallery">
              <v-row>
                <v-col>
                  <div>
                    <h2 class="content-title">
                      {{ $lang(gallery.name_th, gallery.name_en) }}
                    </h2>

                    <div
                      class="content-detail"
                      v-html="$lang(gallery.detail_th, gallery.detail_en)"
                    ></div>
                  </div>
                </v-col>
              </v-row>

              <v-row>
                <v-col
                  v-for="galleryImage of gallery.images"
                  :key="galleryImage.id"
                  cols="4"
                >
                  <img
                    :src="`${image_url}${galleryImage.image}`"
                    alt="gallery-image"
                    class="gallery-image"
                    @click="openImage(galleryImage)"
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>

    <v-dialog v-model="image_dialog" persistent max-width="700">
      <div>
        <img
          v-if="dialog_image"
          :src="`${image_url}${dialog_image.image}`"
          alt="dialog-image"
          width="100%"
        />
      </div>

      <div class="text-center mt-3 mb-5">
        <v-btn outlined @click="closeDialog()">
          {{ $t('GALLERY.CLOSE') }}
        </v-btn>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

  export default {
    name: 'DGalleryDetail',
    components: {
      DArticleBanner,
    },
    data() {
      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.gallery.page,
        gallery: null,
        image_dialog: false,
        dialog_image: null,
      }
    },
    async mounted() {
      await this.getGallery()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getGallery() {
        let res = await this.$store.dispatch('gallery/find', this.id)
        this.gallery = res.data
      },
      openImage(image) {
        this.dialog_image = image
        this.image_dialog = true
      },
      closeDialog() {
        this.image_dialog = false
        this.dialog_image = null
      },
    },
  }
</script>

<style scoped lang="scss">
  .content-container {
    padding: 25px 0 150px;

    .content-date {
      color: #b2b2b2;
      font-size: 14px;
    }

    .content-title {
      margin: 30px 0 30px;
      font-size: 36px;
      text-align: center;
    }

    .content-detail {
      margin-bottom: 50px;
      text-align: center;
      font-size: 14px;
      color: #b2b2b2;
    }

    .gallery-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      object-position: center;
      cursor: pointer;
    }
  }
</style>
