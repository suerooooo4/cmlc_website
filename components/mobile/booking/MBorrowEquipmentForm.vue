<template>
  <div>
    <v-card class="form">
      <v-card-text>
        <h1 class="form__title text-center">
          {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.TITLE') }}
        </h1>

        <v-form ref="form" v-model="form.valid">
          <div class="form__textField">
            <img
              v-if="equipment.image"
              :src="`${image_url}${equipment.image}`"
              alt="booking-image"
              class="booking-image"
            />
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.NAME')
              }}
              :</label
            >
            <v-text-field
              :value="$lang(equipment.name_th, equipment.name_en)"
              type="text"
              single-line
              outlined
              disabled
            ></v-text-field>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.CODE')
              }}
              :</label
            >
            <v-text-field
              :value="equipment.code"
              type="text"
              single-line
              outlined
              disabled
            ></v-text-field>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{ $t('BOOKING.ADVISOR_BOOKING.MODAL_BOOKING.DETAIL') }} :</label
            >
            <v-textarea
              :value="$lang(equipment.detail_th, equipment.detail_en)"
              type="text"
              single-line
              outlined
              disabled
              auto-grow
              no-resize
            ></v-textarea>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.BOOKING_DATE')
              }}
              :</label
            >
            <v-dialog
              ref="booking_dialog"
              :return-value.sync="form.value.borrow_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="form.value.borrow_date"
                  :rules="form.rules.borrow_date"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  required
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="form.value.borrow_date"
                scrollable
                locale="th-TH"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.booking_dialog.save(form.value.borrow_date)"
                >
                  ตกลง
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.RETURN_DATE')
              }}
              :</label
            >
            <v-dialog
              ref="return_dialog"
              :return-value.sync="form.value.return_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="form.value.return_date"
                  :rules="form.rules.return_date"
                  append-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  required
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="form.value.return_date"
                scrollable
                locale="th-TH"
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.return_dialog.save(form.value.return_date)"
                >
                  ตกลง
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>

          <div class="form__textField">
            <label class="label"
              >{{
                $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.PURPOSE')
              }}
              :</label
            >
            <v-textarea
              v-model="form.value.using_purpose"
              :rules="form.rules.using_purpose"
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
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.SUBMIT') }}
            </v-btn>

            <v-btn
              plain
              large
              class="form__cancel mt-3"
              width="120"
              @click="closeDialog(false)"
            >
              {{ $t('BOOKING.EQUIPMENT_BORROWING.MODAL_BORROWING.CANCEL') }}
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
  name: 'MBorrowEquipmentForm',
  props: ['id'],
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      image_url: process.env.image_url,
      equipment: {
        image: null,
        name_th: null,
        name_en: null,
        code: null,
        detail_th: null,
        detail_en: null,
      },
      form: {
        valid: false,
        value: {
          equipment_id: null,
          borrow_date: null,
          return_date: null,
          using_purpose: null,
        },
        rules: {
          borrow_date: [(v) => !!v || requiredMsg],
          return_date: [(v) => !!v || requiredMsg],
          using_purpose: [(v) => !!v || requiredMsg],
        },
      },
    }
  },
  watch: {
    id: {
      async handler() {
        await this.getData()
      },
      deep: true,
    },
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    closeDialog(value) {
      this.$refs.form.reset()
      this.$emit('equipment_booking_dialog', value)
    },
    async getData() {
      let res = await this.$store.dispatch('equipment/find', this.id)
      this.equipment = res.data
      this.equipment.detail_th = this.$stripHtml(res.data.detail_th)
      this.equipment.detail_en = this.$stripHtml(res.data.detail_en)
      this.form.value.equipment_id = res.data.id
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch(
          'equipment_borrowing/create',
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
          this.closeDialog(true)
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
        equipment_id: null,
        borrow_date: null,
        return_date: null,
        using_purpose: null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.form {
  .booking-image {
    width: 100%;
    max-height: 350px;
    object-fit: cover;
    object-position: center;
    margin-bottom: 25px;
  }

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
