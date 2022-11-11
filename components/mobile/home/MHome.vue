<template>
  <div class="home-container">
    <!-- <section v-if="pop_up_speci">
        <div v-on="openSpeci()"></div>
    </section> -->
     <section v-if="pop_up_speci">
      <div v-if="$store.state.user.user_id"></div>
      <div v-else v-on="openSpeci()"></div>
    </section>
    <section class="section-banner">
      <v-carousel
        v-model="banner_showing"
        hide-delimiters
        height="auto"
        class="banner-carousel"
        :cycle="true"
        :interval="3000"
        show-arrows-on-hover
      >
        <v-carousel-item v-for="banner in banner_list" :key="banner.id">
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <img
                :src="`${image_url}${banner.image}`"
                alt="banner-image"
                class="banner-image"
              />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </section>

    <section class="section-view-counter">
      <v-container>
        <div class="vc-container">
          <div class="wrapper">
            <v-row>
              <v-col cols="12" class="content">
                <h2>{{ $t('HOME.VIEW_COUNTER.CONTENT_TITLE') }}</h2>
                <p>{{ $t('HOME.VIEW_COUNTER.CONTENT_DETAIL') }}</p>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>
    </section>

    <section class="section-news">
      <v-container>
        <h2>{{ $t('HOME.MESSAGE.TITLE') }}</h2>

        <div v-if="news_list.length" class="news-container">
          <VueSlickCarousel v-bind="vue_slick_option">
            <div
              class="news-card-wrapper"
              v-for="news of news_list"
              :key="news.id"
            >
              <div
                @click="openPage('/news/detail', { id: news.id })"
                class="news-card"
              >
                <img :src="`${image_url}${news.image}`" alt="news-image" />
                <p>{{ $lang(news.name_th, news.name_en) }}</p>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </v-container>
    </section>

    <section class="section-media_list-media-reg">
      <v-container>
        <v-row>
          <v-col cols="12" class="col-media_list">
            <div class="media_list-container">
              <div class="btn-media_list-previous">
                <a @click="nextMediaPlaylist(media_playlist_showing.index)">
                  <i class="fa fa-chevron-circle-up"></i>
                </a>
              </div>

              <div v-if="media_playlist_showing" class="media_list-content">
                <h2>{{ $t('HOME.MEDIA_MASTER_LIST.TITLE') }}</h2>

                <p>
                  {{ $t('MEDIA_MASTER.NAME') }} :
                  {{
                    $lang(
                      media_playlist_showing.media.name_th,
                      media_playlist_showing.media.name_en
                    )
                  }}
                </p>
                <br>
                <p>
                  {{ $t('MEDIA_MASTER.CREATOR') }} :
                  {{
                    $lang(
                      media_playlist_showing.media.creator_name_th,
                      media_playlist_showing.media.creator_name_en
                    )
                  }}
                </p>
                <br>
                <a
                  @click="
                    openMediaMasterDialog(media_playlist_showing.media.id)
                  "
                  >{{ $t('HOME.NEWS.BUTTON') }}
                  <i class="fa fa-chevron-circle-right"></i
                ></a>
              </div>

              <div class="btn-media_list-next">
                <a @click="previousMediaPlaylist(media_playlist_showing.index)">
                  <i class="fa fa-chevron-circle-down"></i>
                </a>
              </div>
            </div>
          </v-col>

           <v-col cols="12" class="col-media">
            <div v-if="media_playlist_showing" class="media-container">
             <video
                height="100%"
                width="100%"
                :poster="`${image_url}${media_playlist_showing.media.image}`"
                :src="`${video_url}${media_playlist_showing.media.video_file}`"
                type="video/mp4"
                controls
              >
              </video>
            </div>
          </v-col>

          <v-col cols="12" class="col-reg">
            <div class="reg-container">
              <h2>{{ $t('HOME.REGISTER.TITLE') }}</h2>

              <p>{{ $t('HOME.REGISTER.DETAIL') }}</p>

              <v-btn @click="openRegister()" color="#c5934b" dark>{{
                $t('HOME.REGISTER.BUTTON')
              }}</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section-training">
      <v-container>
        <h2>{{ $t('HOME.TRAINING.TITLE') }}</h2>

        <div v-if="training_list.length" class="training-container">
          <VueSlickCarousel v-bind="vue_slick_option">
            <div
              class="training-card-wrapper"
              v-for="training of training_list"
              :key="training.id"
            >
              <div
                @click="openPage('/training/detail', { id: training.id })"
                class="training-card"
              >
                <img
                  :src="`${image_url}${training.image}`"
                  alt="training-image"
                />
                <p>{{ $lang(training.name_th, training.name_en) }}</p>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </v-container>
    </section>

    <!-- <section class="section-media">
      <div class="" @click="view_video = true">
        <div v-if="!view_video" class="">
          <v-img
            src="/images/mockup/banner-media-master.png"
            alt="Snow"
            class="white--text align-center"
            style="width: 100%; height: 300px"
          >
            <v-container>
              <div class="">
                <h2>
                  <span>
                    <v-icon color="#fff" size="30"
                      >mdi-play-circle-outline</v-icon
                    >
                  </span>
                  {{ $t('HOME.MEDIA_MASTER.TITLE') }}
                </h2>
                <p class="color-sub-title pt-1">
                  {{ $t('HOME.MEDIA_MASTER.DETAIL') }}
                </p>
              </div>
            </v-container>
          </v-img>
        </div>
        <div v-else>
          <div class="video-style">
            <video
              :poster="`${image_url}${media_mater_list[1].image}`"
              controls
              style="height: 300px"
              autoplay
            >
              <source
                :src="`${video_url}${media_mater_list[1].video_file}`"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>
    </section> -->
    <section class="section-database">
      <ul class="banner-slide" @click="openPage('/media-master')">
        <li>
          <img src="/images/home-banner-database/banner-database-6.png" />
        </li>
        <li>
          <img src="/images/home-banner-database/banner-database-5.png" />
        </li>
        <li>
          <img src="/images/home-banner-database/banner-database-4.png" />
        </li>
        <li>
          <img src="/images/home-banner-database/banner-database-3.png" />
        </li>
        <li>
          <img src="/images/home-banner-database/banner-database-2.png" />
        </li>
        <li>
          <img src="/images/home-banner-database/banner-database-1.png" />
        </li>
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <v-container>
              <div class="top-left">
                <h2 style="color: rgba(255, 255, 255, 0.808)">
                  {{ $t('HOME.MEDIA_MASTER.TITLE') }}
                </h2>
                <p class="color-sub-title pt-4">
                  {{ $t('HOME.MEDIA_MASTER.DETAIL') }}
                </p>
              </div>
            </v-container>
          </v-row>
        </v-sheet>
      </ul>
    </section>

    <section class="section-article">
      <v-container>
        <h2>{{ $t('HOME.ARTICLE.TITLE') }}</h2>

        <div v-if="article_list.length" class="article-container">
          <VueSlickCarousel v-bind="vue_slick_option">
            <div
              class="article-card-wrapper"
              v-for="article of article_list"
              :key="article.id"
            >
              <div
                @click="openPage('/article/detail', { id: article.id })"
                class="article-card"
              >
                <img
                  :src="`${image_url}${article.image}`"
                  alt="article-image"
                />
                <p>{{ $lang(article.name_th, article.name_en) }}</p>
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </v-container>
    </section>

    <section class="section-cmlc">
      <v-container>
        <div>
          <div class="media-general">
            <i class="fa fa-video"></i>

            <h2 v-html="$t('HOME.BOOKING.TITLE3')"></h2>

            <a color="red" @click="openPage('/booking?tab=1')"
              >{{ $t('HOME.BUTTON_VIEW_MORE') }}
              <v-icon class="ml-1 icon-next-more" color="#130F26" size="20"
                >mdi-chevron-right-circle</v-icon
              >
            </a>
          </div>

          <div class="cmlc-container">
            <h2>{{ $t('HOME.CMLC.TITLE') }}</h2>

            <p>{{ $t('HOME.CMLC.DETAIL') }}</p>

            <v-btn @click="openPage('/article')" color="#c5934b" dark>{{
              $t('HOME.CMLC.BUTTON')
            }}</v-btn>
          </div>
        </div>
      </v-container>
    </section>

    <section class="section-supportor">
      <v-container>
        <div class="supportor-title">
          <p>{{ $t('HOME.SUPPORTOR.TITLE') }}</p>
        </div>

        <div class="d-flex">
          <div>
            <a href="https://www.nbtc.go.th/" target="_blank">
              <img
                src="/images/footer-logo/logo_กสทช.png"
                alt="supportor-image"
              />
            </a>
          </div>

          <div>
            <a href="https://btfp.nbtc.go.th/" target="_blank">
              <img
                src="/images/footer-logo/logo_กทปส.png"
                alt="supportor-image"
              />
            </a>
          </div>

          <div>
            <a href="https://www.thaipbs.or.th/" target="_blank">
              <img
                src="/images/footer-logo/logo_thaiPBS.png"
                alt="supportor-image"
              />
            </a>
          </div>

          <div>
            <a href="https://www.up.ac.th/" target="_blank">
              <img
                src="/images/footer-logo/logo_UP.png"
                alt="supportor-image"
              />
            </a>
          </div>

          <div>
            <a href="http://www.bca.up.ac.th/" target="_blank">
              <img
                src="/images/footer-logo/logo_sbca.png"
                alt="supportor-image"
              />
            </a>
          </div>
        </div>
      </v-container>
    </section>

    <v-dialog v-model="media_video_dialog" persistent>
      <div v-if="media_showing" class="media-video">
        <h2>{{ $lang(media_showing.name_th, media_showing.name_en) }}</h2>

        <video width="100%" height="auto" controls>
          <source
            :src="`${video_url}${media_showing.video_file}`"
            type="video/mp4"
          />
        </video>

        <div class="text-center p-5 my-3">
          <v-btn @click="closeMediaVideo()">
            {{ $t('HOME.MEDIA_MASTER.BUTTON') }}
          </v-btn>
        </div>
      </div>
    </v-dialog>

    <v-dialog v-model="register_dialog" persistent max-width="100%">
      <MRegister @register_dialog="closeRegisterModal" />
    </v-dialog>

    <v-dialog v-model="login_dialog" persistent max-width="100%">
      <MLogin @login_dialog="closeLoginModal" />
    </v-dialog>
    <v-dialog v-model="media_master_dialog" fullscreen hide-overlay>
      <MMediaMasterDetail
        :id="media_master_dialog_id"
        @detail_dialog="closeMediaGeneralDialog"
      />
    </v-dialog>
   <v-dialog v-model="speci_dialog_regi" persistent max-width="90%">
      <Mspecial @speci_dialog_regi ="closeSpeciModal" />
    </v-dialog>
  <!--    <v-dialog v-model="speci_dialog" max-width="90%">
      <Mspecial_new @speci_dialog ="closeSpeciModal" />
    </v-dialog> -->
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import MRegister from '~/components/mobile/shared/MRegister.vue'
import MLogin from '~/components/mobile/shared/MLogin.vue'
import MMediaMasterDetail from '~/components/mobile/media-master/MMediaMasterDetail.vue'
import Mspecial from '~/components/mobile/shared/Mspecial.vue'
import Mspecial_new from '~/components/mobile/shared/Mspecial_new.vue'

