<template>
  <div>
    <v-card class="search-card">
      <v-row  @click="openPage(detail_path, { id: data.id })">
        <v-col cols="6">
          <div class="thumbnail-video">
            <img v-if="!data.image_url" :src="`${image_url}${data.image}`" />
            <img v-else :src="data.image_url" />
          </div>
        </v-col>
        <v-col cols="6">
          <div
            class="recommend__content d-flex flex-column justify-space-between"
          >
            <div
              class="recommend__content-popover d-flex justify-end"
              v-if="is_popover"
            >
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon large>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item class="d-flex flex-column">
                    <v-list-item-title>
                      <v-btn text @click="$emit('edit', false)">
                        <v-icon>mdi-pencil</v-icon>
                        แก้ไข
                      </v-btn></v-list-item-title
                    >
                    <v-list-item-title>
                      <v-btn text @click="$emit('delete', false)">
                        <v-icon>mdi-delete </v-icon>
                        ลบ
                      </v-btn></v-list-item-title
                    >
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <h1 class="recommend__content-title">
              {{ $lang(data.name_th, data.name_en) }}
            </h1>
            <span class="recommend__content-subtitle">
              {{ $lang(data.title_th, data.title_en) }}
            </span>
            <div
              class="recommend__content-detail"
              v-html="$lang(data.detail_th, data.detail_en)"
            ></div>

            <div
              class="
                recommend__content-detail
                d-flex
                flex-column
                justify-space-between
              "
            >
              <span v-if="is_video">
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
              </span>
              <span>{{ data.created_at }}</span>
              <span v-if="is_total_view">{{
                $t('FORUM.TOTAL_VIEW').replace('%s', data.total_view)
              }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'MMediaGeneralCard',
    props: [ 'detail_path','data', 'is_total_view', 'is_popover', 'is_video'],
    data() {
      return {
        image_url: process.env.image_url,
      }
    },
    methods: {
      openPage(path, query = null) {
      this.$router.push({ path, query })
    }
    },
  }
</script>

<style lang="scss" scoped>
  .row {
    margin-top: 0.3rem;
    .col {
      .thumbnail-video {
        position: relative;
        padding: 3px 0 0 13px;
        img {
          max-width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      .recommend__content {
        text-align: left;
        /* height: 180px; */
        &-popover {
          margin-top: -12px;
          .v-list-item {
            &:after {
              content: '123';
              display: none;
            }
          }
        }
        &-title {
          font-size: 16px;
          color: #001538;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-subtitle {
          font-size: 12px;
          color: #001538;
        }
        &-detail,
        &-date {
          font-size: 12px;
          margin: 0;
          color: #b2b2b2;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &-detail {
          margin: 10px 0;
          .fa {
            color: #001538;
          }
        }
        &-readMore {
          .v-btn {
            padding: 0;
            font-size: 12px;
            color: #001538;
            background-color: transparent !important;
          }
        }
      }
    }
  }
  .search-card {
    padding: 3px 3px 0 3px;
    border-radius: 10px;
  }
</style>
