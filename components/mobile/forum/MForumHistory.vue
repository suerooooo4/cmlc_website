<template>
  <main>
    <MArticleBanner
      :title="$t('FORUM.TITLE')"
      :image="'/images/banner-forum.png'"
    />

    <section class="search">
      <v-row>
        <v-col cols="12">
          <v-btn @click="openPage('/forum')">
            {{ $t('FORUM.FORUM_ALL') }}
          </v-btn>
          <v-btn @click="openFormForum(null)">
            {{ $t('FORUM.FORUM_CREATE') }}
            <i class="mdi mdi-plus"></i>
          </v-btn>
        </v-col>
      </v-row>
    </section>
    <section class="latest-forum">
      <h1 class="latest-forum__title">{{ $t('FORUM.FORUM_HISTORY') }}</h1>
      <div v-for="(item, index) in forum_list" :key="index" class="pt-2">
        <MMediaGeneralCard
          @open="openDetailForum(item.id)"
          @edit="openFormForum(item.id)"
          @delete="deleteData(item.id)"
          :data="{
            name_th: item.user.fullname,
            name_en: item.user.fullname,
            title_th: item.name,
            title_en: item.name,
            total_view: item.total_view,
            created_at: item.created_at,
            image_url: item.image_url,
          }"
          :is_popover="true"
          :is_total_view="true"
        />
        <hr />
      </div>
    </section>
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      ref="infiniteloading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <v-dialog v-model="forum_detail_dialog" fullscreen hide-overlay>
      <MForumDetail
        :id="dialog_forum_id"
        @detail_dialog="closeForumDetailDialog"
      />
    </v-dialog>
    <v-dialog v-model="forum_form_dialog" fullscreen hide-overlay>
      <MForumForm :id="dialog_forum_id" @detail_dialog="closeForumFormDialog" />
    </v-dialog>
  </main>
</template>

<script>
  import Swal from 'sweetalert2'
  import MForumDetail from '~/components/mobile/forum/MForumDetail.vue'
  import MForumForm from '~/components/mobile/forum/MForumForm.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'

  export default {
    name: 'MForumHistory',
    components: {
      MForumDetail,
      MForumForm,
      MArticleBanner,
      MMediaGeneralCard,
    },
    data() {
      return {
        page: 1,
        per_page: 5,
        last_page: 0,
        total: 0,
        forum_list: [],
        forum_form_dialog: false,
        forum_detail_dialog: false,
        dialog_forum_id: null,
      }
    },
    mounted() {
      if (!this.$store.state.user.user_id) {
        this.$router.push({ path: '/' })
      }
    },
    methods: {
     openFormForum(id) {
        this.dialog_forum_id = id
        this.forum_form_dialog = true
      },
      openDetailForum(id) {
        this.dialog_forum_id = id
        this.forum_detail_dialog = true
      },
      async closeForumFormDialog(value) {
        this.forum_form_dialog = value
        await this.getForumHistory()
      },
      closeForumDetailDialog(value) {
        this.forum_detail_dialog = value
      },
      openPage(path) {
        this.$router.push({ path: path })
      },
      deleteData(id) {
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
              await this.getForumHistory()
              Swal.fire({
                title: this.$t('FORUM.DELETE_DIALOG.RESULT_TITLE'),
                text: this.$t('FORUM.DELETE_DIALOG.RESULT_TEXT'),
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: this.$t('FORUM.DELETE_DIALOG.BTN_OK'),
              })
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
      async getForumHistory() {
        this.page = 1
        this.$refs.infiniteloading.stateChanger.reset()
        let res = await this.$store.dispatch('forum/history', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'created_at',
          isDesc: true,
          isHistory: true,
        })
        this.forum_list = res.data.data.map((data) => {
          data.image_url = this.$getImageHtml(data.detail)
          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      infiniteScroll($state = null) {
        setTimeout(async () => {
          let res = await this.$store.dispatch('forum/history', {
            page: this.page,
            perPage: this.per_page,
            orderBy: 'created_at',
            isDesc: true,
          })
          if (res.data.data.length >= 1) {
            this.forum_list = this.forum_list.concat(
              res.data.data.map((data) => {
                data.image_url = this.$getImageHtml(data.detail)
                return data
              })
            )
            this.last_page = res.data.lastPage
            this.total = res.data.total
            this.page++
            $state.loaded()
          } else {
            $state.complete()
          }
        }, 500)
      },
    },
  }
</script>

<style scoped lang="scss">
  .search {
    margin-top: 1rem;
    .v-btn {
      margin: 0 5px;
      background: #001538;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.09);
      border-radius: 4px;
      color: #fff;
      width: 45%;
      height: 56px;
      padding: 7px 13px;
    }
  }
  .latest-forum {
    margin-top: 1rem;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }
    .row {
      margin-top: 0.3rem;
      .col {
        .thumbnail-video {
          position: relative;
          img {
            max-width: 100%;
            height: 150px;
            object-fit: cover;
          }
        }
        .recommend__content {
          text-align: left;
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
  }
</style>

<style>
  .v-list-item::after {
    display: none;
  }
</style>