export default {
  name: 'MHome',
  components: {
    VueSlickCarousel,
    MRegister,
    MLogin,
    MMediaMasterDetail,
    Mspecial,
    Mspecial_new
  },
  data() {
    return {
      media_master_dialog: false,
      media_master_dialog_id: null,
      image_url: process.env.image_url,
      video_url: process.env.video_url,
      banner_list: [],
      banner_database_list: [
        {
          id: 1,
          image_path: '/images/home-banner-database/banner-database-1.png',
        },
        {
          id: 2,
          image_path: '/images/home-banner-database/banner-database-2.png',
        },
        {
          id: 3,
          image_path: '/images/home-banner-database/banner-database-3.png',
        },
        {
          id: 4,
          image_path: '/images/home-banner-database/banner-database-4.png',
        },
        {
          id: 5,
          image_path: '/images/home-banner-database/banner-database-5.png',
        },
      ],
      banner_database_showing: 0,
      banner_showing: 0,
      view_counter: 0,
      training_list: [],
      article_list: [],
      news_list: [],
      media_playlist_list: [],
      media_playlist_showing: null,
      media_mater_list: [],
      media_showing: null,
      media_video_dialog: false,
      training_portfolio_list: [],
      register_dialog: false,
      login_dialog: false,
      vue_slick_option: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: false,
        nextArrow: '.next_caro',
        prevArrow: '.previous_caro',
      },
      view_video: false,
      speci_dialog: false,
      speci_dialog_regi:false,
      pop_up_speci: true,
    }
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    openMediaMasterDialog(id) {
      this.media_master_dialog = true
      this.media_master_dialog_id = id
    },
    closeMediaGeneralDialog(value) {
      this.media_master_dialog = value
    },
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getData() {
      await this.getBanner()
      await this.getViewCounter()
      await this.getTraining()
      await this.getArticle()
      await this.getNews()
      await this.getMediaMaster()
      await this.getMediaPlaylist()
    },
    async getBanner() {
      let res = await this.$store.dispatch('banner/get')
      this.banner_list = res.data
    },
    async getViewCounter() {
      let res = await this.$store.dispatch('view_counter/get')
      this.view_counter = res.data
    },
    async getTraining() {
      let res = await this.$store.dispatch('training/pagination', {
        page: 1,
        perPage: 5,
        orderBy: 'created_at',
        isDesc: true,
        type: 2,
      })

      this.training_list = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = data.detail_en ? this.$stripHtml(data.detail_en) : ''

        return data
      })
    },
    async getNews() {
      let res = await this.$store.dispatch('news/pagination', {
        page: 1,
        perPage: 5,
        orderBy: 'created_at',
        isDesc: true,
      })

      this.news_list = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = data.detail_en ? this.$stripHtml(data.detail_en) : ''

        return data
      })
    },
    async getMediaPlaylist() {
      let res = await this.$store.dispatch('media_playlist/playlist_title', {
        page: 1,
        perPage: 20,
        orderBy: 'created_at',
        isDesc: true,
        type: 1,
        media_category_id: 3,
      })

      this.media_playlist_list = res.data.data.map((data) => {
        data.title_th = this.$stripHtml(data.title_th)
        data.title_en = data.title_en ? this.$stripHtml(data.title_en) : ''

        data.creator_name_th = this.$stripHtml(data.creator_name_th)
        data.creator_name_en = data.title_en
          ? this.$stripHtml(data.creator_name_en)
          : ''
        return data
      })
      let media_array = []
      for (let info of this.media_playlist_list) {
        if (info.media != null)
          media_array.push(info)
      }
      this.media_playlist_showing = media_array[0]
      this.media_playlist_showing.index = 0
    },
    async getArticle() {
      let res = await this.$store.dispatch('article/pagination', {
        page: 1,
        perPage: 5,
        orderBy: 'created_at',
        isDesc: true,
        type: 2,
      })

      this.article_list = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = data.detail_en ? this.$stripHtml(data.detail_en) : ''

        return data
      })
    },
    async getMediaMaster() {
      let res = await this.$store.dispatch('media_master/pagination', {
        page: 1,
        perPage: 2,
        orderBy: 'created_at',
        isDesc: true,
        media_category_id: 3,
      })

      this.media_mater_list = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = data.detail_en ? this.$stripHtml(data.detail_en) : ''

        return data
      })
    },
    async getTrainingPortfolio() {
      let res = await this.$store.dispatch('training_portfolio/pagination', {
        page: 1,
        perPage: 2,
        orderBy: 'created_at',
        isDesc: true,
      })

      this.training_portfolio_list = res.data.data.map((data) => {
        data.detail_th = this.$stripHtml(data.detail_th)
        data.detail_en = data.detail_en ? this.$stripHtml(data.detail_en) : ''

        return data
      })
    },
    nextMediaPlaylist(index) {
      let nextIndex = index + 1

      if (nextIndex > this.media_playlist_list.length - 1) {
        nextIndex = 0
      }

      this.media_playlist_showing = this.media_playlist_list[nextIndex]
      this.media_playlist_showing.index = nextIndex
    },

    previousMediaPlaylist(index) {
      let nextIndex = index - 1

      if (nextIndex < 0) {
        nextIndex = this.media_playlist_list.length - 1
      }

      this.media_playlist_showing = this.media_playlist_list[nextIndex]
      this.media_playlist_showing.index = nextIndex
    },
    async openMediaVideo(id) {
      let res = await this.$store.dispatch('media_master/find', id)

      this.media_showing = res.data
      this.media_video_dialog = true
    },
    closeMediaVideo() {
      this.media_showing = null
      this.media_video_dialog = false
    },
    openRegister() {
      this.register_dialog = true
    },
    openLogin() {
      this.login_dialog = true
    },
    closeRegisterModal(value = false) {
      this.register_dialog = false

      if (value) {
        this.login_dialog = true
      }
    },
    closeLoginModal(value = false) {
      this.login_dialog = false

      if (value) {
        this.register_dialog = true
      }
    },
    openSpeci() {
      this.speci_dialog = true
      this.speci_dialog_regi=true
    },
    closeSpeciModal() {
      this.speci_dialog_regi=false
      this.speci_dialog = false
      this.pop_up_speci = false
    },
  },
}
</script>

