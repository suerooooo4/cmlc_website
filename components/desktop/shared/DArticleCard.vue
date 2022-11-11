<template>
  <div>
    <div
      @click="openPage(detail_path, { id: data.id })"
      class="article-container hover-card"
    >
      <img
        :src="`${image_url}${data.image}`"
        class="article-image"
        alt="article-image"
      />

      <div class="article-info">
        <div v-if="training == 'training_video'" class="icon-play">
          <v-btn class="" fab dark color="primary">
            <svg
              width="20"
              height="30"
              viewBox="0 0 26 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24.263 14.977C24.263 11.391 5.88257 -0.0811834 3.79754 1.98159C1.7125 4.04436 1.51201 25.7154 3.79754 27.9725C6.08306 30.2376 24.263 18.5631 24.263 14.977Z"
                fill="#001538"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </v-btn>
        </div>
        <p class="article-date">
          {{ data.created_at }}
        </p>

        <p class="article-topic">
          {{ $lang(data.name_th, data.name_en) }}
        </p>

        <p class="article-detail">
          {{ $lang($stripHtml(data.detail_th), $stripHtml(data.detail_en)) }}
        </p>

        <v-row v-if="data.duration || data.total_view" class="mt-2">
          <v-col class="text-left">
            <span v-if="data.duration" class="duration">
              {{
                `${parseFloat(data.duration)
                  .toFixed(2)
                  .toString()
                  .replace('.', ':')} ${$t('SHARED.ARTICLE_CARD.MINUTE')}`
              }}
            </span>
            <div v-if="training == 'training_portfolio_latest'">
              <a color="#130F26" @click="openPage('/course-law')"
                >{{ $t('HOME.BUTTON_VIEW_MORE') }}
                <v-icon class="ml-1 icon-next-more" color="#130F26" size="20"
                  >mdi-chevron-right-circle</v-icon
                >
              </a>
            </div>
          </v-col>

          <v-col class="text-right">
            <span v-if="data.total_view" class="total-view">
              {{
                $t('SHARED.ARTICLE_CARD.TOTAL_VIEW').replace(
                  '%s',
                  data.total_view
                )
              }}
            </span>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DArticleCard',
    props: ['data', 'duration', 'total_view', 'detail_path', 'training'],
    data() {
      return {
        image_url: process.env.image_url,
      }
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
    },
  }
</script>

<style scoped lang="scss">
  .article-container {
    cursor: pointer;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 18px rgb(0 0 0 / 25%);

    .article-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      object-position: center;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .article-info {
      padding: 10px 15px;

      .article-date,
      .article-topic,
      .article-detail {
        margin-bottom: 5px;
      }

      .article-date,
      .article-detail,
      .duration,
      .total-view {
        font-size: 14px;
        color: #b2b2b2;
      }
      .duration,
      .total-view {
        color: #001538;
      }

      .article-topic {
        font-weight: bold;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .article-detail {
        min-height: 42px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .icon-play {
      position: absolute;
      margin-top: -45px;
      margin-left: 270px;
    }
  }
</style>
