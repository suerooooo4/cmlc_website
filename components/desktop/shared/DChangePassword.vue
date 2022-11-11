<template>
  <div>
    <v-card class="modal">
      <v-card-text>
        <h1 class="modal__title text-center">
          {{ $t('SHARED.CHANGE_PASSWORD.NAME') }}
        </h1>

        <h5 class="modal__subtitle text-center">
          {{ $t('SHARED.CHANGE_PASSWORD.SUBNAME') }}
        </h5>

        <v-form ref="form" v-model="form.valid">
          <div class="modal__textField">
            <label class="label"
              >{{ $t('SHARED.CHANGE_PASSWORD.INPUT.OLD_PASSWORD') }} :</label
            >
            <v-text-field
              type="password"
              v-model="form.value.current_password"
              :rules="form.rules.current_password"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="modal__textField">
            <label class="label"
              >{{ $t('SHARED.CHANGE_PASSWORD.INPUT.NEW_PASSWORD') }} :</label
            >
            <v-text-field
              type="password"
              v-model="form.value.new_password"
              :rules="form.rules.new_password"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="modal__textField">
            <label class="label"
              >{{
                $t('SHARED.CHANGE_PASSWORD.INPUT.CONFIRM_PASSWORD')
              }}
              :</label
            >
            <v-text-field
              type="password"
              v-model="form.value.confirm_password"
              :rules="form.rules.confirm_password"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="d-flex flex-column align-center mt-3">
            <v-btn
              depressed
              large
              class="modal__submit"
              color="primary"
              @click="submit()"
            >
              {{ $t('SHARED.CHANGE_PASSWORD.INPUT.SUBMIT') }}
            </v-btn>

            <v-btn
              plain
              large
              class="modal__cancel mt-3"
              @click="closeDialog()"
            >
              {{ $t('SHARED.CHANGE_PASSWORD.INPUT.CANCEL') }}
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'DChangePassword',
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')
    const passwordNotMatch = this.$t(
      'SHARED.FORM_VALIDATION.PASSWORD_NOT_MATCH'
    )

    return {
      form: {
        valid: false,
        value: {
          current_password: null,
          new_password: null,
          confirm_password: null,
        },
        rules: {
          current_password: [(v) => !!v || requiredMsg],
          new_password: [(v) => !!v || requiredMsg],
          confirm_password: [
            (v) => {
              if (!!v) {
                if (this.form.value.new_password != v) {
                  return passwordNotMatch
                } else {
                  return true
                }
              } else {
                return requiredMsg
              }
            },
          ],
        },
      },
    }
  },
  methods: {
    closeDialog() {
      this.$refs.form.reset()
      this.$emit('change_password_dialog', false)
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch(
          'user/changePassword',
          this.form.value
        )

        if (res.status == 'success') {
          Swal.fire({
            title: this.$t('SHARED.DIALOG.SUCCESS'),
            text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
          })
          this.clearForm()
          this.closeDialog()
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
        current_password: null,
        new_password: null,
        confirm_password: null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.modal {
  padding: 15px 30px;

  &__title {
    color: #001538;
    margin-top: 30px;
  }

  &__subtitle {
    margin-top: 5px;
    margin-bottom: 15px;
  }

  &__register > a {
    font-size: 12px;
    color: #001538;
    text-decoration: underline;
  }

  &__textField {
    .label {
      font-size: 16px;
      line-height: 17px;
      color: #001538;
    }
  }

  &__submit {
    background-color: #001538 !important;
  }
}
</style>
