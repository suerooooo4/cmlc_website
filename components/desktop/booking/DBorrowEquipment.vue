<template>
  <div class="equipment-container">
    <v-row>
      <v-col cols="3">
        <div class="category-container">
          <h2 class="category-title">
            {{ $t('BOOKING.EQUIPMENT_RETURN.CATEGORY') }}
          </h2>

          <ul class="category-list">
            <li @click="changeCategory()">
              {{ $lang('ทั้งหมด', 'All') }}
            </li>

            <li
              v-for="category of category_list"
              :key="category.id"
              @click="changeCategory(category.id)"
            >
              {{ $lang(category.name_th, category.name_en) }}
            </li>
          </ul>
        </div>
      </v-col>

      <v-col cols="9">
        <div class="filter-form">
          <v-row>
            <v-col cols="7">
              <v-text-field
                v-model="keyword"
                @keypress="search"
                name="input-search"
                :label="$t('BOOKING.EQUIPMENT_BORROWING.SEARCH')"
                append-icon="mdi-magnify"
                solo
              ></v-text-field>
            </v-col>

            <v-col cols="5">
              <v-select
                :items="sort_item"
                item-text="text"
                item-value="value"
                v-model="sort_by"
                @change="changeSort"
                :label="$t('BOOKING.EQUIPMENT_BORROWING.SORT')"
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
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.CODE') }}
                </th>

                <th class="text-left">
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.IMAGE') }}
                </th>

                <th class="text-left">
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.NAME') }}
                </th>

                <th class="text-left">
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.STATUS') }}
                </th>

                <th class="text-center">
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.REVIEW') }}
                </th>

                <th class="text-right">
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.RESERVE') }}
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
                <td class="text-center">
                  <v-img
                    contain
                    lazy-src="images/default-image.png"
                    max-height="104"
                    max-width="104"
                    :src="image_url + equipment.image"
                  ></v-img>
                </td>
                <td class="text-left">
                  {{ $lang(equipment.name_th, equipment.name_en) }}
                </td>

                <td>
                  <v-btn
                    v-if="equipment.item_status == 0"
                    class="warning"
                    plain
                    depressed
                  >
                    <i class="circle-warning"></i>
                    <span>{{ getItemStatus(equipment.item_status) }}</span>
                  </v-btn>

                  <v-btn
                    v-if="equipment.item_status == 1"
                    class="success"
                    plain
                    depressed
                  >
                    <i class="circle-success"></i>
                    <span>{{ getItemStatus(equipment.item_status) }}</span>
                  </v-btn>

                  <v-btn
                    v-if="equipment.item_status == 2"
                    class="danger"
                    plain
                    depressed
                  >
                    <i class="circle-danger"></i>
                    <span>{{ getItemStatus(equipment.item_status) }}</span>
                  </v-btn>
                </td>

                <td class="text-center">
                  <a @click="openReview(equipment.id)">
                    <i class="fa fa-comment-dots"></i>
                  </a>
                </td>

                <td class="text-right">
                  <div v-if="equipment.item_status == 1">
                    <a
                      v-if="$store.state.user.user_id"
                      @click="bookingEquipment(equipment.id)"
                    >
                    <i class="far fa-calendar-check"></i>
                    </a>

                    <a v-else class="disabled-btn">
                      <i class="far fa-calendar-check"></i>
                    </a>
                  </div>
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
      </v-col>
    </v-row>

    <v-dialog v-model="equipment_condition_dialog" persistent max-width="600">
      <DBorrowEquipmentCondition
        @equipment_condition_dialog="closeEquipmentConditionModal"
      />
    </v-dialog>

    <v-dialog v-model="user_info_dialog" persistent max-width="600">
      <DPersonalDataForm
        @user_info_dialog="closeUserInfoModal"
        :data="user_data"
      />
    </v-dialog>

    <v-dialog
      v-if="render_form"
      v-model="equipment_booking_dialog"
      persistent
      max-width="600"
    >
      <DBorrowEquipmentForm
        @equipment_booking_dialog="closeEquipmentBookingModal"
        :id="equipment_id_borrow"
      />
    </v-dialog>

    <v-dialog
      v-if="render_review"
      v-model="equipment_review_dialog"
      persistent
      max-width="600"
    >
      <DBorrowEquipmentReview
        @equipment_review_dialog="closeEquipmentReviewModal"
        :id="equipment_id_review"
      />
    </v-dialog>
  </div>
</template>

