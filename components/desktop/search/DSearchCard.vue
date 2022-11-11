<template>
  <div>
    <v-card class="hover-card mb-3 card-search-card">
      <div class="search-card">
        <v-row>
          <v-col cols="3">
            <v-img
              @click="openPage(data.url, { id: data.id })"
              :src="`${image_url}${data.image}`"
              class="search-image"
            />
          </v-col>

          <v-col cols="9">
            <p
              @click="openPage(detail_path, { id: data.id })"
              class="search-topic"
            >
              {{ $lang(data.name_th, data.name_en) }}
            </p>

            <p class="search-detail">
              {{ $lang(data.detail_th, data.detail_en) }}
            </p>

            <v-row>
              <v-col cols="12" class="text-right">
                <div class="d-flex flex-end">
                  <p class="mr-4 mb-0">
                    <span class="search-label">
                      {{ $t('SEARCH.UPDATE_DATE') }}
                    </span>

                    <span class="search-value">
                      {{ data.updated_at }}
                    </span>
                  </p>

                  <p class="mb-0">
                    <span class="search-label">
                      {{
                        $t('SEARCH.TOTAL_VIEW').replace('%s', data.total_view)
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
    name: 'DSearchCard',
    props: ['data'],
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

  .search-card {
    // padding: 15px 0 5px;
    padding: 15px 15px 5px 15px;
    // border-bottom: 1px solid #e5e5e5;

    .search-image {
      width: 100%;
      height: 140px;
      object-fit: cover;
      object-position: center;
      cursor: pointer;
      border-radius: 10px;
    }

    .search-topic {
      font-weight: bold;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

    .search-detail {
      height: 63px;
      color: #b2b2b2;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .search-label,
    .search-value {
      font-size: 12px;
    }

    .search-value {
      color: #b2b2b2;
    }
  }
  .card-search-card {
    border-radius: 16px;
  }
</style>
