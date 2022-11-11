<template>
  <div class="equipment-container">
    <v-row>
      <v-col cols="3">
        <div class="category-container">
          <h2 class="category-title">
            {{ $t('BOOKING.EQUIPMENT_RETURN.CATEGORY') }}
          </h2>

          <ul class="category-list">
            <li
              v-for="category of category_list"
              :key="category.id"
              @click="
                openPage('/booking', {
                  tab: 2,
                  equipment_category_id: category.id,
                })
              "
            >
              {{ category.name }}
            </li>
          </ul>
        </div>
      </v-col>

      <v-col cols="9">
        <div class="filter-form">
          <v-row>
            <v-col cols="7">
              <v-text-field
                name="input-search"
                :label="$t('BOOKING.EQUIPMENT_RETURN.SEARCH')"
                append-icon="mdi-magnify"
                solo
              ></v-text-field>
            </v-col>

            <v-col cols="5">
              <v-select
                :items="sort_item"
                :label="$t('BOOKING.EQUIPMENT_RETURN.SORT')"
                solo
              ></v-select>
            </v-col>
          </v-row>
        </div>

        <div class="booking-container">
          <table class="table-booking">
            <thead>
              <tr>
                <th class="text-left">
                  {{ $t('BOOKING.EQUIPMENT_RETURN.TABLE.CODE') }}
                </th>
                <th class="text-left">
                  {{ $t('BOOKING.EQUIPMENT_RETURN.TABLE.NAME') }}
                </th>
                <th class="text-left">
                  {{ $t('BOOKING.EQUIPMENT_RETURN.TABLE.STATUS') }}
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(equipment, index) of equipment_list"
                :key="equipment.id"
                :class="[index % 2 != 0 ? 'even' : '']"
              >
                <td class="text-left">{{ equipment.code }}</td>
                <td class="text-left">{{ equipment.name }}</td>
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
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'DReturnEquipment',
  data() {
    return {
      equipment_list: [],
      category_list: [],
      sort_item: ['name', 'created_at'],
    }
  },
  mounted() {
    this.getCategory()
    this.getEquipment()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    getCategory() {
      let data = [
        'ทั้งหมด',
        'กล้องถ่ายภาพ',
        'เครื่องบันทึกเสียง',
        'ไมโครโฟน',
        'ไฟจัดฉาก',
      ]
      let i = 0

      for (const row of data) {
        this.category_list.push({
          id: i++,
          name: row,
        })
      }
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

        if (cntStatus == 2) {
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
            name: 'คืนแล้ว',
          }
          break
        case 2:
          result = {
            id: 2,
            name: 'กำลังใช้งาน',
          }
          break
      }

      return result
    },
  },
}
</script>

<style scoped lang="scss">
.equipment-container {
  padding: 15px 0 100px;

  .category-container {
    padding: 35px 35px 45px;
    background: #f8f7f6;
    border-radius: 6px;

    .category-title {
      margin-bottom: 15px;
      padding: 0 15px;
      font-size: 26px;
    }

    .category-list {
      list-style: none;
      padding: 0;

      li {
        padding: 15px;
        border-bottom: 1px solid #e5e5e5;
        cursor: pointer;
      }
    }
  }

  .filter-form,
  .booking-container {
    padding-left: 30px;
  }

  .booking-container {
    .table-booking {
      width: 100%;
      border-collapse: collapse;
      overflow: auto;

      td,
      th {
        width: 10%;
        margin: 0;
      }

      td:first-child,
      th:first-child {
        width: 15%;
        padding-left: 5%;
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
          background: #f8f7f6;
        }

        td {
          padding: 12px 0;
          font-size: 14px;
        }
      }

      .success,
      .danger,
      .warning {
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
    }
  }
}
</style>
