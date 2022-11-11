<template>
  <div>
    <v-card>
      <v-card-text>
        <div class="d-flex flex-column">
          <div class="booking-list">
            <h1 class="booking-title text-center">
              {{ $t('BOOKING.STUDIO_BOOKING.LASTEST_TITLE') }}
            </h1>

            <div class="latest-container">
              <div v-if="booking_list.length">
                <div v-for="booking of booking_list" :key="booking.id">
                  <MBookingLatestCard :data="booking" />
                </div>
              </div>

              <div v-else>
                <p class="text-center no-result">
                  {{ $t('BOOKING.STUDIO_BOOKING.NO_RESULT') }}
                </p>
              </div>
            </div>
          </div>

          <div class="form">
            <h1 class="form__title text-center">
              {{ $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.TITLE') }}
            </h1>

            <v-form ref="form" v-model="form.valid">
              <div class="form__textField">
                <img
                  v-if="studio.image"
                  :src="`${image_url}${studio.image}`"
                  alt="booking-image"
                  class="booking-image"
                />
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{
                    $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.NAME')
                  }}
                  :</label
                >
                <v-text-field
                  :value="$lang(studio.name_th, studio.name_en)"
                  type="text"
                  single-line
                  outlined
                  disabled
                ></v-text-field>
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{
                    $t('BOOKING.ADVISOR_BOOKING.MODAL_BOOKING.DETAIL')
                  }}
                  :</label
                >
                <v-textarea
                  :value="$lang(studio.detail_th, studio.detail_en)"
                  type="text"
                  single-line
                  outlined
                  readonly
                  no-resize
                ></v-textarea>
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{
                    $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.BOOKING_DATE')
                  }}
                  :</label
                >

                <v-dialog
                  ref="booking_dialog"
                  :return-value.sync="form.value.booking_date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="form.value.booking_date"
                      append-icon="mdi-calendar"
                      disabled
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      required
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    v-model="form.value.booking_date"
                    scrollable
                    locale="th-TH"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="
                        $refs.booking_dialog.save(form.value.booking_date)
                      "
                    >
                      ตกลง
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{
                    $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.START_TIME')
                  }}
                  :</label
                >

                <div class="d-flex">
                  <v-dialog
                    ref="booking_start_time_dialog"
                    :return-value.sync="form.value.booking_start_time"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="form.value.booking_start_time"
                        :rules="form.rules.booking_start_time"
                        append-icon="mdi-clock"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        required
                      ></v-text-field>
                    </template>

                    <v-time-picker
                      ampm-in-title
                      format="24hr"
                      v-model="form.value.booking_start_time"
                      scrollable
                      locale="th-TH"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.booking_start_time_dialog.save(
                            form.value.booking_start_time
                          )
                        "
                      >
                        ตกลง
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>

                  <span class="time-label">
                    {{ $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.END_TIME') }}
                  </span>

                  <v-dialog
                    ref="booking_end_time_dialog"
                    :return-value.sync="form.value.booking_end_time"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="form.value.booking_end_time"
                        :rules="form.rules.booking_end_time"
                        append-icon="mdi-clock"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        required
                      ></v-text-field>
                    </template>

                    <v-time-picker
                      ampm-in-title
                      format="24hr"
                      v-model="form.value.booking_end_time"
                      scrollable
                      locale="th-TH"
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="
                          $refs.booking_end_time_dialog.save(
                            form.value.booking_end_time
                          )
                        "
                      >
                        ตกลง
                      </v-btn>
                    </v-time-picker>
                  </v-dialog>
                </div>
              </div>

              <div class="form__textField">
                <label class="label"
                  >{{
                    $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.PURPOSE')
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
                  {{ $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.SUBMIT') }}
                </v-btn>

                <v-btn
                  plain
                  large
                  class="form__cancel mt-3"
                  width="120"
                  @click="closeDialog(false)"
                >
                  {{ $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.CANCEL') }}
                </v-btn>
              </div>
            </v-form>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import MBookingLatestCard from '~/components/mobile/booking/MBookingLatestCard.vue'

export default {
  name: 'MBookingStudioForm',
  components: {
    MBookingLatestCard,
  },
  props: ['id', 'date_selected'],
  data() {
    const requiredMsg = this.$t('SHARED.FORM_VALIDATION.REQUIRED')

    return {
      image_url: process.env.image_url,
      booking_list: [],
      studio: {
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
          studio_id: null,
          booking_date: null,
          booking_start_time: null,
          booking_end_time: null,
          using_purpose: null,
        },
        rules: {
          booking_start_time: [(v) => !!v || requiredMsg],
          booking_end_time: [(v) => !!v || requiredMsg],
          using_purpose: [(v) => !!v || requiredMsg],
        },
      },
    }
  },
  async mounted() {
    await this.getBooking()
    await this.getData()
  },
  methods: {
    closeDialog(value) {
      this.$refs.form.reset()
      this.$emit('studio_booking_dialog', value)
    },
    async submit() {
      const resValidate = this.$refs.form.validate()

      if (resValidate) {
        let res = await this.$store.dispatch(
          'studio_booking/create',
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
    async getData() {
      let res = await this.$store.dispatch('studio/find', this.id)
      this.studio = res.data
      this.studio.detail_th = this.$stripHtml(res.data.detail_th)
      this.studio.detail_en = this.$stripHtml(res.data.detail_en)
      this.form.value.studio_id = res.data.id
      this.form.value.booking_date = this.date_selected
    },
    async getBooking() {
      let res = await this.$store.dispatch('studio_booking/get', {
        studio_id: this.id,
        booking_date: this.date_selected,
      })
      this.booking_list = res.data.map((data) => {
        data.booking_status_name = this.getItemStatus(data.booking_status)

        return data
      })
    },
    getItemStatus(id) {
      let result

      switch (id) {
        case 0:
          result = this.$t('SHARED.BOOKING.STUDIO_STATUS.WAITING')
          break
        case 1:
          result = this.$t('SHARED.BOOKING.STUDIO_STATUS.AVAILABLE')
          break
        case 2:
          result = this.$t('SHARED.BOOKING.STUDIO_STATUS.BOOKED')
          break
      }

      return result
    },
    clearForm() {
      this.form.value = {
        studio_id: null,
        booking_date: null,
        booking_start_time: null,
        booking_end_time: null,
        using_purpose: null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  padding: 16px 30px;

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

  .time-label {
    padding: 15px;
  }

  &__submit {
    background-color: #001538 !important;
  }
}

.booking-list {
  width: 100%;
  padding: 16px 30px;
  overflow-y: scroll;
  background: #001538;

  .booking-title {
    margin: 15px 0 40px;
    text-align: center;
    color: #fff;
  }

  .no-result {
    color: #fff;
  }
}

.v-card__text {
  padding: 0;
}
</style>
