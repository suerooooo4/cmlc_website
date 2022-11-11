<template>
  <div>
    <DArticleBanner
      :title="$t('FORUM.TITLE')"
      :image="'/images/banner-forum.png'"
    />

    <section class="forum-container">
      <v-container>
        <v-row>
          <v-col cols="4">
            <div class="">
              <v-card class="category-container-forum">
                <v-list class="pb-0 pt-5">
                  <v-list-item>
                    <h2 class="category-title white--text">
                      {{ $t('FORUM.CATEGORY') }}
                    </h2>
                  </v-list-item>
                </v-list>
                <v-list nav dense class="pb-5">
                  <v-list-item-group v-model="selectedItem" color="#ffffff">
                    <div
                      v-for="(category, i) in category_list"
                      :key="i"
                      class="ma-2"
                    >
                      <v-hover v-slot:default="{ hover }">
                        <v-list-item
                          :class="hover ? 'mt-1 mb-2 list-hover' : 'mt-1 mb-2'"
                          @click="
                            openPage('/forum/list', {
                              forum_category_id: category.id,
                            })
                          "
                        >
                          <v-list-item-content>
                            <v-list-item-title class="white--text">
                              {{ $lang(category.name_th, category.name_en) }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-hover>
                      <v-divider
                        v-if="i < category_list.length - 1"
                        class="category-divider"
                      ></v-divider>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </div>

            <div class="most-view-container">
              <h2 class="most-view-title white--text">
                {{ $t('FORUM.MOST_VIEW') }}
              </h2>

              <ul class="most-view-list">
                <li
                  v-for="(forum, index) of forum_most_view_list"
                  :key="forum.id"
                >
                  <div class="d-flex white--text pl-2 pr-2">
                    <p class="forum-no">{{ index + 1 }}</p>

                    <div class="forum-info">
                      <p
                        @click="openPage('/forum/detail', { id: forum.id })"
                        class="forum-topic"
                      >
                        {{ forum.name }}
                      </p>

                      <p class="forum-total">
                        <span>{{ forum.created_at }}</span>

                        <span>
                          {{
                            $t('FORUM.TOTAL_VIEW').replace(
                              '%s',
                              forum.total_view
                            )
                          }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <v-divider class="category-divider mb-0"></v-divider>
                </li>
              </ul>
            </div>
          </v-col>

          <v-col cols="8">
            <div v-if="$store.state.user.user_id" class="forum-header">
              <v-row>
                <v-col cols="7">
                  <h2 class="forum-title">
                    <img
                      class="pr-2"
                      width="40"
                      src="/images/forum/forum.png"
                    />{{ $t('FORUM.FORUM_ALL') }}
                  </h2>
                </v-col>

                <v-col class="text-right">
                  <div>
                    <v-btn
                      @click="openPage('/forum/history')"
                      color="primary"
                      large
                      depressed
                    >
                      {{ $t('FORUM.FORUM_HISTORY') }}
                    </v-btn>

                    <v-btn
                      @click="openPage('/forum/form')"
                      class="ml-2"
                      color="primary"
                      large
                      depressed
                    >
                      {{ $t('FORUM.FORUM_CREATE') }}
                      <i class="fa fa-plus ml-2"></i>
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="content-container">
              <v-row>
                <v-col>
                  <div v-for="forum of forum_list" :key="forum.id">
                    <DForumCard :data="forum" :detail_path="'/forum/detail'" />
                  </div>
                </v-col>
              </v-row>

              <v-row class="mt-5">
                <v-col class="text-center">
                  <v-btn @click="openPage('/forum/list')" large color="primary">
                    {{ $t('FORUM.ACTION_MORE') }}
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DForumCard from '~/components/desktop/forum/DForumCard.vue'

  export default {
    name: 'DForum',
    components: {
      DArticleBanner,
      DForumCard,
    },
    data() {
      return {
        category_list: [],
        forum_most_view_list: [],
        forum_list: [],
        selectedItem: 0,
      }
    },
    async mounted() {
      await this.getCategory()
      await this.getMostViewForum()
      await this.getForum()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getCategory() {
        let res = await this.$store.dispatch('forum_category/get')
        let all = {
          id: '',
          name_th: 'ทั้งหมด',
          name_en: 'All',
        }
        this.category_list = res.data
        this.category_list.unshift(all)
      },
      async getForum() {
        let res = await this.$store.dispatch('forum/pagination', {
          page: 1,
          perPage: 8,
          orderBy: 'created_at',
          isDesc: true,
        })
        this.forum_list = res.data.data.map((data) => {
          data.image_url = this.$getImageHtml(data.detail)
          return data
        })
      },
      async getMostViewForum() {
        let res = await this.$store.dispatch('forum/pagination', {
          page: 1,
          perPage: 5,
          orderBy: 'total_view',
          isDesc: true,
        })
        this.forum_most_view_list = res.data.data
      },
    },
  }
</script>

<style scoped lang="scss">
  .forum-container {
    padding: 50px 0 100px;

    .category-container {
      padding: 35px 35px 45px;
      background: #f8f7f6;
      border-radius: 6px;

      .category-title {
        margin-bottom: 15px;
        padding: 0 15px;
        font-size: 28px;
      }

      .category-list {
        list-style: none;
        padding: 0;

        li {
          padding: 15px;
          border-bottom: 1px solid #e5e5e5;
          cursor: pointer;
        }
      }
    }

    .most-view-container {
      background-color: #001538 !important;
      margin-top: 30px;
      padding: 35px 35px 45px;
      border-radius: 6px;

      .most-view-title {
        margin-bottom: 15px;
        padding: 0 15px;
        font-size: 28px;
      }

      .most-view-list {
        list-style: none;
        padding: 0;

        li {
          padding: 10px 10px 0 10px;

          .forum-no {
            width: 50px;
            font-size: 26px;
            font-weight: bold;
          }

          .forum-info {
            width: 100%;

            .forum-topic {
              margin-bottom: 5px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              cursor: pointer;
            }

            .forum-total {
              margin: 0;
              display: flex;
              align-items: stretch;

              span {
                width: 50%;
                font-size: 12px;
                color: #8c8c8c;
              }

              span:last-child {
                text-align: right;
              }
            }
          }
        }
      }
    }

    .forum-title {
      padding-top: 7px;
    }

    .forum-header {
      margin-bottom: 20px;
    }

    .content-container {
      padding-top: 0px;
    }
  }

  .category-container-forum .v-sheet {
    padding: 20px 35px 35px 35px;
    background-color: #001538 !important;
  }
  .category-divider {
    border: 1px solid rgba(178, 178, 178, 0.14);
  }
</style>
