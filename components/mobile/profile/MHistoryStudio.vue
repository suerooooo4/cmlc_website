<template>
  <div>
    <table class="booking">
      <thead>
        <tr>
          <th>
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.CODE') }}
          </th>

          <th>
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.NAME') }}
          </th>

          <th>
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.STATUS') }}
          </th>

          <th>
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.BOOKING_DATE') }}
          </th>

          <th>
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.ACTION') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(history, index) of booking_history"
          :key="history.id"
          :class="[index % 2 != 0 ? 'even' : '']"
        >
          <td>{{ history.studio.code }}</td>

          <td>
            {{ $lang(history.studio.name_th, history.studio.name_end) }}
          </td>
          <td>
            <v-btn
              v-if="history.booking_status == 0"
              class="warning"
              plain
              depressed
            >
              <i class="circle-warning"></i>
              <span>{{ getBookingStatus(history.booking_status) }}</span>
            </v-btn>

            <v-btn
              v-if="history.booking_status == 1"
              class="success"
              plain
              depressed
            >
              <i class="circle-success"></i>
              <span>{{ getBookingStatus(history.booking_status) }}</span>
            </v-btn>

            <v-btn
              v-if="history.booking_status == 2"
              class="danger"
              plain
              depressed
            >
              <i class="circle-danger"></i>
              <span>{{ getBookingStatus(history.booking_status) }}</span>
            </v-btn>

            <v-btn
              class="gray"
              v-if="history.booking_status == 3"
              plain
              depressed
            >
              <i class="circle-gray"></i>
              <span>{{ getBookingStatus(history.booking_status) }}</span>
            </v-btn>
          </td>

          <td class="text-left">{{ history.booking_date }}</td>
          <td class="text-center">
            <v-btn
              v-if="history.booking_status == 0"
              plain
              depressed
              @click="unbooking(history.id)"
              color="primary"
              dark
            >
              <i class="fa fa-trash"></i>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      ref="infiniteloading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'MHistoryStudio',
  props: ['random'],
  watch: {
    random: {
      async handler(val, oldVal) {
        this.$refs.infiniteloading.stateChanger.reset()
      },
      deep: true,
    },
  },
  data() {
    return {
      page: 1,
      per_page: 6,
      last_page: 0,
      total: 0,
      booking_history: [],
    }
  },
  mounted() {
    this.$refs.infiniteloading.stateChanger.reset()
  },
  methods: {
    async getBookingHistory() {
      this.page = 1
      let res = await this.$store.dispatch('studio_booking/history', {
        page: this.page,
        perPage: this.per_page,
      })

      this.booking_history = res.data.data.map((data) => {
        data.booking_date = data.booking_date.slice(0, 10)
        return data
      })
      this.last_page = res.data.lastPage
      this.total = res.data.total
      this.page++
    },
    infiniteScroll($state = null) {
      setTimeout(async () => {
        let res = await this.$store.dispatch('studio_booking/history', {
          page: this.page,
          perPage: this.per_page,
        })
        if (res.data.data.length >= 1) {
          this.booking_history = this.booking_history.concat(
            res.data.data.map((data) => {
              data.booking_date = data.booking_date.slice(0, 10)

              return data
            })
          )
          this.last_page = res.data.lastPage
          this.total = res.data.total
          this.page++
          $state.loaded()
        } else {
          $state.complete()
        }
      }, 500)
    },
    async changePage() {
      await this.getBookingHistory()
    },
    getBookingStatus(id) {
      let result

      switch (id) {
        case 0:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_BORROW_STATUS.WAITING')
          break
        case 1:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_BORROW_STATUS.RETURNED')
          break
        case 2:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_BORROW_STATUS.BOOKED')
          break
        case 3:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_BORROW_STATUS.CANCELED')
          break
      }

      return result
    },
    unbooking(id) {
      Swal.fire({
        title: this.$t('PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.TITLE'),
        text: this.$t('PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.TEXT'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$t(
          'PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.BTN_OK'
        ),
        cancelButtonText: this.$t(
          'PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.BTN_CANCEL'
        ),
      }).then(async (result) => {
        if (result.isConfirmed) {
          let res = await this.$store.dispatch('studio_booking/unbooking', id)

          if (res.status == 'success') {
            await this.getBookingHistory()
            Swal.fire({
              title: this.$t(
                'PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.RESULT_TITLE'
              ),
              text: this.$t('PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.RESULT_TEXT'),
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: this.$t(
                'PROFILE.TAB.BOOKING.UNBOOKING_DIALOG.BTN_OK'
              ),
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
      })
    },
  },
}
</script>

<style scoped lang="scss">
.booking {
  width: 200%;
  margin-top: 15px;
  font-size: 12px;
  border-collapse: collapse;
  overflow: auto;
  td,
  th {
    width: 10%;
    text-align: center;
    padding: 12px 0;
    margin: 0;
  }
  thead {
    color: #fff;
    border-radius: 6px 6px 0px 0px;
    th {
      background: #001538;
    }
    th:first-child {
      border-radius: 6px 0 0 0px;
    }

    th:last-child {
      border-radius: 0 6px 0px 0;
    }
  }

  tbody {
    .even > td {
      background: #fff;
    }
  }

  .success,
  .danger,
  .warning,
  .gray {
    font-size: 12px;
    height: 26px;
    min-width: 100px;
    padding: 0 5px;
    border-radius: 20px;
    justify-content: start;

    span {
      padding-left: 5px;
    }
  }

  .success {
    background: #a5e1bf !important;
    color: #00632b;
  }

  .danger {
    background: #fc9595 !important;
    color: #b01212;
  }

  .warning {
    background: rgba(255, 222, 129, 0.73) !important;
    color: #efb008;
  }
  .gray {
    background: rgba(219, 219, 219, 0.726) !important;
    color: black;
  }
}
</style>
