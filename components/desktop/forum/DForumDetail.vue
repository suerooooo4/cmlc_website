<template>
  <div>
    <DArticleBanner
      :title="$t('FORUM.TITLE')"
      :image="'/images/banner-forum.png'"
    />

    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title">
              <span>
                <i
                  class="fa fa-chevron-left"
                  @click="openPage('/forum/list', { page: previous_page })"
                ></i>
                {{ $t('FORUM.FORUM_ALL') }}
              </span>
            </h2>

            <v-row v-if="forum">
              <v-col>
                <div>
                  <h2 class="content-title">
                    {{ forum.name }}
                  </h2>

                  <div class="forum-total d-flex">
                    <div class="creator-info d-flex">
                      <img
                        v-if="forum.user.image"
                        :src="`${image_url}${forum.user.image}`"
                        alt="creator-image"
                        class="creator-image"
                      />

                      <img
                        v-else
                        src="/images/default_profile.png"
                        alt="creator-image"
                        class="creator-image"
                      />

                      <span class="creator-name">
                        {{ forum.user.fullname }}
                      </span>
                    </div>

                    <div class="created-date">
                      {{ forum.created_at }}
                    </div>

                    <div class="total-view">
                      {{
                        $t('FORUM.TOTAL_VIEW').replace('%s', forum.total_view)
                      }}
                    </div>
                  </div>

                  <div class="content-detail" v-html="forum.detail"></div>

                  <div class="forum-action">
                    <v-btn
                      @click="doLike(forum.active_like)"
                      class="btn-like"
                      text
                      :disabled="!$store.state.user.user_id"
                      :class="[forum.active_like ? 'active' : '']"
                    >
                      <i class="far fa-heart"></i>
                      {{
                        $t('FORUM.TOTAL_LIKE').replace('%s', forum.total_like)
                      }}
                    </v-btn>

                    <span class="btn-comment">
                      <i class="far fa-comment-dots"></i>
                      {{
                        $t('FORUM.TOTAL_COMMENT').replace(
                          '%s',
                          forum_comment.length
                        )
                      }}
                    </span>
                  </div>

                  <div class="comment-container">
                    <div
                      v-for="comment of forum_comment"
                      :key="comment.id"
                      class="comment-wrapper"
                    >
                      <div class="user-image">
                        <img
                          v-if="comment.user.image"
                          :src="`${image_url}${comment.user.image}`"
                          alt="user-image"
                        />
                        <img
                          v-else
                          src="/images/default_profile.png"
                          alt="user-image"
                        />
                      </div>

                      <div class="comment-info">
                        <p class="user-name">
                          {{ comment.user.fullname }}
                        </p>

                        <p class="comment">
                          {{ comment.detail }}
                        </p>

                        <div class="comment-action">
                          <v-btn
                            @click="
                              doCommentLike(comment.active_like, comment.id)
                            "
                            text
                            class="btn-comment-like"
                            :disabled="!$store.state.user.user_id"
                            :class="[comment.active_like ? 'active' : '']"
                          >
                            {{
                              $t('FORUM.TOTAL_LIKE').replace(
                                '%s',
                                comment.total_like
                              )
                            }}
                          </v-btn>

                          <span class="comment-date">
                            {{ comment.created_at }}
                          </span>
                        </div>
                      </div>
                    </div>

                    <v-form
                      ref="form"
                      v-model="form.valid"
                      v-if="$store.state.user.user_id"
                    >
                      <div class="comment-form">
                        <div
                          class="user-image"
                          v-if="$store.state.user.user_id"
                        >
                          <img
                            :src="`${image_url}${user.image}`"
                            alt="user-image"
                          />
                        </div>
                        <div class="user-image" v-else>
                          <img
                            src="/images/default_profile.png"
                            alt="user-image"
                          />
                        </div>

                        <div class="form-input">
                          <v-text-field
                            v-model="form.value.detail"
                            :rules="form.rules.detail"
                            id="input-comment"
                            type="text"
                            single-line
                            :label="$t('FORUM.INPUT.FORUM_COMMENT')"
                            outlined
                          ></v-text-field>
                        </div>
                      </div>

                      <div class="text-right">
                        <v-btn
                          large
                          depressed
                          color="primary"
                          @click="createCommentForum"
                        >
                          {{ $t('FORUM.INPUT.FORUM_COMMENT') }}
                        </v-btn>
                      </div>
                    </v-form>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
  import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

  export default {
    name: 'DForumDetail',
    components: {
      DArticleBanner,
    },
    data() {
      const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

      return {
        image_url: process.env.image_url,
        id: this.$route.query.id,
        previous_page: this.$store.state.media_training.page,
        user: null,
        forum: null,
        forum_comment: [],
        form: {
          valid: false,
          value: {
            forum_id: null,
            detail: null,
          },
          rules: {
            detail: [(v) => !!v || requiredMsg],
          },
        },
      }
    },
    async mounted() {
      if (this.$store.state.user.user_id) {
        await this.getProfile()
      }
      await this.getForum()
      await this.getForumComment()
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
        this.form.value.forum_id = res.data.id
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
      async createCommentForum() {
        const resValidate = this.$refs.form.validate()

        if (resValidate) {
          await this.$store.dispatch('forum_comment/create', this.form.value)
          this.$refs.form.reset()
          this.clearForm()
          await this.getForumComment()
        }
      },
      clearForm() {
        this.form.value = {
          forum_id: null,
          detail: null,
        }
      },
      async doLike(like) {
        if (!like) {
          await this.$store.dispatch('forum_like/create', { forum_id: this.id })
        } else {
          await this.$store.dispatch('forum_like/delete', this.id)
        }
        await this.getForum()
      },
      async doCommentLike(like, forum_comment_id) {
        if (!like) {
          await this.$store.dispatch('forum_comment_like/create', {
            forum_comment_id,
          })
        } else {
          await this.$store.dispatch(
            'forum_comment_like/delete',
            forum_comment_id
          )
        }

        await this.getForumComment()
      },
    },
  }
