<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click="openPage('/forum', { page: previous_page })">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="openPage('/forum', { page: previous_page })"
          >{{ $t('FORUM.FORUM_ALL') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="content" v-if="forum">
      <h1 class="content__title"></h1>
      <section class="content__author">
        <v-row>
          <v-col cols="1">
            <img class="mt-2" :src="`${image_url}${forum.user.image}`" />
          </v-col>
          <v-col cols="11">
            <span class="name">forum</span>
            <div class="content__subtitle d-flex ps-4">
              <span>{{ forum.created_at }}</span>
              <span>&nbsp;&nbsp;●&nbsp;&nbsp;</span>
              <span>{{
                $t('FORUM.TOTAL_VIEW').replace('%s', forum.total_view)
              }}</span>
            </div>
          </v-col>
        </v-row>
      </section>
      <v-row>
        <v-col cols="1"> </v-col>
        <v-col cols="11"> </v-col>
      </v-row>

      <div v-html="forum.detail" class="content__html"></div>

      <section class="content__action">
        <v-btn
          text
          :class="forum.active_like != 0 ? 'like-active' : ''"
          :disabled="!$store.state.user.user_id"
          @click="createLikeForum(forum.active_like)"
        >
          <i
            class="fas fa-heart"
            v-if="forum.active_like != 0"
            aria-hidden="true"
          ></i>
          <i class="far fa-heart" v-else aria-hidden="true"></i>
          <span class="ps-1">{{
            $t('FORUM.TOTAL_LIKE').replace('%s', forum.total_like)
          }}</span>
        </v-btn>
        <v-btn text>
          <i class="chatbubble-ellipses"></i>
          <span class="ps-1" v-if="forum_comment">{{
            $t('FORUM.TOTAL_COMMENT').replace('%s', forum_comment.length)
          }}</span>
        </v-btn>
      </section>
    </section>
    <section class="comment">
      <hr />
      <v-row v-for="item in forum_comment" :key="item.id">
        <v-col cols="1">
          <img :src="`${image_url}${item.user.image}`" />
        </v-col>
        <v-col cols="11">
          <p class="name">
            {{ item.user.fullname }} &nbsp;&nbsp;●&nbsp;&nbsp;{{
              item.created_at
            }}
          </p>
          <span></span>
          <p class="name" v-html="item.detail"></p>
          <v-btn
            :class="
              item.active_like != 0
                ? 'name pe-0 ps-0 like-active'
                : 'name pe-0 ps-0'
            "
            :disabled="!$store.state.user.user_id"
            text
            @click="createCommentLikeForum(item.active_like, item.id)"
            >{{ $t('FORUM.TOTAL_LIKE').replace('%s', item.total_like) }}</v-btn
          >
        </v-col>
      </v-row>
      <v-row v-if="$store.state.user.user_id">
        <v-col cols="1" v-if="user">
          <img :src="`${image_url}${user.image}`" />
        </v-col>
        <v-col cols="11" class="ps-6">
          <v-textarea
            single-line
            outlined
            hide-details
            name="input-7-4 "
            v-model="commemt"
          ></v-textarea>
          <v-btn large class="action-comment mt-3" @click="createCommentForum">
            {{ $t('FORUM.ACTION.COMMENT') }}
          </v-btn>
        </v-col>
      </v-row>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MForumDetail',
/*   props: ['id'], */
  watch: {
    id: {
      async handler(val, oldVal) {
        if (this.$store.state.user.user_id) {
          await this.getForum()
        }
        this.getForumComment()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      user: null,
      forum: null,
      commemt: '',
      forum_comment: null,
      id: this.$route.query.id,
      previous_page: this.$store.state.article.page,
    }
  },
  async mounted() {
    if (this.$store.state.user.user_id) {
      await this.getProfile()
    }
    await this.getForum()
    this.getForumComment()
    await this.updateTotalView()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    }, 
    async getProfile() {
      let res = await this.$store.dispatch('user/find')
      this.user = res.data
    },
    async getForum() {
      let res = await this.$store.dispatch('forum/find', this.id)
      this.forum = res.data
    },
    async createLikeForum(active_like) {
      if (active_like == 0) {
        await this.$store.dispatch('forum_like/create', { forum_id: this.id })
      } else {
        await this.$store.dispatch('forum_like/delete', this.id)
      }
      await this.getForum()
    },
    async createCommentLikeForum(active_like, forum_comment_id) {
      if (active_like == 0) {
        await this.$store.dispatch('forum_comment_like/create', {
          forum_comment_id,
        })
      } else {
        await this.$store.dispatch(
          'forum_comment_like/delete',
          forum_comment_id
        )
      }
      this.getForumComment()
    },
    async createCommentForum() {
      await this.$store.dispatch('forum_comment/create', {
        forum_id: this.id,
        detail: this.commemt,
      })
      this.commemt = ''
      this.getForumComment()
    },
    async getForumComment() {
      let res = await this.$store.dispatch(
        'forum_comment/get',
        `?forum_id=${this.id}`
      )
      this.forum_comment = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('forum/updateTotalView', this.id)
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  padding: 12px;
}
.header {
  &__topbar {
    color: #001538;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 6px;
      border-radius: 6px;
      background: #000;
      position: absolute;
      bottom: -11px;
      left: 0;
    }
    .link {
      color: #001538;
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #ccc;
    padding: 0;
  }
}
.date {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 1rem;
}

.content {
  margin-top: 1rem;
  &__title {
    font-size: 22px;
    color: #001538;
  }
  &__author {
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
    }

    .name {
      padding-left: 1rem;
      font-size: 12px;
    }
  }
  &__subtitle {
    font-size: 12px;
    color: #8c8c8c;
  }
  &__html {
    margin-top: 1rem;
    color: #001538;
  }
  &__action {
    i.fa,
    i.far,
    i.fas {
      font-size: 16px;
    }
  }
}

.recommend {
  margin-left: -12px;
  padding-left: 12px;
  width: 100vw;
  background: #f8f7f6;

  &__title {
    padding-top: 12px;
    font-size: 22px;
    color: #001538;
  }
}
.comment {
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
  }

  .name {
    padding-left: 1rem;
    font-size: 12px;
  }

  .row {
    margin-top: 1rem;
    font-size: 12px;
  }
  .action-comment {
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
.like-active {
  color: #f81e38 !important;
}
</style>

<style>
.content__html img {
  max-width: 100%;
}
</style>
