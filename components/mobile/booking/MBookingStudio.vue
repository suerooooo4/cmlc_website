<template>
  <main>
    <section class="search">
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-select
            v-model="studio_id_selected"
            @change="selectStudio"
            :items="studio_list"
            item-text="name"
            item-value="id"
            :label="$t('MEDIA_GENERAL.SORT')"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </section>
    <section class="calendar-container">
      <MBookingCalendar
        v-if="render_calendar"
        :data="calendar_booking"
        @select_date="selectDate"
      />
    </section>
    <section class="form-booking">
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
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
        </v-col>
      </v-row>
    </section>
    <h2 class="latest-booking-title">
      {{ $t('BOOKING.STUDIO_BOOKING.LASTEST_TITLE') }}
    </h2>

    <section class="lastest-container">
      <div v-if="booking_list.length">
        <div v-for="booking of booking_list" :key="booking.id">
          <MBookingLatestCard :data="booking" />
        </div>
      </div>

      <div v-else>
        <p class="text-center">
          {{ $t('BOOKING.STUDIO_BOOKING.NO_RESULT') }}
        </p>
      </div>
    </section>

    <v-dialog v-model="user_info_dialog" persistent max-width="600">
      <MPersonalDataForm
        @user_info_dialog="closeUserInfoModal"
        :data="user_data"
      />
    </v-dialog>

    <v-dialog
      v-if="render_form"
      v-model="studio_booking_dialog"
      persistent
      max-width="600"
    >
      <MBookingStudioForm
        @studio_booking_dialog="closeStudioBookingModal"
        :id="studio_id_selected"
        :date_selected="date_selected"
      />
    </v-dialog>
  </main>
</template>

<script>
import MBookingCalendar from '~/components/mobile/booking/MBookingCalendar.vue'
import MPersonalDataForm from '~/components/mobile/booking/MPersonalDataForm.vue'
import MBookingStudioForm from '~/components/mobile/booking/MBookingStudioForm.vue'
import MBookingLatestCard from '~/components/mobile/booking/MBookingLatestCard.vue'
export default {
  name: 'MBookingStudio',
  components: {
    MBookingCalendar,
    MPersonalDataForm,
    MBookingStudioForm,
    MBookingLatestCard,
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
.search {
  margin: 1rem;

  .v-input {
    .v-text-field__details {
      display: none !important;
    }
  }
}

.form-booking {
  margin: 1rem;

  .v-btn {
    background: #001538;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    color: #fff;
    width: 100%;
    height: 56px;
    padding: 3px 13px;
  }
}
.latest-booking-title {
  margin: 20px 0 15px 15px;
}
.lastest-container {
  padding: 0 10px;

  .booking-lastest {
    margin-bottom: 15px;
    padding: 15px;
    background: #f8f7f6;
    border-radius: 10px;

    .studio-name {
      margin-bottom: 5px;
    }

    .booking-status {
      font-size: 14px;

      i.fa {
        margin-right: 2px;
        font-size: 12px;
      }
    }

    .booking-date {
      font-size: 14px;
      color: #c4c4c4;
    }
  }

  .booking-lastest.pending {
    border-left: solid 15px #efb008;

    .booking-status {
      color: #efb008;
    }
  }

  .booking-lastest.book {
    border-left: solid 15px #f81e38;

    .booking-status {
      color: #f81e38;
    }
  }
}
</style>
