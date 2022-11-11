<template>
  <div>
    <div class="booking">
      <v-row>
        <v-col cols="8">
          <div class="form-studio">
            <v-select
              v-model="studio_id_selected"
              @change="selectStudio"
              :items="studio_list"
              item-text="name"
              item-value="id"
              :label="$t('BOOKING.STUDIO_BOOKING.STUDIO')"
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
                !studio_id_selected ||
                !$store.state.user.user_id ||
                !date_selected
              "
              @click="booking()"
              large
              depressed
              color="primary"
              class="btn-booking"
            >
              {{ $t('BOOKING.STUDIO_BOOKING.BTN_BOOKING') }}
            </v-btn>
          </div>

          <h2 class="latest-booking-title">
            {{ $t('BOOKING.STUDIO_BOOKING.LASTEST_TITLE') }}
          </h2>

          <div class="lastest-container">
            <div v-if="booking_list.length">
              <div v-for="booking of booking_list" :key="booking.id">
                <DBookingLatestCard :data="booking" />
              </div>
            </div>

            <div v-else>
              <p class="text-center">
                {{ $t('BOOKING.STUDIO_BOOKING.NO_RESULT') }}
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
      v-model="studio_booking_dialog"
      persistent
      max-width="980"
    >
      <DBookingStudioForm
        @studio_booking_dialog="closeStudioBookingModal"
        :id="studio_id_selected"
        :date_selected="date_selected"
      />
    </v-dialog>
  </div>
</template>

<script>
import DPersonalDataForm from '~/components/desktop/booking/DPersonalDataForm.vue'
import DBookingStudioForm from '~/components/desktop/booking/DBookingStudioForm.vue'
import DBookingCalendar from '~/components/desktop/booking/DBookingCalendar.vue'
import DBookingLatestCard from '~/components/desktop/booking/DBookingLatestCard.vue'

export default {
  name: 'DBookingStudio',
  components: {
    DPersonalDataForm,
    DBookingStudioForm,
    DBookingCalendar,
    DBookingLatestCard,
  },
  data() {
    return {
      studio_list: [],
      booking_list: [],
      calendar_booking: [],
      user_info_dialog: false,
      studio_booking_dialog: false,
      user_data: null,
      studio_id_selected: null,
      render_calendar: true,
      render_form: true,
      date_selected: null,
    }
  },
  async mounted() {
    await this.getStudio()
  },
  methods: {
    async getStudio() {
      let res = await this.$store.dispatch('studio/get')

      this.studio_list = res.data.map((data) => {
        data.name = this.$lang(data.name_th, data.name_en)
        return data
      })
    },
    async selectStudio() {
      this.clearDataSelected()
      await this.getCalendarBooking()
    },
    clearDataSelected() {
      this.date_selected = null
      this.calendar_booking = []
      this.booking_list = []
    },
    async getCalendarBooking() {
      let res = await this.$store.dispatch('studio_booking/total', {
        studio_id: this.studio_id_selected,
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
      if (this.studio_id_selected) {
        this.date_selected = $event.date
        await this.getBooking()
      }
    },
    async getBooking() {
      let res = await this.$store.dispatch('studio_booking/get', {
        studio_id: this.studio_id_selected,
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
    booking() {
      this.openUserInfoModal()
    },
    async openUserInfoModal() {
      let res = await this.$store.dispatch('user/find')

      if (res.data.id_card && res.data.phone_number && res.data.address) {
        this.openStudioBookingModal()
      } else {
        this.user_data = res.data
        this.user_info_dialog = true
      }
    },
    closeUserInfoModal(value) {
      this.user_info_dialog = false

      if (value) {
        this.openStudioBookingModal()
      }
    },
    openStudioBookingModal() {
      this.render_form = false
      this.$nextTick().then(() => {
        this.render_form = true
      })
      this.studio_booking_dialog = true
    },
    async closeStudioBookingModal(value) {
      this.studio_booking_dialog = false

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

  .form-studio {
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