<script>
import DBorrowEquipmentCondition from '~/components/desktop/booking/DBorrowEquipmentCondition.vue'
import DPersonalDataForm from '~/components/desktop/booking/DPersonalDataForm.vue'
import DBorrowEquipmentForm from '~/components/desktop/booking/DBorrowEquipmentForm.vue'
import DBorrowEquipmentReview from '~/components/desktop/booking/DBorrowEquipmentReview.vue'

export default {
  name: 'DBorrowEquipment',
  components: {
    DBorrowEquipmentCondition,
    DPersonalDataForm,
    DBorrowEquipmentForm,
    DBorrowEquipmentReview,
  },
  data() {
    return {
      page: 1,
      per_page: 10,
      last_page: 0,
      total: 0,
      sort_by: '',
      sort_item: [
        {
          value: 'created_at',
          text: this.$t('SHARED.SORT_ORDER.CREATE_DATE'),
        },
        {
          value: this.$lang('name_th', 'name_en'),
          text: this.$t('SHARED.SORT_ORDER.NAME'),
        },
      ],
      keyword: '',
      equipment_list: [],
      category_list: [],
      equipment_category_id: '',
      equipment_condition_dialog: false,
      user_info_dialog: false,
      equipment_booking_dialog: false,
      equipment_review_dialog: false,
      equipment_id_borrow: null,
      equipment_id_review: null,
      user_data: null,
      render_form: true,
      render_review: true,
      image_url: process.env.image_url,
    }
  },
  async mounted() {
    await this.getCategory()
    await this.getEquipment()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getCategory() {
      let res = await this.$store.dispatch('equipment_category/get')
      this.category_list = res.data
    },
    async getEquipment() {
      let res = await this.$store.dispatch('equipment/pagination', {
        page: this.page,
        perPage: this.per_page,
        orderBy: this.sort_by,
        equipment_category_id: this.equipment_category_id,
        keyword: this.keyword,
      })

      this.equipment_list = res.data.data
      this.last_page = res.data.lastPage
      this.total = res.data.total
    },
    async changePage() {
      await this.getEquipment()
    },
    async changeSort() {
      await this.getEquipment()
    },
    async changeCategory(id = null) {
      if (id) {
        this.equipment_category_id = id
      } else {
        this.equipment_category_id = ''
      }

      await this.getEquipment()
    },
    async search($event) {
      if ($event.key.toUpperCase() == 'ENTER') {
        this.keyword = this.keyword.trim()
        await this.getEquipment()
      }
    },
    getItemStatus(id) {
      let result

      switch (id) {
        case 0:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_STATUS.WAITING')
          break
        case 1:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_STATUS.AVAILABLE')
          break
        case 2:
          result = this.$t('SHARED.BOOKING.EQUIPMENT_STATUS.BOOKED')
          break
      }

      return result
    },
    async bookingEquipment(id) {
      this.equipment_id_borrow = id

      let res = await this.$store.dispatch('equipment_term_and_condition/find')

      if (res.data) {
        this.openUserInfoModal()
      } else {
        this.openEquipmentConditionModal()
      }
    },
    openEquipmentConditionModal() {
      this.equipment_condition_dialog = true
    },
    closeEquipmentConditionModal(value) {
      this.equipment_condition_dialog = false

      if (value) {
        this.openUserInfoModal()
      }
    },
    async openUserInfoModal() {
      let res = await this.$store.dispatch('user/find')

      if (res.data.id_card && res.data.phone_number && res.data.address) {
        this.openEquipmentBookingModal()
      } else {
        this.user_data = res.data
        this.user_info_dialog = true
      }
    },
    closeUserInfoModal(value) {
      this.user_info_dialog = false

      if (value) {
        this.openEquipmentBookingModal()
      }
    },
    openEquipmentBookingModal() {
      this.render_form = false
      this.$nextTick().then(() => {
        this.render_form = true
      })
      this.equipment_booking_dialog = true
    },
    async closeEquipmentBookingModal(value) {
      this.equipment_booking_dialog = false

      if (value) {
        await this.getEquipment()
      }
    },
    openReview(id) {
      this.equipment_id_review = id
      this.render_review = false
      this.$nextTick().then(() => {
        this.render_review = true
      })
      this.equipment_review_dialog = true
    },
    closeEquipmentReviewModal(value) {
      this.equipment_review_dialog = value
      this.equipment_id_review = null
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

      td:last-child,
      th:last-child {
        width: 10%;
        padding-right: 5%;
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

      .disabled-btn {
        color: #d8d8d8;
      }
    }

    .pagination {
      margin-top: 50px;
    }
  }
}
</style>
