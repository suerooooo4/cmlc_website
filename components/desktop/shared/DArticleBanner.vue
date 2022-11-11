<template>
  <div class="banner">
    <!-- <v-container> -->
    <!-- <div class="d-flex"> -->
    <!-- <div class="banner-image"> -->
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
              <p class="color-sub-title pt-4">
                {{ subtitle }}
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
    <!-- </div> -->

    <!-- <div class="banner-title">
          <h1>{{ title }}</h1>
          <p>{{ subtitle }}</p>
        </div>
      </div>
    </v-container> -->
  </div>
</template>

<script>
export default {
  name: 'DArticleBanner',
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
  background: #001538;

  div.d-flex {
    padding: 15px 0;
    align-items: stretch;

    .banner-image {
      width: 55%;

      img {
        width: 100%;
      }
    }

    .banner-title {
      margin-bottom: 7px;
      padding: 30px;
      width: 45%;
      background: #c5934b;
      border-left: solid 5px #fff;

      h1 {
        margin-bottom: 15px;
        padding: 0 0 15px;
        color: #fff;
        font-size: 36px;
        border-bottom: solid 3px #fff;
      }

      p {
        color: #fff;
        font-size: 18px;
      }
    }
  }

  .color-sub-title {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.58);
  }
}
</style>