</script>

<style scoped lang="scss">
  .content-container {
    padding: 25px 0 150px;

    .content-date,
    .content-detail {
      margin-bottom: 5px;
    }

    .forum-total {
      margin-bottom: 25px;
      align-items: center;
      font-size: 14px;

      .creator-info {
        align-items: center;

        .creator-image {
          width: 36px;
          height: 36px;
          object-fit: cover;
          object-position: center;
          border-radius: 100%;
        }

        .creator-name {
          margin-left: 10px;
        }
      }

      .created-date,
      .total-view {
        margin-left: 30px;
        color: #b2b2b2;
      }
    }

    .content-title {
      font-size: 26px;
      margin-bottom: 15px;
    }

    .forum-action {
      margin-top: 30px;
      padding-bottom: 15px;
      font-size: 18px;
      border-bottom: 1px solid #e5e5e5;

      .btn-like {
        margin-right: 20px;
        cursor: pointer;

        i.far {
          font-size: 22px;
        }
      }

      .btn-like.active {
        color: #f81e38;
      }

      .btn-comment {
        i.far {
          font-size: 22px;
        }
      }
    }

    .comment-container {
      width: 100%;
      margin: 30px auto 0;

      .comment-wrapper {
        display: flex;
        margin: 15px 0;

        .user-image {
          padding: 0 15px;

          img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            object-position: center;
            border-radius: 100%;
          }
        }

        .comment-info {
          .user-name {
            margin-bottom: 5px;
          }

          .comment,
          .comment-action {
            font-size: 14px;

            .btn-comment-like.active {
              color: #f81e38;
            }

            .comment-date {
              margin-left: 15px;
              color: #8c8c8c;
            }
          }
        }
      }

      .comment-form {
        margin-top: 50px;
        display: flex;

        .user-image {
          padding: 10px 15px;

          img {
            width: 36px;
            height: 36px;
            object-fit: cover;
            object-position: center;
            border-radius: 100%;
          }
        }

        .form-input {
          width: 100%;
        }
      }
    }
  }
</style>

<style lang="scss">
  .content-detail {
    width: 100%;

    img {
      max-width: 100% !important;
    }
  }
</style>
