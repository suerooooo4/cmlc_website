<template>
  <div class="forum-form">
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
                <i class="fa fa-chevron-left" @click="openPage('/forum')"></i>
                {{ $t('FORUM.FORUM_ALL') }}
              </span>
            </h2>

            <div>
              <v-row>
                <v-col>
                  <h2 class="form-title">
                    {{ $t('FORUM.FORUM_CREATE') }}
                  </h2>
                </v-col>
              </v-row>

              <v-form ref="form" v-model="form.valid">
                <v-card class="form-group" color="#F8F7F6">
                  <v-row>
                    <v-col cols="12">
                      <label class="label" for="input-category">
                        {{ $t('FORUM.INPUT.FORUM_CATEGORY') }}
                      </label>

                      <v-select
                        v-model="form.value.forum_category_id"
                        :rules="form.rules.forum_category_id"
                        :items="category_list"
                        :item-text="$lang('name_th', 'name_en')"
                        item-value="id"
                        outlined
                        class="form-input"
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12">
                      <label class="label" for="input-topic">
                        {{ $t('FORUM.INPUT.FORUM_TITLE') }}
                      </label>

                      <v-text-field
                        v-model="form.value.name"
                        :rules="form.rules.name"
                        id="input-topic"
                        type="text"
                        single-line
                        outlined
                        class="form-input"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>

                <v-card class="form-group mt-5" color="#F8F7F6">
                  <v-row>
                    <v-col cols="12">
                      <label class="label" for="input-topic">
                        {{ $t('FORUM.INPUT.FORUM_DETAIL') }}
                      </label>

                      <client-only placeholder="loading...">
                        <ckeditor-nuxt
                          v-model="form.value.detail"
                          :config="editorConfig"
                        />
                      </client-only>

                      <div
                        v-if="form.detail_required"
                        class="ckeditor-required"
                      >
                        <div
                          class="v-messages theme--light error--text"
                          role="alert"
                        >
                          <div class="v-messages__wrapper">
                            <div class="v-messages__message">
                              {{ form.error_required }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="text-right">
                      <v-btn @click="submit" large depressed color="primary">
                        {{ $t('FORUM.ACTION.SUBMIT') }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-form>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'

export default {
  name: 'DForumForm',
  components: {
    DArticleBanner,
    'ckeditor-nuxt': () => {
      if (process.client) {
        return import('@blowstack/ckeditor-nuxt')
      }
    },
  },
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      category_list: [],
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'undo',
            'redo',
            '|',
            'uploadImage',
          ],
        },
        removePlugins: ['Title'],
        simpleUpload: {
          uploadUrl: process.env.ckeditor_upload_url,
          headers: {
            // Authorization: 'optional_token',
          },
        },
      },
      image_url: process.env.image_url,
      id: this.$route.query.id,
      form: {
        valid: false,
        value: {
          forum_category_id: null,
          name: null,
          detail: '',
        },
        rules: {
          forum_category_id: [(v) => !!v || requiredMsg],
          name: [(v) => !!v || requiredMsg],
          detail: [(v) => !!v.trim() || requiredMsg],
        },
        error_required: requiredMsg,
        detail_required: false,
      },
      user: null,
      category_list: [],
    }
  },
  async mounted() {
    this.$auth()
    await this.getProfile()
    await this.getCategory()

    if (this.id) {
      await this.getForum()
    }
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getProfile() {
      let res = await this.$store.dispatch('user/find')
      this.user = res.data
    },
    async getCategory() {
      let res = await this.$store.dispatch('forum_category/get')
      this.category_list = res.data
    },
    async getForum() {
      let res = await this.$store.dispatch('forum/find', this.id)
      this.form.value = res.data
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (!this.form.value.detail.trim()) {
        this.$nextTick(() => {
          this.form.detail_required = true
        })
      } else {
        this.form.detail_required = false
      }

      if (resValidate && !this.form.detail_required) {
        let res

        if (this.id) {
          res = await this.$store.dispatch(
            'forum/update',
            this.form.value,
            this.id
          )
        } else {
          res = await this.$store.dispatch('forum/create', this.form.value)
        }

        if (res.status == 'success') {
          Swal.fire({
            title: this.$t('SHARED.DIALOG.SUCCESS'),
            text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
          })
          this.clearForm()
          this.openPage('/forum/detail', { id: res.data.id })
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
    },
    clearForm() {
      this.form.value = {
        forum_category_id: null,
        name: null,
        detail: '',
      }
      this.$refs.form.reset()
      this.form.detail_required = false
    },
  },
}
</script>

<style scoped lang="scss">
.content-container {
  padding: 25px 0 150px;

  .form-title {
    margin: 30px 0;
    text-align: center;
    font-size: 28px;
  }

  .form-group {
    padding: 35px;
    margin: auto;

    .label {
      font-size: 18px;
    }
  }

  .ckeditor-required {
    margin: 12px;
  }
}
</style>

<style lang="scss">
.ck-editor__editable {
  min-height: 250px;
}
.form-group .v-input__slot {
  background: #ffffff !important;
}
</style>
