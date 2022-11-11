<template>
  <div>
    <DArticleBanner
      :title="$t('FORUM.TITLE')"
      :image="'/images/banner-forum.png'"
    />

    <section class="forum-container">
      <v-container>
        <v-row>
          <v-col>
            <div class="filter-form">
              <v-row>
                <v-col cols="7">
                  <h2 class="forum-title">
                    {{ $t('FORUM.FORUM_HISTORY') }}
                  </h2>
                </v-col>

                <v-col class="text-right">
                  <div>
                    <v-btn
                      @click="openPage('/forum/list')"
                      color="primary"
                      large
                      depressed
                    >
                      {{ $t('FORUM.FORUM_ALL') }}
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
                    <DForumCard
                      :data="forum"
                      :detail_path="'/forum/detail'"
                      :editable="true"
                      @delete="deleteData(forum.id)"
                    />
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>

        <div v-if="total" class="pagination">
          <v-pagination
            v-model="page"
            @input="changePage()"
            :length="last_page"
            :total-visible="7"
          ></v-pagination>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
  import Swal from 'sweetalert2'
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
  import DForumCard from '~/components/desktop/forum/DForumCard.vue'

  export default {
    name: 'DForumHistory',
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
        forum_list: [],
      }
    },
    mounted() {
      this.$auth()
      this.getForum()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async changePage() {
        this.openPage('', { page: this.page })
        await this.getForum()
      },
      async getForum() {
        let res = await this.$store.dispatch('forum/history', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
        })

        this.forum_list = res.data.data.map((data) => {
          data.image_url = this.$getImageHtml(data.detail)
          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
      },
      async deleteData(id) {
        Swal.fire({
          title: this.$t('FORUM.DELETE_DIALOG.TITLE'),
          text: this.$t('FORUM.DELETE_DIALOG.TEXT'),
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: this.$t('FORUM.DELETE_DIALOG.BTN_OK'),
          cancelButtonText: this.$t('FORUM.DELETE_DIALOG.BTN_CANCEL'),
        }).then(async (result) => {
          if (result.isConfirmed) {
            let res = await this.$store.dispatch('forum/delete', id)

            if (res.status == 'success') {
              Swal.fire({
                title: this.$t('FORUM.DELETE_DIALOG.RESULT_TITLE'),
                text: this.$t('FORUM.DELETE_DIALOG.RESULT_TEXT'),
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: this.$t('FORUM.DELETE_DIALOG.BTN_OK'),
              })
              await this.getForum()
            } else {
              Swal.fire({
                title: this.$t('SHARED.DIALOG.ERROR'),
                text: this.$t(`SHARED.RESPONSE_MSG.${res.error}`),
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
              })
            }
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .forum-container {
    padding: 50px 0 100px;

    .forum-title {
      padding-top: 7px;
    }

    .content-container {
      padding-top: 50px;
    }

    .pagination {
      margin-top: 50px;
    }
  }
</style>
