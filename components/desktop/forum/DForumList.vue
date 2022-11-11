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
            <div>
              <v-text-field
                v-model="keyword"
                @keypress="search"
                name="input-search"
                :label="$t('FORUM.SEARCH')"
                append-icon="mdi-magnify"
                solo
              ></v-text-field>
            </div>

            <div class="">
              <!-- <h2 class="category-title">
                {{ $t('FORUM.CATEGORY') }}
              </h2> -->

              <!-- <ul class="category-list">
                <li @click="changeCategory()">
                  {{ $lang('ทั้งหมด', 'All') }}
                </li>

                <li
                  v-for="category of category_list"
                  :key="category.id"
                  @click="changeCategory(category.id)"
                >
                  {{ $lang(category.name_th, category.name_en) }}
                </li>
              </ul> -->
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
          </v-col>

          <v-col cols="8">
            <div v-if="$store.state.user.user_id" class="forum-header">
              <v-row>
                <v-col cols="7">
                  <h2 class="forum-title">
                    <i
                      class="fa fa-chevron-left"
                      @click="openPage('/forum')"
                    ></i>
                    {{ $t('FORUM.FORUM_ALL') }}
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
            </div>

            <div v-if="total" class="pagination">
              <v-pagination
                v-model="page"
                @input="changePage()"
                :length="last_page"
                :total-visible="7"
              ></v-pagination>
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
    name: 'DForumList',
    components: {
      DArticleBanner,
      DForumCard,
    },
    data() {
      return {
        page: this.$route.query.page ? parseInt(this.$route.query.page) : 1,
        per_page: 10,
        last_page: 0,
        total: 0,
        category_list: [],
        forum_list: [],
        forum_category_id: this.$route.query.forum_category_id
          ? parseInt(this.$route.query.forum_category_id)
          : '',
        keyword: '',
        selectedItem:
          this.$route.query.forum_category_id == ''
            ? 0
            : parseInt(this.$route.query.forum_category_id),
      }
    },
    async mounted() {
      await this.getCategory()
      await this.getForum()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
        // this.forum_category_id = id
        // this.getForum()
        this.forum_category_id = query.forum_category_id
        this.getForum()
      },
      async changePage() {
        this.openPage('', {
          forum_category_id: this.forum_category_id,
          page: this.page,
        })
        await this.getForum()
      },
      async changeCategory(id = null) {
        if (id) {
          this.forum_category_id = id
          this.openPage('', { forum_category_id: this.forum_category_id })
        } else {
          this.forum_category_id = ''
          this.openPage('')
        }

        this.page = 1
        await this.getForum()
      },
      async search($event) {
        if ($event.key.toUpperCase() == 'ENTER') {
          this.keyword = this.keyword.trim()
          this.page = 1
          await this.getForum()
        }
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
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
          forum_category_id: this.forum_category_id,
          keyword: this.keyword,
        })

        this.forum_list = res.data.data.map((data) => {
          data.image_url = this.$getImageHtml(data.detail)
          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
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

    .forum-title {
      padding-top: 7px;

      i.fa {
        cursor: pointer;
        margin-right: 5px;
      }
    }

    .forum-header {
      margin-bottom: 20px;
    }

    .content-container {
      padding-top: 0px;
    }

    .pagination {
      margin-top: 50px;
    }
  }
</style>


<style lang="scss">
  .forum-container {
    .pagination .v-pagination {
      justify-content: end;
    }
  }
  .category-container-forum .v-sheet {
    padding: 20px 35px 35px 35px;
    background-color: #001538 !important;
  }
  .category-divider {
    border: 1px solid rgba(178, 178, 178, 0.14) !important;
  }
</style>