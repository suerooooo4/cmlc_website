<template>
  <div class="card"   @click="openPage(detail_path, { id: data.id })">
    <v-btn icon class="icon-gallery" v-if="is_gallery">
      <i class="gallery"></i>
    </v-btn>
    <img
      :src="image_path"
      :class="'card__img ' + (is_image_gray ? 'image_gray' : '')"
    />
    <div class="card__content">
      <p class="card__content-subtitle" v-if="subtitle">{{ subtitle }}</p>
      <h2>{{ title }}</h2>
      <p class="card__content-detail" v-html="detail"></p>
      <div class="card__content-detail d-flex justify-space-between">
        <span v-if="duration">{{
          `${parseFloat(duration).toFixed(2).toString().replace('.', ':')} ${$t(
            'SHARED.ARTICLE_CARD.MINUTE'
          )}`
        }}</span>
        <span v-if="total_view">รับชม {{ total_view }}</span>
      </div>
      <p class="card__content-readMore" v-if="is_read_more">
        <v-btn depressed color="primary">
          อ่านเพิ่มเติม <i class="circle-next"></i
        ></v-btn>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MArticleCard',
    props: [
      'detail_path',
      'data',
      'image_path',
      'subtitle',
      'title',
      'detail',
      'is_image_gray',
      'duration',
      'total_view',
      'is_read_more',
      'is_gallery',
    ],

    methods:{
      openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    }
  }
</script>

<style scoped lang="scss">
  .card {
    position: relative;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    &__img {
      max-width: 100%;
      height: 200px;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    .icon-gallery {
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .image_gray {
      filter: grayscale(100%);
    }
    &__content {
      max-width: 100%;
      min-height: 89px;
      background: #ffffff;
      margin-top: -7px;
      padding: 7px 0;
      border-radius: 10px;
      h2 {
        font-size: 14px;
        padding: 0 7px;
        color: #001538;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      &-subtitle {
        color: #b2b2b2;
        font-size: 12px;
        padding-top: 8px;
        padding: 0 7px;
        margin-bottom: 0;
      }
      &-detail {
        word-wrap: break-word;
        color: #b2b2b2;
        font-size: 12px;
        padding: 0 7px;
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      &-readMore {
        .v-btn {
          padding: 0 7px;
          font-size: 12px;
          color: #001538;
          background-color: transparent !important;
        }
      }
    }
  }
</style>
