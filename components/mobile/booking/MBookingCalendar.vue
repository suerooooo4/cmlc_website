<template>
  <div>
    <div class="calendar-container">
      <v-toolbar flat color="primary" dark class="calendar-header">
        <v-btn fab text small color="light" class="ml-2" @click="prev">
          <v-icon small> mdi-chevron-left </v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-toolbar-title v-if="$refs.calendar">
          {{ $refs.calendar.title }}
        </v-toolbar-title>

        <v-toolbar-title v-else>
          {{ calendar_title }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn fab text small color="light" class="mr-2" @click="next">
          <v-icon small> mdi-chevron-right </v-icon>
        </v-btn>
      </v-toolbar>

      <v-sheet height="550">
        <v-calendar
          ref="calendar"
          v-model="focus"
          :now="today"
          :value="today"
          color="primary"
          locale="th"
          @click:date="selectDate"
        >
          <template v-slot:day="{ date }">
            <div v-if="calendar_booking[date] > 0" class="px-3 text-center">
              <div v-if="calendar_booking[date] < 6">
                <span
                  v-for="index in calendar_booking[date]"
                  :key="index"
                  class="booking-dot"
                >
                  <i class="fa fa-circle"></i>
                </span>
              </div>

              <div v-else>
                <span v-for="index in 5" :key="index" class="booking-dot">
                  <i class="fa fa-circle"></i>
                </span>

                <p class="more-bot">More</p>
              </div>
            </div>
          </template>
        </v-calendar>
      </v-sheet>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MBookingCalendar',
  props: ['data'],
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
      focus: '',
      calendar_booking: [],
      calendar_title: null,
    }
  },
  async mounted() {
    this.init()
    this.$refs.calendar.checkChange()
    this.calendar_title = this.$refs.calendar.title
  },
  methods: {
    init() {
      this.calendar_booking = this.data
    },
    selectDate($event) {
      this.$emit('select_date', $event)
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
  },
}
</script>

<style lang="scss">
.calendar-container {
  .v-calendar-weekly__head {
    .v-calendar-weekly__head-weekday {
      padding: 15px 0;
      background: #fff;
      border-bottom: solid 1px #c4c4c4;
      color: var(--v-primary-base) !important;
      font-weight: bold;
      font-size: 16px;
    }
  }

  .booking-dot {
    margin: 0 2px 2px;
    font-size: 12px;
    color: #f81e38;
  }

  .more-bot {
    text-align: center;
    font-size: 12px;
    color: #c4c4c4;
  }
}
</style>
