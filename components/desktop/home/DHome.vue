<template>
  <div>
  <!--   <section v-if="pop_up_speci">
        <div  v-on="openSpeci()"></div>
    </section> -->
    <section v-if="pop_up_speci">
            <div v-if="$store.state.user.user_id"></div>
      <div v-else v-on="openSpeci()"></div>
     </section>
    <section class="section-banner">
      <v-carousel
        v-model="banner_showing"
        hide-delimiters
        class="banner-carousel"
        :cycle="true"
        :interval="3000"
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="banner in banner_list"
          :key="banner.id"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
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
          <div class="text-center">
            <v-row>
              <v-col cols="12" class="content white--text">
                <h2>
                  {{ $t('HOME.VIEW_COUNTER.CONTENT_TITLE') }}
                </h2>
                <p>{{ $t('HOME.VIEW_COUNTER.CONTENT_DETAIL') }}</p>
                <!-- <v-btn class="ma-2" outlined color="white">
                  <div class="pr-2">
                    {{ $t('HOME.VIEW_COUNTER.CONTENT_BUTTON') }}
                  </div>
                  <i class="fas fa-chevron-circle-right"></i>
                </v-btn> -->
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
                class="news-card hover-card"
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
          <v-col class="col-media_list">
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
                    openPage('/media-master/detail', {
                      id: media_playlist_showing.media.id,
                    })
                  "
                  >{{ $t('HOME.MEDIA_MASTER_LIST.BUTTON') }}
                  <i class="fa fa-chevron-circle-right"></i
                ></a>
              </div>

              <div class="btn-media_list-next">
                <a @click="previousMediaPlaylist(media_playlist_showing.index)">
                  <i class="fa fa-chevron-circle-down" ></i>
                </a>
              </div>
            </div>
          </v-col>

          <v-col class="col-media">
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

          <v-col class="col-reg">
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
                class="training-card hover-card"
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

    <section class="section-database">
      <ul class="banner-slide"  @click="openPage('/media-master')">
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
                <h2 style="color: rgba(255, 255, 255, 0.808); cursor: pointer;">
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
                class="article-card hover-card"
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
        <v-row>
          <v-col cols="6">
            <div class="media-general ml-2">
              <i class="fa fa-video"></i>

              <h2 v-html="$t('HOME.BOOKING.TITLE')"></h2>
              <h2 v-html="$t('HOME.BOOKING.TITLE2')"></h2>
              <a color="red" @click="openPage('/booking?tab=1')"
                >{{ $t('HOME.BUTTON_VIEW_MORE') }}
                <v-icon class="ml-1 icon-next-more" color="#130F26" size="20"
                  >mdi-chevron-right-circle</v-icon
                >
              </a>
              <!-- <p>{{ $t('HOME.MEDIA_GENERAL.DETAIL') }}</p> -->
            </div>
          </v-col>
          <v-col cols="6">
            <div class="cmlc-container mr-2">
              <h2>{{ $t('HOME.CMLC.TITLE') }}</h2>

              <p>{{ $t('HOME.CMLC.DETAIL') }}</p>

              <a color="#130F26" @click="openPage('/article')"
                >{{ $t('HOME.BUTTON_VIEW_MORE') }}
                <v-icon class="ml-1 icon-next-more" color="#130F26" size="20"
                  >mdi-chevron-right-circle</v-icon
                >
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="section-supportor">
      <v-container>
        <div class="d-flex">
          <div class="supportor-title">
            <p>{{ $t('HOME.SUPPORTOR.TITLE') }}</p>
          </div>

          <div class="first-supportor">
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

    <v-dialog v-model="media_video_dialog" persistent max-width="800">
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

    <v-dialog v-model="register_dialog" persistent max-width="700">
      <DRegister @register_dialog="closeRegisterModal" />
    </v-dialog>

    <v-dialog v-model="login_dialog" persistent max-width="700">
      <DLogin @login_dialog="closeLoginModal" />
    </v-dialog>
     <v-dialog v-model="speci_dialog_regi" persistent max-width="700">
      <Dspecial @speci_dialog_regi ="closeSpeciModal" />
    </v-dialog>
    <!-- <v-dialog v-model="speci_dialog" max-width="600">
      <Dspecial_new @speci_dialog ="closeSpeciModal" />
    </v-dialog> -->
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import DRegister from '~/components/desktop/shared/DRegister.vue'
import DLogin from '~/components/desktop/shared/DLogin.vue'
import Dspecial from '~/components/desktop/shared/Dspecial.vue'
import Dspecial_new from '~/components/desktop/shared/Dspecial_new.vue'
export default {
  name: 'DHome',
  components: {
    VueSlickCarousel,
    DRegister,
    DLogin,
    Dspecial,
    Dspecial_new
  },
  data() {
    return {
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
        {
          id: 6,
          image_path: '/images/home-banner-database/banner-database-6.png',
        },
      ],
      banner_database_showing: 0,
      banner_showing: 0,
      view_counter: 0,
      training_list: [],
      article_list: [],
      media_mater_list: [],
      news_list: [],
      media_playlist_list: [],
      media_playlist_showing: null,
      media_showing: null,
      media_video_dialog: false,
      register_dialog: false,
      login_dialog: false,
      vue_slick_option: {
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        nextArrow: '.next_caro',
        prevArrow: '.previous_caro',
      },
      view_video: false,
      speci_dialog: false,
      speci_dialog_regi: false,
      pop_up_speci: true,
    }
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getData() {
      await this.getBanner()
      await this.getViewCounter()
      await this.getTraining()
      await this.getNews()
      await this.getArticle()
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
      this.speci_dialog = false
      this.speci_dialog_regi=false
      this.pop_up_speci=false
    },
  },
}
</script>

 <style scoped lang="scss">
