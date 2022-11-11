<template>
  <div>
    <v-card class="hover-card mb-3 card-form-card">
      <div class="forum-card">
        <v-row>
          <v-col cols="3">
            <v-img
              @click="openPage(detail_path, { id: data.id })"
              :src="data.image_url"
              class="forum-image"
            />
          </v-col>

          <v-col cols="9">
            <div v-if="editable" class="float-right">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn plain icon color="primary" v-bind="attrs" v-on="on">
                    <i class="fa fa-ellipsis-h"></i>
                  </v-btn>
                </template>

                <v-list dark color="primary">
                  <v-list-item link>
                    <v-list-item-title
                      @click="openPage('/forum/form', { id: data.id })"
                    >
                      <i class="fa fa-pen mr-2"></i>
                      {{ $t('FORUM.ACTION.UPDATE') }}
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item link>
                    <v-list-item-title @click="$emit('delete')">
                      <i class="fa fa-trash mr-2"></i>
                      {{ $t('FORUM.ACTION.DELETE') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>

            <p
              @click="openPage(detail_path, { id: data.id })"
              class="forum-topic"
            >
              {{ data.name }}
            </p>

            <p class="forum-detail">
              {{ $stripHtml(data.detail) }}
            </p>

            <v-row>
              <v-col cols="">
                <div class="d-flex">
                  <p class="mr-4">
                    <span class="forum-creator">
                      {{ data.user.fullname }}
                    </span>
                  </p>

                  <p>
                    <span class="forum-value">
                      {{ data.created_at }}
                    </span>
                  </p>
                </div>
              </v-col>

              <v-col cols="4" class="text-right">
                <div class="d-flex flex-end">
                  <p>
                    <span class="forum-value">
                      {{
                        $t('FORUM.TOTAL_VIEW').replace('%s', data.total_view)
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
    name: 'DForumCard',
    props: ['data', 'detail_path', 'editable'],
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

  .forum-card {
    padding: 15px 15px 5px 15px;
    // border-bottom: 1px solid #e5e5e5;

    .forum-image {
      width: 100%;
      height: 150px;
      object-fit: cover;
      object-position: center;
      cursor: pointer;
      border-radius: 10px;
    }

    .forum-topic {
      margin-right: 80px;
      font-weight: bold;
      font-size: 18px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      cursor: pointer;
    }

    .forum-detail {
      min-height: 60px;
      color: #b2b2b2;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .forum-label,
    .forum-value {
      font-size: 12px;
    }

    .forum-value {
      color: #b2b2b2;
    }

    .forum-creator {
      font-size: 12px;
    }
  }
  .card-form-card {
    border-radius: 16px;
  }
</style>
