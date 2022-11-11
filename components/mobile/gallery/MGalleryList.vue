<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click="openPage('/gallery', { page: previous_page })">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="openPage('/gallery', { page: previous_page })"
          >{{ $t('GALLERY.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>
    <section v-if="gallery">
      <h1 class="info-header__title text-center">
        {{ $lang(gallery.name_th, gallery.name_en) }}
      </h1>
      <p
        class="info-header__detail"
        v-html="$lang(gallery.detail_th, gallery.detail_en)"
      ></p>
    </section>
    <section class="content" v-if="gallery">
      <v-row>
        <v-col
          cols="6"
          v-for="galleryImage of gallery.images"
          :key="galleryImage.id"
        >
          <img
            @click="openGalleryDialog(`${image_url}${galleryImage.image}`)"
            class="content__image"
            :src="`${image_url}${galleryImage.image}`"
          />
        </v-col>
      </v-row>
    </section>
    <v-dialog v-model="gallery_detail_dialog" persistent>
      <MGalleryDetail
        :image_path="gallery_detail_image"
        @detail_dialog="closeGalleryDetailDialog"
      />
    </v-dialog>
  </main>
</template>

<script>
  import MGalleryDetail from '~/components/mobile/gallery/MGalleryDetail.vue'
  export default {
    name: 'MGalleryList',
    components: {
      MGalleryDetail,
    },
/*     props: ['id'], */
    watch: {
      id: {
        async handler(val, oldVal) {
          this.getGallery()
        },
        deep: true,
      },
    },
    data() {
      return {
        gallery_detail_image: null,
        gallery_detail_dialog: false,
        image_url: process.env.image_url,
        gallery: null,
        id:this.$route.query.id,
        previous_page: this.$store.state.article.page,
      }
    },
    mounted() {
      this.getGallery()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      }, 
      closeGalleryDetailDialog(value) {
        this.gallery_detail_dialog = value
      },
      openGalleryDialog(image_path) {
        this.gallery_detail_dialog = true
        this.gallery_detail_image = image_path
      },
      async getGallery() {
        let res = await this.$store.dispatch('gallery/find', this.id)
        this.gallery = res.data
      },
    },
  }
</script>

<style scoped lang="scss">
  .main {
    padding: 12px;
  }
  .header {
    &__topbar {
      color: #001538;
      position: relative;

      &:after {
        content: '';
        display: block;
        width: 100%;
        height: 6px;
        border-radius: 6px;
        background: #000;
        position: absolute;
        bottom: -11px;
        left: 0;
      }
      .link {
        color: #001538;
      }
    }
    hr {
      display: block;
      height: 1px;
      border: 0;
      border-top: 2px solid #ccc;
      padding: 0;
    }
  }

  .info-header {
    width: 100vw;
    height: 130px;
    margin-top: 13px;
    margin-left: -12px;
    text-align: center;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }

    &__detail {
      font-size: 12px;
      padding: 0px 20px;
      color: #b2b2b2;
    }
  }

  .content {
    margin-top: 1rem;

    &__image {
      max-width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }
</style>