<style scoped lang="scss">
ul li img {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  position: relative;
}
li {
  position: absolute;
  width: 100%;
}

li:nth-child(6) {
  animation: xfade 16s 0s infinite;
}
li:nth-child(5) {
  animation: xfade 16s 4s infinite;
}
li:nth-child(4) {
  animation: xfade 16s 8s infinite;
}
li:nth-child(3) {
  animation: xfade 16s 12s infinite;
}
li:nth-child(2) {
  animation: xfade 16s 16s infinite;
}
li:nth-child(1) {
  animation: xfade 16s 20s infinite;
}

@keyframes xfade {
  17% {
    opacity: 1;
  }
  25% {
    opacity: 0;
  }
  92% {
    opacity: 0;
  }
}
.home-container {
  margin: -12px;
}

.section-banner {
  background: #c8c8c8;

  .banner-carousel {
    .row {
      margin: 0 !important;
    }

    .banner-image {
      width: 100%;
    }
  }
}

.section-database {
  width: 100%;
  height: 300px;
  background: #c8c8c8;

  .banner-carousel {
    background-color: #c8c8c8;
    .row {
      margin: 0 !important;
    }
    .banner-image {
      height: 300px;
    }
  }

  .container {
    padding: 0 12px 0;
  }

  .top-left {
    position: absolute;
    margin-top: 4rem;
    margin-left: 12px;
    width: 90%;
    text-align: left;
    z-index: 100;
  }

  .centered {
    z-index: 100;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .color-sub-title {
    font-size: 14px;
    color: rgb(255, 255, 255);
  }
}

.section-view-counter {
  padding-bottom: 40px;
  background: #f1f0eb;

  .vc-container {
    position: relative;

    .wrapper {
      .row {
        .total {
          background: #130f26;
          color: #fff;
          text-align: center;
          padding: 20px 0 40px;

          p {
            margin-bottom: 5px;
          }

          p:first-child {
            font-size: 66px;
          }

          p:last-child {
            font-size: 20px;
          }
        }

        .content {
          background: #c5934b;
          color: #fff;
          padding: 20px 50px;

          h2 {
            margin-bottom: 15px;
            font-size: 30px;
            text-align: center;
          }

          p {
            margin-bottom: 5px;
            text-indent: 35px;
          }
        }
      }
    }
  }
}

.section-training {
  padding-bottom: 40px;
  background: #f1f0eb;

  h2 {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
  }

  .training-container {
    width: 90%;
    padding-left: 18px;

    .training-card-wrapper {
      .training-card {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border-radius: 10px;

        img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          object-position: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        p {
          padding: 20px 0;
          text-align: center;
        }
      }
    }
  }
}

.section-news {
  padding-bottom: 40px;
  background: #f1f0eb;

  h2 {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
  }

  .news-container {
    width: 90%;
    padding-left: 18px;

    .news-card-wrapper {
      .news-card {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border-radius: 10px;

        img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          object-position: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        p {
          padding: 20px 0;
          text-align: center;
        }
      }
    }
  }
}

.section-article {
  padding-bottom: 40px;
  background: #f1f0eb;

  h2 {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
  }

  .article-container {
    width: 90%;
    padding-left: 18px;

    .article-card-wrapper {
      .article-card {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border-radius: 10px;

        img {
          width: 100%;
          height: 350px;
          object-fit: cover;
          object-position: center;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        p {
          padding: 20px 0;
          text-align: center;
        }
      }
    }
  }
}

.section-media_list-media-reg {
  .col-media_list {
    background: #c5934b;

    .media_list-container {
      position: relative;
      height: 230px;

      .btn-media_list-previous {
        position: absolute;
        top: 10px;

        a {
          font-size: 30px;
          color: #fff;
        }
      }

      .btn-media_list-next {
        position: absolute;
        bottom: 10px;

        a {
          font-size: 30px;
          color: #fff;
        }
      }

      .media_list-content {
        padding-top: 12px;
        padding-left: 60px;

        h2 {
          height: 40px;
          margin-top: 5px;
          margin-bottom: 10px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        p {
          margin: 0 0 -15px;
          height: 48px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .col-media {
    background: #000000;

    .media-container {
      position: relative;
      height: 230px;
      margin: -12px;
      cursor: pointer;
      text-align: center;

      .media-image-1 {
        width: 100%;
        height: 230px;
        object-fit: cover;
        object-position: center;
        filter: brightness(50%);
      }

      i.fa {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 60px;
        color: #fff;
      }
    }
  }

  .col-reg {
    background: #001538;

    .reg-container {
      padding: 30px 40px;
      color: #fff;

      h2 {
        margin-bottom: 10px;
      }

      p {
        margin-bottom: 20px;
      }
    }
  }
}

.section-training-portfolio {
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;

  h2 {
    margin-bottom: 15px;
    font-size: 30px;
  }

  p {
    color: #b2b2b2;
  }

  .training-portfolio-container {
    margin-top: 30px;

    .training-portfolio-card {
      padding-bottom: 13px;
      background: #ffffff;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: center;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      p {
        margin-top: 8px;
        margin-bottom: 0;
        padding: 0 10px;
        font-size: 14px;
        color: var(--v-primary-base);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
      }
    }
  }
}

.section-media {
  padding: 5px 0;
  background: #f1f0eb;

  .media-wrapper {
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      height: 350px;
      object-fit: cover;
      object-position: center;
      filter: brightness(50%);
    }

    i.fa {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 60px;
      color: #fff;
    }
  }

  .content {
    padding: 0 15px;

    h2 {
      margin-bottom: 15px;
      font-size: 30px;
    }
  }
}

.section-cmlc {
  padding-bottom: 40px;

  .media-general {
    width: 100%;
    padding: 30px;
    background: #001538;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    color: #fff;

    i.fa {
      font-size: 60px;
    }

    h2 {
      font-size: 24px;
      margin: 5px 0 10px;
    }

    a {
      color: white;
    }
  }

  .cmlc-container {
    width: 100%;
    padding: 30px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    h2 {
      font-size: 24px;
      margin: 0 0 10px;
    }
  }
}

.section-supportor {
  padding: 10px 0;
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.25);

  div.supportor-title {
    width: 100%;

    p {
      margin: 0;
      font-size: 26px;
      text-align: center;
    }
  }

  .d-flex {
    align-items: center;

    div {
      width: 100%;
      padding: 15px 0;
      text-align: center;

      img {
        width: 50px;
      }
    }
  }
}

.media-video {
  padding: 15px 30px;

  h2 {
    padding: 15px 0;
    font-size: 26px;
  }
}
</style>

<style lang="scss">
.mobile-mode {
  .section-training {
    .slick-prev:before,
    .slick-next:before {
      font-size: 40px;
      color: #130f26 !important;
    }

    .slick-list {
      margin-left: 20px !important;
    }
  }
  .section-news {
    .slick-prev:before,
    .slick-next:before {
      font-size: 40px;
      color: #130f26 !important;
    }

    .slick-list {
      margin-left: 20px !important;
    }
  }
  .section-article {
    .slick-prev:before,
    .slick-next:before {
      font-size: 40px;
      color: #130f26 !important;
    }

    .slick-list {
      margin-left: 20px !important;
    }
  }
}
</style>
