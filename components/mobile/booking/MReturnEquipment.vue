<template>
  <main>
    <section class="categories">
      <h1 class="categories__title">{{ $t('MEDIA_GENERAL.CATEGORY') }}</h1>
      <v-sheet class="mx-auto" max-width="700">
        <v-slide-group class="a" show-arrows>
          <v-slide-item v-for="item in category_list" :key="item.id">
            <v-btn
              class="mx-2"
              :input-value="item.is_active"
              active-class="gray indigo--text"
              depressed
              rounded
              @click="
                openCategory('/booking', { tab: tab_id, category_id: item.id })
              "
            >
              {{ item.name }}
            </v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </section>
    <section class="search">
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-text-field
            append-icon="mdi-magnify"
            type="text"
            :label="$t('MEDIA_GENERAL.SEARCH')"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-select
            :items="sort_item"
            :label="$t('MEDIA_GENERAL.SORT')"
            class="ma-0 pa-0"
            single-line
            outlined
            hide-details
          ></v-select>
        </v-col>
      </v-row>
    </section>
    <section class="booking-container">
      <table class="booking">
        <thead>
          <tr>
            <th>
              {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.CODE') }}
            </th>
            <th>
              {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.NAME') }}
            </th>
            <th>
              {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.STATUS') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(equipment, index) of equipment_list"
            :key="equipment.id"
            :class="[index % 2 != 0 ? 'even' : '']"
          >
            <td>{{ equipment.code }}</td>
            <td>{{ equipment.name }}</td>
            <td>
              <v-btn
                v-if="equipment.booking_status_id == 1"
                class="success"
                plain
                depressed
              >
                <i class="circle-success"></i>
                <span>{{ equipment.booking_status_name }}</span>
              </v-btn>

              <v-btn
                v-if="equipment.booking_status_id == 2"
                class="danger"
                plain
                depressed
              >
                <i class="circle-danger"></i>
                <span>{{ equipment.booking_status_name }}</span>
              </v-btn>

              <v-btn
                v-if="equipment.booking_status_id == 3"
                class="warning"
                plain
                depressed
              >
                <i class="circle-warning"></i>
                <span>{{ equipment.booking_status_name }}</span>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
export default {
  name: 'MReturnEquipment',
  data() {
    return {
      tab_id: null,
      category_list: [],
      sort_item: ['name', 'created_at'],
      equipment_list: [],
    }
  },
  mounted() {
    this.getCategory()
    this.getEquipment()
    this.tab_id = this.$route.query.tab
    if (this.$route.query.category_id != null) {
      this.activeCategory(this.$route.query.category_id)
    } else {
      this.activeCategory(this.category_list[0].id)
    }
  },
  methods: {
    openCategory(path, query) {
      this.$router.push({ path, query })
      this.activeCategory(query.category_id)
    },
    activeCategory(id) {
      this.category_list.map((data) => (data.is_active = false))
      const index = this.category_list.findIndex((data) => data.id == id)
      this.category_list[index].is_active = !this.category_list[index].is_active
    },
    bookingEquipment(id) {
      this.openEquipmentConditionModal()
    },
    openEquipmentConditionModal() {
      this.equipment_condition_dialog = true
    },
    openUserInfoModal() {
      this.user_info_dialog = true
    },
    openEquipmentBookingModal() {
      this.equipment_booking_dialog = true
    },
    closeEquipmentConditionModal(value) {
      this.equipment_condition_dialog = false

      if (value) {
        this.openUserInfoModal()
      }
    },
    closeUserInfoModal(value) {
      this.user_info_dialog = false

      if (value) {
        this.openEquipmentBookingModal()
      }
    },
    closeEquipmentBookingModal(value) {
      this.equipment_booking_dialog = false
    },
    getEquipment() {
      let cntStatus = 1

      for (let i = 0; i < 9; i++) {
        let statusInfo = this.getBookingStatusInfo(cntStatus)
        this.equipment_list.push({
          id: i + 1,
          code: 'A1234567' + i,
          name: 'Cam' + (i + 1),
          booking_status_id: statusInfo.id,
          booking_status_name: statusInfo.name,
        })

        if (cntStatus == 3) {
          cntStatus = 1
        } else {
          cntStatus++
        }
      }
    },
    getBookingStatusInfo(id) {
      let result

      switch (id) {
        case 1:
          result = {
            id: 1,
            name: 'มีของ',
          }
          break
        case 2:
          result = {
            id: 2,
            name: 'ไม่มีของ',
          }
          break
        case 3:
          result = {
            id: 3,
            name: 'กำลังรออนุมัติ',
          }
          break
      }

      return result
    },
    getCategory() {
      let data = [
        'ทั้งหมด',
        'สื่อภาพ',
        'สื่อเสียง',
        'สื่อภาพและเสียง',
        'สื่อบทความดิจิทัล',
      ]
      let i = 0

      for (const row of data) {
        this.category_list.push({
          id: i++,
          name: row,
          is_active: false,
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.categories {
  max-width: 100vw;
  background-color: #f8f7f6;

  &__title {
    text-align: center;
    padding-top: 15px;
    font-size: 20px;
  }
  .v-sheet {
    background-color: unset;
    border-color: unset;
    color: #001538;
  }
}
.search {
  margin: 1rem;

  .v-input {
    .v-text-field__details {
      display: none !important;
    }
  }

  .v-btn {
    margin: 0 5px;
    background: #001538;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.09);
    border-radius: 4px;
    color: #fff;
    width: 45%;
    height: 56px;
    padding: 7px 13px;
  }
}
.booking-container {
  margin: 1rem;
  overflow: auto;
  .booking {
    width: 150%;
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
        background: #f8f7f6;
      }
      td {
        padding: 12px 0;
        font-size: 14px;

        a > i.fa {
          font-size: 18px;
        }
      }
    }

    .success,
    .danger,
    .warning {
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
  }
}
</style>