.section-banner {
  height: 500px;
  background: #c8c8c8;

  .banner-carousel {
    background-color: #fff;
    .row {
      margin: 0 !important;
    }

    .banner-image {
      width: 100%;
      height: 500px;
      object-fit: cover;
      object-position: center;
    }
  }
}

ul li img {
  width: 100%;
  height: 385px;
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
li{
  cursor: pointer;
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
.section-database {
  width: 100%;
  height: 385px;
  background: #c8c8c8;

  .banner-carousel {
    background-color: #fff;
    .row {
      margin: 0 !important;
    }
    .banner-image {
      cursor: pointer;
    }
  }

  .containers {
    width: 100%;
    position: relative;
    text-align: center;
    color: white;
  }

  .container {
    padding: 0 12px 0;
  }

  .top-left {
    position: absolute;
    margin-top: 4rem;
    width: 30%;
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
    font-size: 18px;
    color: rgba(255, 255, 255, 0.808);
    cursor: pointer;
  }
}

.section-view-counter {
  padding: 50px 0;
  background: #001538;
}

.section-training {
  padding-bottom: 48px;
  // background: #f1f0eb;

  h2 {
    margin-bottom: 12px;
    text-align: center;
    font-size: 36px;
  }

  .training-container {
    width: 100%;

    .training-card-wrapper {
      padding: 0 15px;

      .training-card {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border-radius: 16px;

        img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center;
          border-top-right-radius: 16px;
          border-top-left-radius: 16px;
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
  padding-bottom: 48px;
  // background: #f1f0eb;

  h2 {
    margin-bottom: 12px;
    text-align: center;
    font-size: 36px;
  }

  .news-container {
    width: 100%;

    .news-card-wrapper {
      padding: 0 15px;

      .news-card {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border-radius: 16px;

        img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center;
          border-top-right-radius: 16px;
          border-top-left-radius: 16px;
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
  background: linear-gradient(90deg, #c5934b 50%, #001538 50%);

  .col-media_list {
    .media_list-container {
      position: relative;
      height: 200px;

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
        padding-top: 30px;

        padding-left: 60px;

        h2 {
          height: 40px;
          margin: 0 0 0;
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
    background: #000;

    .media-container {
      position: relative;
      height: 230px;
      width: 395px;
      margin: -12px;
      cursor: pointer;
      text-align: center;

      video {
        width: 100%;
        height: 100%;
      }

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

.section-media {
  padding: 50px 0;
  background: #f1f0eb;

  .media-wrapper {
    position: relative;
    cursor: pointer;

    img {
      width: 100%;
      height: 380px;
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
      font-size: 36px;
    }

    p {
      line-height: 30px;
    }
  }
}

.section-cmlc {
  padding-bottom: 28px;
  .col {
    padding: 0;
  }
  .media-general {
    // width: 42%;
    height: 350px;
    padding: 60px 30px;
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
    // width: 58%;
    // margin: 30px 0;
    height: 350px;
    padding: 30px 60px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    h2 {
      font-size: 24px;
      margin: 0 0 10px;
    }
    p {
      color: #b2b2b2;
    }
  }
}

.section-article {
  padding-bottom: 0px;
  // background: #f1f0eb;
  h2 {
    margin-bottom: 12px;
    text-align: center;
    font-size: 36px;
  }

  .article-container {
    width: 100%;

    .article-card-wrapper {
      padding: 0 15px;

      .article-card {
        background: #ffffff;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        border-radius: 16px;

        img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          object-position: center;
          border-top-right-radius: 16px;
          border-top-left-radius: 16px;
        }

        p {
          padding: 20px 0;
          text-align: center;
        }
      }
    }
  }
}

.section-supportor {
  padding: 40px 0;
  box-shadow: 0px 4px 20px 5px rgba(0, 0, 0, 0.25);

  .d-flex {
    align-items: center;

    div.supportor-title {
      width: 100%;

      p {
        margin: 0;
        font-size: 26px;
      }
    }

    .first-supportor {
      border-left: 1px solid #e5e5e5;
    }

    div:not(.supportor-title) {
      width: 100%;
      padding: 15px 0;
      text-align: center;

      img {
        width: 80px;
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
.icon-next-more {
  background-color: #ffffff;
  width: 10px;
  height: 10px;
}
</style>

<style lang="scss">
.desktop-mode {
  .section-training {
    .slick-prev:before,
    .slick-next:before {
      font-size: 50px;
      color: #130f26 !important;
      opacity: 1;
    }

    .slick-list {
      margin-left: 0px !important;
    }
  }

  .section-news {
    .slick-prev:before,
    .slick-next:before {
      font-size: 50px;
      color: #130f26 !important;
      opacity: 1;
    }

    .slick-list {
      margin-left: 0px !important;
    }
  }
  .section-article {
    .slick-prev:before,
    .slick-next:before {
      font-size: 50px;
      color: #130f26 !important;
      opacity: 1;
    }

    .slick-list {
      margin-left: 0px !important;
    }
  }

  .slick-prev {
    left: -20px;
    z-index: 999;
  }

  .slick-next {
    right: 10px;
    z-index: 999;
  }
}

.bg-height {
  height: 300px;
  cursor: pointer;
}
.video-style {
  width: 100%;
  height: 300px;
  background-color: #000;
}
</style>
