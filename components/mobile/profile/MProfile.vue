<template>
  <div>
    <h1 class="header text-center">{{ $t('PROFILE.TITLE') }}</h1>

    <div class="tab">
      <div class="tab__action">
        <button
          :class="
            tap == 'profile'
              ? 'tab__action_profile active'
              : 'tab__action_profile'
          "
          @click="tap = 'profile'"
        >
          {{ $t('PROFILE.TAB.PROFILE.ACTION') }}
        </button>
        <button
          :class="
            tap == 'booking'
              ? 'tab__action_booking active'
              : 'tab__action_booking'
          "
          @click="tap = 'booking'"
        >
          {{ $t('PROFILE.TAB.BOOKING.ACTION') }}
        </button>
      </div>
      <div class="tab__content" v-if="tap == 'profile'">
        <h1 class="tab__content_title">
          {{ $t('PROFILE.TAB.PROFILE.TITLE') }}
        </h1>
        <hr />
        <div class="tab__content_form">
          <div
            class="tab__content_formUploadImage d-flex flex-column align-center"
          >
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

              <a
                @click="$refs.form_image.$refs.input.click()"
                class="upload-label"
              >
                {{ $t('PROFILE.TAB.PROFILE.CHANGE_IMAGE') }}
              </a>
            </div>
          </div>

          <v-form ref="form" v-model="form.valid">
            <div class="tab__content_formField mt-2">
              <label class="label"
                >{{ $t('PROFILE.TAB.PROFILE.INPUT.FULLNAME') }} :</label
              >
              <v-text-field
                v-model="form.value.fullname"
                :rules="form.rules.fullname"
                type="text"
                single-line
                outlined
                hide-details
                class="form-control"
              ></v-text-field>
            </div>

            <div class="tab__content_formField mt-2">
              <label class="label"
                >{{ $t('PROFILE.TAB.PROFILE.INPUT.ID_CARD') }} :</label
              >
              <v-text-field
                v-model="form.value.id_card"
                type="text"
                single-line
                outlined
                hide-details
                class="form-control"
              ></v-text-field>
            </div>

            <div class="tab__content_formField mt-2">
              <label class="label"
                >{{ $t('PROFILE.TAB.PROFILE.INPUT.PHONE_NUMBER') }} :</label
              >
              <v-text-field
                v-model="form.value.phone_number"
                type="text"
                single-line
                outlined
                hide-details
                class="form-control"
              ></v-text-field>
            </div>

            <div class="tab__content_formField mt-2">
              <label class="label"
                >{{ $t('PROFILE.TAB.PROFILE.INPUT.ADDRESS') }} :</label
              >
              <v-textarea
                v-model="form.value.address"
                type="text"
                single-line
                outlined
                hide-details
                class="form-control"
              ></v-textarea>
            </div>

            <div class="tab__content_formField mt-2">
              <label class="label"
                >{{ $t('PROFILE.TAB.PROFILE.INPUT.EMAIL') }} :</label
              >
              <v-text-field
                v-model="form.value.email"
                type="email"
                single-line
                outlined
                hide-details
                readonly
                class="form-control"
              ></v-text-field>
            </div>

            <div class="tab__content_formField mt-2">
              <label class="label"
                >{{ $t('PROFILE.TAB.PROFILE.INPUT.PASSWORD') }} :</label
              >
              <a class="change_password" @click="change_password_dialog = true">
                {{ $t('PROFILE.TAB.PROFILE.INPUT.CHANGE_PASSWORD') }}
              </a>
              <v-dialog
                v-model="change_password_dialog"
                persistent
                max-width="305"
              >
                <MChangePassword
                  @change_password_dialog="closeChangePasswordModal"
                />
              </v-dialog>
              <v-text-field type="password" readonly single-line outlined>
              </v-text-field>
            </div>

            <div class="d-flex justify-center">
              <label class="label">&nbsp;</label>
              <v-checkbox
                v-model="form.value.is_subscribed"
                :label="$t('PROFILE.TAB.PROFILE.INPUT.IS_SUBSCRIBED')"
              ></v-checkbox>
            </div>

            <div class="d-flex justify-center">
              <v-btn
                depressed
                class="tab__content_submit"
                @click="submit()"
                color="primary"
              >
                {{ $t('PROFILE.TAB.PROFILE.INPUT.SUBMIT') }}
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
      <div class="tab__content" v-if="tap == 'booking'">
        <h1 class="tab__content_title">
          {{ $t('PROFILE.TAB.BOOKING.ACTION') }}
        </h1>
        <hr />
        <div style="margin-left: -20px; margin-right: -20px">
          <MBookingHistory />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import MBookingHistory from '~/components/mobile/profile/MBookingHistory.vue'
import MChangePassword from '~/components/mobile/shared/MChangePassword.vue'
export default {
  name: 'MProfile',
  components: {
    MBookingHistory,
    MChangePassword,
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
          image: null,
        },
        rules: {
          fullname: [(v) => !!v || requiredMsg],
        },
      },
      form_image: null,
      change_password_dialog: false,
      tap: 'profile',
    }
  },
  async mounted() {
    if (!this.$store.state.user.user_id) {
      this.$router.push({ path: '/' })
    } else {
      await this.getProfile()
    }
  },
  methods: {
    closeChangePasswordModal(data) {
      this.change_password_dialog = data
    },
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

<style scoped lang="scss">
.header {
  color: #001538;
}

.tab {
  margin-top: 15px;
  &__action {
    font-size: 12px;
    color: #fff;
    &_profile {
      padding: 4px 18px;
      background-color: #001538;
      border-radius: 6px 6px 0px 0px;
    }
    &_booking {
      margin-left: -5px;
      padding: 4px 13px;
      background-color: #001538;
      border-radius: 6px 6px 0px 0px;
    }
    .active {
      background-color: #c5934b;
    }
  }
  &__content {
    background: #f8f7f6;
    border-radius: 0px 6px 6px 6px;
    width: 100%;
    padding: 20px;

    &_title {
      font-weight: 500;
      color: #001538;
      font-size: 18px;
      margin-bottom: 10px;
    }

    &_formUploadImage {
      margin: 18px;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
      }
      .v-btn--icon {
        color: #001538 !important;
        text-decoration: underline;
      }
    }

    &_formField {
      position: relative;
      .change_password {
        background: #fff;
        text-decoration: underline;
        position: absolute;
        right: 10px;
        top: 35%;
        z-index: 100;
        color: #001538;
      }
    }
    &_submit {
      background-color: #001538 !important;
    }
  }
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #001538;
  padding: 0;
}
</style>

<style>
.tab
  > .tab__content
  > .tab__content_form
  .tab__content_formField
  .v-input__slot,
.tab
  > .tab__content
  > .tab__content_form
  .tab__content_formField.v-text-field__slot {
  box-shadow: unset !important;
  background: #fff;
}
</style>
