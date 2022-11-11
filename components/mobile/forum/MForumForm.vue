<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click.native="$emit('detail_dialog', false)">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="$emit('detail_dialog', false)"
          >{{ $t('FORUM.FORUM_ALL') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="content">
      <v-form ref="form" v-model="form.valid">
        <v-card class="pl-4 pr-4 pt-3" color="#F8F7F6">
          <div class="text-field">
            <label class="label">{{ $t('FORUM.INPUT.FORUM_CATEGORY') }} </label>
            <v-select
              :items="category_list"
              :item-text="$lang('name_th', 'name_en')"
              item-value="id"
              v-model="form.value.forum_category_id"
              :rules="form.rules.forum_category_id"
              label=""
              single-line
              outlined
            ></v-select>
          </div>

          <div class="text-field">
            <label class="label">{{ $t('FORUM.INPUT.FORUM_TITLE') }} </label>
            <v-text-field
              type="text"
              v-model="form.value.name"
              :rules="form.rules.name"
              label=""
              single-line
              outlined
            ></v-text-field>
          </div>
        </v-card>

        <v-card class="pl-4 pr-4 pt-3 pb-5 mt-4" color="#F8F7F6">
          <div class="text-field">
            <label class="label">{{ $t('FORUM.INPUT.FORUM_DETAIL') }}</label>
            <client-only placeholder="loading...">
              <ckeditor-nuxt
                v-model="form.value.detail"
                :rules="form.rules.detail"
                :config="editorConfig"
              />
            </client-only>
          </div>

          <div
            class="author d-flex justify-center align-center mt-3"
            v-if="user"
          >
            <span class="name">{{ $t('FORUM.FORUM_CREATOR') }} : </span>
            <img :src="`${image_url}${user.image}`" />
            <span class="name">{{ user.fullname }}</span>
          </div>
          <div class="action d-flex justify-center mt-3">
            <v-btn large @click="submit">
              {{ $t('FORUM.ACTION.SUBMIT') }}
            </v-btn>
          </div>
        </v-card>
      </v-form>
    </section>
  </main>
</template>

<script>
  import Swal from 'sweetalert2'
  export default {
    name: 'MForumForm',
    props: ['id'],
    components: {
      'ckeditor-nuxt': () => {
        if (process.client) {
          return import('@blowstack/ckeditor-nuxt')
        }
      },
    },
    watch: {
      id: {
        async handler(val, oldVal) {
          await this.getForum()
        },
        deep: true,
      },
    },
    data() {
      const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')
      return {
        editorConfig: {
          height: 500,
          toolbar: {
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              '|',
              'undo',
              'redo',
              '|',
              'uploadImage',
            ],
          },
          removePlugins: ['Title'],
          simpleUpload: {
            uploadUrl: `http://localhost:3333/api/v1/admin/ckeditor_image_upload`,
            headers: {
              // Authorization: 'optional_token',
            },
          },
        },
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
            detail: [(v) => !!v || requiredMsg],
          },
        },
        image_url: process.env.image_url,
        user: null,
        category_list: [],
        contentHolder: '',
        content: '<p>ทดสอบ</p>',
        items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      }
    },
    mounted() {
      if (this.id) {
        this.getForum()
      }
      this.getProfile()
      this.getCategory()
    },
    methods: {
      closeForm: function (event) {
        this.form.value = {
          forum_category_id: null,
          name: null,
          detail: '',
        }
        this.$emit('detail_dialog', false)
      },
      async getProfile() {
        let res = await this.$store.dispatch('user/find')
        this.user = res.data
      },
      async getForum() {
        let res = await this.$store.dispatch('forum/find', this.id)
        this.form.value = res.data
      },
      async getCategory() {
        let res = await this.$store.dispatch('forum_category/get')
        this.category_list = res.data
      },
      async submit() {
        const resValidate = this.$refs.form.validate()
        if (resValidate) {
          let res = ''
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
            this.closeForm()
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
    .author {
      font-size: 12px;
      img {
        width: 30px;
        height: 30px;
        margin-left: 0.5rem;
        border-radius: 50%;
        object-fit: cover;
      }

      .name {
        padding-left: 0.5rem;
      }
    }
    .action {
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
    &__subtitle {
      font-size: 12px;
      color: #8c8c8c;
    }
    &__html {
      color: #001538;
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
</style>
