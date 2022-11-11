<template>
  <div class="profile-container">
    <v-row>
      <v-col cols="3">
        <img
          v-if="form.value.image"
          :src="`${image_url}${form.value.image}`"
          alt="profile-image"
          class="profile-image"
        />

        <img
          v-else
          src="/images/default_profile.png"
          alt="profile-image"
          class="profile-image"
        />

        <div class="upload-image">
          <v-file-input
            v-model="form_image"
            @change="changeImage"
            accept="image/*"
            ref="form_image"
            style="display: none"
          ></v-file-input>

          <a @click="$refs.form_image.$refs.input.click()" class="upload-label">
            {{ $t('PROFILE.TAB.PROFILE.CHANGE_IMAGE') }}
          </a>
        </div>
      </v-col>

      <v-col cols="9">
        <h2 class="profile-title">
          {{ $t('PROFILE.TAB.PROFILE.TITLE') }}
        </h2>

        <div class="form-container">
          <v-form ref="form" v-model="form.valid">
            <v-row class="form-group">
              <v-col cols="3" class="form-label">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.FULLNAME') }} :
              </v-col>

              <v-col cols="9">
                <v-text-field
                  v-model="form.value.fullname"
                  :rules="form.rules.fullname"
                  type="text"
                  single-line
                  outlined
                  hide-details
                  class="form-control"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col cols="3" class="form-label">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.ID_CARD') }} :
              </v-col>

              <v-col cols="9">
                <v-text-field
                  v-model="form.value.id_card"
                  type="text"
                  single-line
                  outlined
                  hide-details
                  class="form-control"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col cols="3" class="form-label">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.PHONE_NUMBER') }} :
              </v-col>

              <v-col cols="9">
                <v-text-field
                  v-model="form.value.phone_number"
                  type="text"
                  single-line
                  outlined
                  hide-details
                  class="form-control"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col cols="3" class="form-label">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.ADDRESS') }} :
              </v-col>

              <v-col cols="9">
                <v-textarea
                  v-model="form.value.address"
                  type="text"
                  single-line
                  outlined
                  hide-details
                  class="form-control"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col cols="3" class="form-label">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.EMAIL') }} :
              </v-col>

              <v-col cols="9">
                <v-text-field
                  v-model="form.value.email"
                  type="email"
                  single-line
                  outlined
                  hide-details
                  readonly
                  class="form-control"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col cols="3" class="form-label">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.PASSWORD') }} :
              </v-col>

              <v-col cols="9">
                <v-text-field
                  type="password"
                  single-line
                  outlined
                  readonly
                  hide-details
                  class="form-control"
                ></v-text-field>

                <a
                  class="change-password"
                  @click="change_password_dialog = true"
                >
                  {{ $t('PROFILE.TAB.PROFILE.INPUT.CHANGE_PASSWORD') }}
                </a>
              </v-col>
            </v-row>

            <v-row class="form-group">
              <v-col cols="3">&nbsp;</v-col>
              <v-col cols="9">
                <v-checkbox
                  v-model="form.value.is_subscribed"
                  :label="$t('PROFILE.TAB.PROFILE.INPUT.IS_SUBSCRIBED')"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-center mt-5 pt-5">
        <v-btn
          @click="submit()"
          class="btn-submit"
          color="primary"
          large
          depressed
          width="150"
        >
          {{ $t('PROFILE.TAB.PROFILE.INPUT.SUBMIT') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="change_password_dialog" persistent max-width="500">
      <DChangePassword @change_password_dialog="closeChangePasswordModal" />
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import DChangePassword from '~/components/desktop/shared/DChangePassword.vue'

export default {
  name: 'DProfileForm',
  components: {
    DChangePassword,
  },
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      image_url: process.env.image_url,
      form: {
        valid: false,
        value: {
          id: null,
          fullname: null,
          email: null,
          id_card: null,
          address: null,
          phone_number: null,
          is_subscribed: false,
          image: null,
        },
        rules: {
          fullname: [(v) => !!v || requiredMsg],
        },
      },
      form_image: null,
      change_password_dialog: false,
    }
  },
  async mounted() {
    await this.getProfile()
  },
  methods: {
    async getProfile() {
      let res = await this.$store.dispatch('user/find')
      this.form.value = res.data
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch('user/update', this.form.value)

        if (res.status == 'success') {
          Swal.fire({
            title: this.$t('SHARED.DIALOG.SUCCESS'),
            text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
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
    },
    async changeImage() {
      let formData = new FormData()
      formData.append('image', this.form_image)

      let res = await this.$store.dispatch('user/updateImage', formData)

      if (res.status == 'success') {
        await this.getProfile()
        Swal.fire({
          title: this.$t('SHARED.DIALOG.SUCCESS'),
          text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
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
    },
    closeChangePasswordModal(value) {
      this.change_password_dialog = value
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-container {
  text-align: center;

  .profile-image {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center;
    border-radius: 100%;
  }

  .upload-image {
    margin-top: 15px;
    text-align: center;

    .upload-label {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  .profile-title {
    padding-bottom: 15px;
    border-bottom: 2px solid #001538;
  }

  .form-container {
    margin-top: 30px;

    .form-group {
      position: relative;

      .form-label {
        padding-top: 25px;
      }

      .change-password {
        background: #fff;
        text-decoration: underline;
        position: absolute;
        right: 25px;
        top: 35%;
        z-index: 100;
        color: #001538;
      }
    }
  }
}
</style>

<style>
.form-control {
  background: #fff !important;
}
</style>
