<template>
  <main>
    <MArticleBanner
      :title="$t('FORUM.TITLE')"
      :image="'/images/banner-forum.png'"
    />

    <section class="categories">
      <h1 class="categories__title">{{ $t('FORUM.CATEGORY') }}</h1>
      <v-sheet class="mx-auto pb-3 pt-3" max-width="700">
        <v-slide-group class="a" show-arrows>
          <v-slide-item v-for="item in category_list" :key="item.id">
            <v-btn
              class="mx-2"
              :input-value="item.is_active"
              active-class="gray indigo--text"
              depressed
              rounded
              @click="
                openCategory('/forum/list', { forum_category_id: item.id })
              "
            >
              {{ $lang(item.name_th, item.name_en) }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>
    <section class="search">
      <v-row>
        <v-col cols="12">
          <v-btn
            @click="openPage('/forum/history')"
            v-if="$store.state.user.user_id"
          >
            {{ $t('FORUM.FORUM_HISTORY') }}
          </v-btn>
          <v-btn @click="openFormForum('1')" v-if="$store.state.user.user_id">
            {{ $t('FORUM.FORUM_CREATE') }}
            <i class="mdi mdi-plus"></i>
          </v-btn>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-text-field
            append-icon="mdi-magnify"
            v-model="form.keyword"
            @keyup="changeInput"
            @keydown="keyDownInput"
            type="text"
            :label="$t('FORUM.SEARCH')"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </section>
    <section class="latest-forum">
      <h1 class="latest-forum__title">{{ $t('FORUM.LATEST_FORUM') }}</h1>
      <div v-for="(item, index) in forum_list" :key="index" class="pt-2"
        @click="openPage('/forum/detail', { id: item.id })">
        <MMediaGeneralCard
          :data="{
            name_th: item.user.fullname,
            name_en: item.user.fullname,
            title_th: item.name,
            title_en: item.name,
            total_view: item.total_view,
            created_at: item.created_at,
            image_url: item.image_url,
          }"
          :is_total_view="true"
          class="media-general-card pb-2"
        />
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
<!--     <v-dialog v-model="forum_detail_dialog" fullscreen hide-overlay>
      <MForumDetail
        :id="dialog_forum_id"
        @detail_dialog="closeForumDetailDialog"
      />
    </v-dialog> -->
    <v-dialog v-model="forum_form_dialog" fullscreen hide-overlay>
      <MForumForm :id="dialog_forum_id" @detail_dialog="closeForumFormDialog" />
    </v-dialog>
  </main>
</template>

<script>
  import MForumDetail from '~/components/mobile/forum/MForumDetail.vue'
  import MForumForm from '~/components/mobile/forum/MForumForm.vue'
  import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
  import MMediaGeneralCard from '~/components/mobile/shared/MMediaGeneralCard.vue'
  export default {
    name: 'MForumList',
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
        form: {
          keyword: '',
        },
        typingTimer: null,
        doneTypingInterval: 1000,
        category_list: [],
        forum_list: [],
        forum_detail_dialog: false,
        forum_form_dialog: false,
        dialog_forum_id: null,
        forum_category_id: this.$route.query.forum_category_id
          ? parseInt(this.$route.query.forum_category_id)
          : '',
      }
    },
    mounted() {
      this.getCategory()
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
      closeForumFormDialog(value) {
        this.forum_form_dialog = value
      },
      closeForumDetailDialog(value) {
        this.forum_detail_dialog = value
      },
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
      openCategory(path, query) {
        this.$router.push({ path, query })
        this.activeCategory(query.forum_category_id)
        this.forum_category_id = query.forum_category_id
        this.getForum()
      },
      activeCategory(id) {
        this.category_list.map((data) => (data.is_active = false))
        const index = this.category_list.findIndex((data) => data.id == id)
        this.category_list[index].is_active = !this.category_list[index].is_active
      },
      keyDownInput(event) {
        clearTimeout(this.typingTimer)
      },
      changeInput(event) {
        clearTimeout(this.typingTimer)
        this.typingTimer = setTimeout(async () => {
          this.getForum()
        }, this.doneTypingInterval)
      },
      async getMostViewForum() {
        this.page = 1
        let res = await this.$store.dispatch('forum/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: 'total_view',
          isDesc: true,
        })
        this.forum_most_view_list = res.data.data
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      async getCategory() {
        let res = await this.$store.dispatch('forum_category/get')
        this.category_list = res.data.map((data) => {
          data.is_active = false
          return data
        })
        this.category_list.unshift({
          id: 0,
          name_en: 'All',
          name_th: 'ทั้งหมด',
        })
        if (this.$route.query.forum_category_id != null) {
          this.activeCategory(this.$route.query.forum_category_id)
        } else {
          this.activeCategory(this.category_list[0].id)
        }
      },
      async modelGetForum() {
        return await this.$store.dispatch('forum/pagination', {
          page: this.page,
          perPage: this.per_page,
          keyword: this.form.keyword,
          orderBy: 'created_at',
          isDesc: false,
          forum_category_id:
            this.forum_category_id != 0 ? this.forum_category_id : '',
        })
      },
      async getForum() {
        this.page = 1
        let res = await this.modelGetForum()
        this.forum_list = res.data.data.map((data) => {
          data.image_url = this.$getImageHtml(data.detail)
          return data
        })
        this.$refs.infiniteloading.stateChanger.reset()
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
      },
      infiniteScroll($state = null) {
        setTimeout(async () => {
          let res = await this.modelGetForum()
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
  .categories {
    max-width: 100vw;
    background-color: #f8f7f6;
    margin-top: 1rem;
    margin-left: -12px;
    margin-right: -12px;

    &__title {
      text-align: center;
      padding-top: 15px;
      font-size: 20px;
    }
    .v-sheet {
      background-color: unset;
      border-color: unset;
      color: #001538;
    }
  }
  .search {
    margin-top: 1rem;

    .v-input {
      .v-text-field__details {
        display: none !important;
      }
    }

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
  }
  .media-general-card {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
</style>
