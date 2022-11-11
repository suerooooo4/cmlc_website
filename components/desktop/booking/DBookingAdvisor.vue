<template>
  <div>
    <div class="booking">
      <v-row>
        <v-col cols="8">
          <div class="form-advisor">
            <v-select
              v-model="advisor_id_selected"
              @change="selectAdvisor"
              :items="advisor_list"
              item-text="name"
              item-value="id"
              :label="$t('BOOKING.ADVISOR_BOOKING.ADVISOR')"
              solo
            ></v-select>
          </div>

          <div class="calendar-container">
            <DBookingCalendar
              v-if="render_calendar"
              :data="calendar_booking"
              @select_date="selectDate"
            />
          </div>
        </v-col>

        <v-col cols="4">
          <div class="form-booking">
            <v-btn
              :disabled="
                !advisor_id_selected ||
                !$store.state.user.user_id ||
                !date_selected
              "
              @click="booking()"
              large
              depressed
              color="primary"
              class="btn-booking"
            >
              {{ $t('BOOKING.ADVISOR_BOOKING.BTN_BOOKING') }}
            </v-btn>
          </div>

          <h2 class="latest-booking-title">
            {{ $t('BOOKING.ADVISOR_BOOKING.LASTEST_TITLE') }}
          </h2>

          <div class="lastest-container">
            <div v-if="booking_list.length">
              <div v-for="booking of booking_list" :key="booking.id">
                <DBookingLatestCard :data="booking" />
              </div>
            </div>

            <div v-else>
              <p class="text-center">
                {{ $t('BOOKING.ADVISOR_BOOKING.NO_RESULT') }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="user_info_dialog" persistent max-width="600">
      <DPersonalDataForm
        @user_info_dialog="closeUserInfoModal"
        :data="user_data"
      />
    </v-dialog>

    <v-dialog
      v-if="render_form"
      v-model="advisor_booking_dialog"
      persistent
      max-width="980"
    >
      <DBookingAdvisorForm
        @advisor_booking_dialog="closeAdvisorBookingModal"
        :id="advisor_id_selected"
        :date_selected="date_selected"
      />
    </v-dialog>
  </div>
</template>

<script>
import DPersonalDataForm from '~/components/desktop/booking/DPersonalDataForm.vue'
import DBookingAdvisorForm from '~/components/desktop/booking/DBookingAdvisorForm.vue'
import DBookingCalendar from '~/components/desktop/booking/DBookingCalendar.vue'
import DBookingLatestCard from '~/components/desktop/booking/DBookingLatestCard.vue'

export default {
  name: 'DBookingAdvisor',
  components: {
    DPersonalDataForm,
    DBookingAdvisorForm,
    DBookingCalendar,
    DBookingLatestCard,
  },
  data() {
    return {
      advisor_list: ['advisor 1', 'advisor 2'],
      booking_list: [],
      calendar_booking: [],
      user_info_dialog: false,
      advisor_booking_dialog: false,
      user_data: null,
      advisor_id_selected: null,
      render_calendar: true,
      render_form: true,
      date_selected: null,
    }
  },
  async mounted() {
    await this.getAdvisor()
  },
  methods: {
    async getAdvisor() {
      let res = await this.$store.dispatch('advisor/get')

      this.advisor_list = res.data.map((data) => {
        data.name = this.$lang(data.name_th, data.name_en)
        return data
      })
    },
    async selectAdvisor() {
      this.clearDataSelected()
      await this.getCalendarBooking()
    },
    clearDataSelected() {
      this.date_selected = null
      this.calendar_booking = []
      this.booking_list = []
    },
    async getCalendarBooking() {
      let res = await this.$store.dispatch('advisor_booking/total', {
        advisor_id: this.advisor_id_selected,
      })

      for (const booking of res.data) {
        this.calendar_booking[booking.booking_date] = booking.total
      }

      this.render_calendar = false
      this.$nextTick().then(() => {
        this.render_calendar = true
      })
    },
    async selectDate($event) {
      if (this.advisor_id_selected) {
        this.date_selected = $event.date
        await this.getBooking()
      }
    },
    async getBooking() {
      let res = await this.$store.dispatch('advisor_booking/get', {
        advisor_id: this.advisor_id_selected,
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
          result = this.$t('SHARED.BOOKING.ADVISOR_STATUS.WAITING')
          break
        case 1:
          result = this.$t('SHARED.BOOKING.ADVISOR_STATUS.AVAILABLE')
          break
        case 2:
          result = this.$t('SHARED.BOOKING.ADVISOR_STATUS.BOOKED')
          break
      }

      return result
    },
    booking() {
      this.openUserInfoModal()
    },
    async openUserInfoModal() {
      let res = await this.$store.dispatch('user/find')

      if (res.data.id_card && res.data.phone_number && res.data.address) {
        this.openAdvisorBookingModal()
      } else {
        this.user_data = res.data
        this.user_info_dialog = true
      }
    },
    closeUserInfoModal(value) {
      this.user_info_dialog = false

      if (value) {
        this.openAdvisorBookingModal()
      }
    },
    openAdvisorBookingModal() {
      this.render_form = false
      this.$nextTick().then(() => {
        this.render_form = true
      })
      this.advisor_booking_dialog = true
    },
    async closeAdvisorBookingModal(value) {
      this.advisor_booking_dialog = false

      if (value) {
        await this.getCalendarBooking()
        await this.getBooking()
      }
    },
  },
}
</script>

<style scoped lang="scss">
.booking {
  padding: 15px 0 100px;

  .form-advisor {
    width: 70%;
  }

  .form-booking {
    text-align: right;
  }

  .latest-booking-title {
    margin: 20px 0 15px;
  }
}
</style>
