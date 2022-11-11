<template>
  <div>
    <div
      class="booking-lastest"
      :class="[data.booking_status == 0 ? 'pending' : 'book']"
    >
      <p class="mb-1">
        <span class="booking-date">
          {{ data.booking_date.slice(0, 10) }}
        </span>
      </p>

      <p>
        <span class="booking-time">
          {{ $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.START_TIME') }}
          {{ data.booking_start_time }}
          {{ $t('BOOKING.STUDIO_BOOKING.MODAL_BOOKING.END_TIME') }}
          {{ data.booking_end_time }}
        </span>
      </p>

      <v-row>
        <v-col>
          <span class="booking-status">
            <i class="fa fa-circle"></i>
            {{ data.booking_status_name }}
          </span>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DBookingLatestCard',
  props: ['data'],
}
</script>

<style lang="scss" scoped>
.booking-lastest {
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f7f6;
  border-radius: 10px;

  .booking-status {
    font-size: 14px;

    i.fa {
      margin-right: 2px;
      font-size: 12px;
    }
  }

  .booking-date,
  .booking-time {
    font-size: 14px;
    color: #777;
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
</style>
