<template>
  <div class="banner">
    <v-img
      :src="banner_image"
      alt="banner-image"
      class="white--text align-center"
    >
      <v-container class="text-center">
        <v-row align-center>
          <v-col cols="12">
            <div class="content">
              <h1>{{ title }}</h1>
              <p class="color-sub-title pt-1" v-show="subtitle">
                {{ subtitle }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>

<script>
  export default {
    name: 'MArticleBanner',
    props: ['title', 'subtitle', 'image'],
    data() {
      return {
        banner_image: '/images/banner-01.png',
      }
    },
    mounted() {
      if (this.image) {
        this.banner_image = this.image
      }
    },
  }
</script>

<style scoped lang="scss">
  .banner {
    margin: -12px -12px 0;
    padding: 0 15px 15px;
    background: #001538;

    .banner-image {
      margin-bottom: -7px;

      img {
        width: 100%;
      }
    }

    .banner-title {
      padding: 15px;
      background: #c5934b;

      h1 {
        margin-bottom: 15px;
        padding: 0 0 10px;
        color: #fff;
        font-size: 26px;
        border-bottom: solid 3px #fff;
      }

      p {
        color: #fff;
      }
    }
  }
</style>
