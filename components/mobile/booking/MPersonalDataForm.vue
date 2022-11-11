<template>
  <div>
    <v-card class="form">
      <v-card-text>
        <h1 class="form__title text-center">
          {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_PERSONAL.TITLE') }}
        </h1>

        <v-form ref="form" v-model="form.valid">
          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_PERSONAL.ID_CARD')
              }}
              :</label
            >
            <v-text-field
              type="text"
              v-model="form.value.id_card"
              :rules="form.rules.id_card"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_PERSONAL.PHONE_NUMBER')
              }}
              :</label
            >
            <v-text-field
              type="number"
              v-model="form.value.phone_number"
              :rules="form.rules.phone_number"
              single-line
              outlined
            ></v-text-field>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_PERSONAL.ADDRESS')
              }}
              :</label
            >
            <v-textarea
              v-model="form.value.address"
              :rules="form.rules.address"
              single-line
              outlined
            ></v-textarea>
          </div>

          <div class="d-flex flex-column align-center mt-3">
            <v-btn
              depressed
              large
              class="form__submit"
              color="primary"
              width="120"
              @click="submit()"
            >
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_PERSONAL.SUBMIT') }}
            </v-btn>

            <v-btn
              plain
              large
              class="form__cancel mt-3"
              width="120"
              @click="closeDialog(false)"
            >
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_PERSONAL.CANCEL') }}
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
  name: 'MPersonalDataForm',
  props: ['data'],
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      form: {
        valid: false,
        value: {
          id_card: '',
          address: '',
          phone_number: '',
        },
        rules: {
          id_card: [(v) => !!v || requiredMsg],
          address: [(v) => !!v || requiredMsg],
          phone_number: [(v) => !!v || requiredMsg],
        },
      },
    }
  },
  watch: {
    data: {
      handler() {
        this.setData()
      },
      deep: true,
    },
  },
  mounted() {
    this.setData()
  },
  methods: {
    closeDialog(value) {
      this.$emit('user_info_dialog', value)
    },
    setData() {
      this.form.value = this.data
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch('user/update', this.form.value)

        if (res.status == 'success') {
          this.closeDialog(true)
        } else {
          this.closeDialog(false)
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
.form {
  &__title {
    margin: 15px 0 40px;
    text-align: center;
    color: #001538;
    line-height: 30px;
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
