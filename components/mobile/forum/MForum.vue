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
         <v-btn @click="openFormForum(null)">
            {{ $t('FORUM.FORUM_CREATE') }}
            <i class="mdi mdi-plus"></i>
          </v-btn>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-text-field
            append-icon="mdi-magnify"
            type="text"
            v-model="form.keyword"
            @keyup="changeInput"
            @keydown="keyDownInput"
            :label="$t('FORUM.SEARCH')"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-text-field>
        </v-col>
      </v-row>
    </section>
    <section class="visit-hot">
      <h1 class="visit-hot__title">{{ $t('FORUM.MOST_VIEW') }}</h1>
      <v-row
        v-for="(item, index) in forum_most_view_list"
        :key="index"
        @click="openDetailForum(item.id)"
      >
        <v-col cols="2"
          ><h1 class="visit-hot__title">0{{ index + 1 }}</h1></v-col
        >
        <v-col cols="10">
          <h1 class="visit-hot__title">
            {{ item.name }}
          </h1>
          <div class="visit-hot__detail d-flex justify-space-between">
            <span>{{ item.created_at }}</span>
            <span>{{
              $t('FORUM.TOTAL_VIEW').replace('%s', item.total_view)
            }}</span>
          </div>
        </v-col>
      </v-row>
    </section>
    <section class="latest-forum">
      <h1 class="latest-forum__title">
        <img class="pr-2" width="30" src="/images/forum/forum.png" />{{
          $t('FORUM.LATEST_FORUM')
        }}
      </h1>
      <div v-for="(item, index) in forum_list" :key="index" class="pt-2 mb-2"
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
      <div class="d-flex flex-column align-center mt-5 mb-5">
        <v-btn depressed color="primary" @click="openPage('/forum/list')">
          {{ $t('FORUM.ACTION_MORE') }}
        </v-btn>
      </div>
    </section>
 <!--    <v-dialog v-model="forum_detail_dialog" fullscreen hide-overlay>
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
    name: 'MForum',
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
        forum_list: [],
        forum_most_view_list: [],
        category_list: [],
        forum_detail_dialog: false,
        forum_form_dialog: false,
        dialog_forum_id: null,
      }
    },
    mounted() {
      this.getCategory()
      this.getMostViewForum()
      this.getForum()
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
          is_active: true,
        })
      },
      async getForum() {
        this.page = 1
        let res = await this.$store.dispatch('forum/pagination', {
          page: this.page,
          perPage: this.per_page,
          keyword: this.form.keyword,
          orderBy: 'created_at',
          isDesc: false,
        })
        this.forum_list = res.data.data.map((data) => {
          data.image_url = this.$getImageHtml(data.detail)
          return data
        })
        this.last_page = res.data.lastPage
        this.total = res.data.total
        this.page++
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
  .visit-hot {
    background-color: #f8f7f6;
    border-radius: 6px;
    margin-top: 1rem;
    padding: 16px;
    &__title {
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    &__detail {
      span {
        font-size: 12px;
        color: #8c8c8c;
      }
    }
  }
  .latest-forum {
    margin-top: 1rem;
    &__title {
      padding-top: 15px;
      font-size: 20px;
    }
    .submit {
      color: #001538 !important;
      border: 1px solid #001538 !important;
      background-color: transparent !important;
    }
  }
  .media-general-card {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
</style>
