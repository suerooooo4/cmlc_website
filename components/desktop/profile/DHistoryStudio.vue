<template>
  <div class="history-container">
    <table class="table-booking">
      <thead>
        <tr>
          <th class="text-left">
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.CODE') }}
          </th>

          <th class="text-left">
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.NAME') }}
          </th>

          <th class="text-left">
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.STATUS') }}
          </th>

          <th class="text-left">
            {{ $t('PROFILE.TAB.BOOKING.TABLE.HEADER.BOOKING_DATE') }}
          </th>

          <th class="text-center">
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
          <td class="text-left">{{ history.studio.code }}</td>

          <td class="text-left">
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

        <tr v-if="!total" class="no-result">
          <td class="text-center" colspan="10">
            {{ $t('PROFILE.TAB.BOOKING.TABLE.NO_RESULT') }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="total" class="pagination">
      <v-pagination
        v-model="page"
        @input="changePage()"
        :length="last_page"
        :total-visible="7"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'DHistoryStudio',
  data() {
    return {
      page: 1,
      per_page: 10,
      last_page: 0,
      total: 0,
      booking_history: [],
    }
  },
  async mounted() {
    await this.getBookingHistory()
  },
  methods: {
    async getBookingHistory() {
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
    },
    async changePage() {
      await this.getBookingHistory()
    },
    getBookingStatus(id) {
      let result

      switch (id) {
        case 0:
          result = this.$t('SHARED.BOOKING.STUDIO_BOOKING_STATUS.WAITING')
          break
        case 1:
          result = this.$t('SHARED.BOOKING.STUDIO_BOOKING_STATUS.RETURNED')
          break
        case 2:
          result = this.$t('SHARED.BOOKING.STUDIO_BOOKING_STATUS.BOOKED')
          break
        case 3:
          result = this.$t('SHARED.BOOKING.STUDIO_BOOKING_STATUS.CANCELED')
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

<style lang="scss" scoped>
.history-container {
  .table-booking {
    width: 100%;
    margin-top: 15px;
    border-collapse: collapse;
    overflow: auto;

    td,
    th {
      width: 10%;
      margin: 0;
    }

    td:first-child,
    th:first-child {
      padding-left: 5%;
    }

    td:nth-child(2),
    th:nth-child(2) {
      width: 15%;
      padding-right: 5px;
    }

    td:last-child {
      height: 60px;
    }

    tr.no-result {
      td {
        padding-left: 0 !important;
      }
    }

    thead {
      color: #fff;
      border-radius: 6px 6px 0px 0px;

      th {
        padding: 15px 0;
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

      td {
        padding: 12px 0;
        font-size: 14px;
      }
    }

    .warning,
    .success,
    .danger,
    .gray {
      font-size: 12px;
      height: 26px;
      min-width: 100px;
      padding: 0 10px;
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
      background: #ccc !important;
      color: #222;
    }
  }

  .pagination {
    margin-top: 50px;
  }
}
</style>
