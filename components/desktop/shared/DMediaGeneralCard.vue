<template>
  <div>
    <v-card class="hover-card mb-3 card-media-card">
      <div class="media-card">
        <v-row>
          <v-col cols="3">
            <v-img
              @click="openPage(detail_path, { id: data.id })"
              :src="`${image_url}${data.image}`"
              alt="media-image"
              class="media-image"
            />
          </v-col>

          <v-col cols="9">
            <p
              @click="openPage(detail_path, { id: data.id })"
              class="media-topic"
            >
              {{ $lang(data.name_th, data.name_en) }}
            </p>

            <p class="media-detail">
              {{ $lang(data.detail_th, data.detail_en) }}
            </p>

            <v-row>
              <v-col cols="4">
                <i v-if="data.media_category_id == 1" class="fa fa-image"></i>
                <i
                  v-if="data.media_category_id == 2"
                  class="fa fa-volume-up"
                ></i>
                <i v-if="data.media_category_id == 3" class="fa fa-video"></i>
                <i
                  v-if="data.media_category_id == 4"
                  class="fa fa-file-alt"
                ></i>
              </v-col>

              <v-col cols="8" class="text-right">
                <div class="d-flex flex-end">
                  <p class="mr-4 mb-0">
                    <span class="media-label">
                      {{ $t('MEDIA_GENERAL.UPDATE_DATE') }}
                    </span>

                    <span class="media-value">
                      {{ data.updated_at }}
                    </span>
                  </p>

                  <p class="mb-0">
                    <span class="media-label">
                      {{
                        $t('MEDIA_GENERAL.TOTAL_VIEW').replace(
                          '%s',
                          data.total_view
                        )
                      }}
                    </span>
                  </p>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'DMediaGeneralCard',
    props: ['data', 'detail_path'],
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

<style lang="scss" scoped>
  .flex-end {
    justify-content: flex-end;
  }

  .media-card {
    padding: 15px 15px 5px 15px;
    border-bottom: 1px solid #e5e5e5;

    .media-image {
      width: 100%;
      height: 140px;
      object-fit: cover;
      object-position: center;
      cursor: pointer;
      border-radius: 10px;
    }

    .media-topic {
      font-weight: bold;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

    .media-detail {
      height: 65px;
      color: #b2b2b2;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .media-label,
    .media-value {
      font-size: 12px;
    }

    .media-value {
      color: #b2b2b2;
    }
  }

  .card-media-card {
    border-radius: 16px;
  }
</style>
