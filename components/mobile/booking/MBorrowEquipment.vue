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
                openCategory('/booking', {
                  tab: tab_id,
                  equipment_category_id: item.id,
                })
              "
            >
              {{ $lang(item.name_th, item.name_en) }}
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
            v-model="form.keyword"
            @keyup="changeInput"
            @keydown="keyDownInput"
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
            item-text="text"
            item-value="value"
            v-model="form.sort_by"
            @change="changeInput"
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
                  {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.IMAGE') }}
                </th>
            <th>
              {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.NAME') }}
            </th>

            <th>
              {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.STATUS') }}
            </th>

            <th>
              {{ $t('BOOKING.EQUIPMENT_BORROWING.TABLE.REVIEW') }}
            </th>

            <th>
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
            <td>{{ equipment.code }}</td>
             <td class="text-center">
                  <v-img
                    contain
                    lazy-src="images/default-image.png"
                    max-height="104"
                    max-width="104"
                    :src="image_url + equipment.image"
                  ></v-img>
              </td>
            <td>{{ $lang(equipment.name_th, equipment.name_en) }}</td>
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

            <td class="text-center">
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
    </section>
    <infinite-loading
      spinner="spiral"
      @infinite="infiniteScroll"
      force-use-infinite-wrapper=".el-table__body-wrapper"
      ref="infiniteloading"
    >
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
    <v-dialog v-model="equipment_condition_dialog" persistent max-width="600">
      <MBorrowEquipmentCondition
        @equipment_condition_dialog="closeEquipmentConditionModal"
      />
    </v-dialog>

    <v-dialog v-model="user_info_dialog" persistent max-width="600">
      <MPersonalDataForm
        @user_info_dialog="closeUserInfoModal"
        :data="user_data"
      />
    </v-dialog>

    <v-dialog v-model="equipment_booking_dialog" persistent max-width="600">
      <MBorrowEquipmentForm
        @equipment_booking_dialog="closeEquipmentBookingModal"
        :id="equipment_id_borrow"
      />
    </v-dialog>

    <v-dialog v-model="equipment_review_dialog" persistent max-width="600">
      <MBorrowEquipmentReview
        @equipment_review_dialog="closeEquipmentReviewModal"
        :id="equipment_id_review"
      />
    </v-dialog>
  </main>
</template>

<script>
import MBorrowEquipmentCondition from '~/components/mobile/booking/MBorrowEquipmentCondition.vue'
import MPersonalDataForm from '~/components/mobile/booking/MPersonalDataForm.vue'
import MBorrowEquipmentForm from '~/components/mobile/booking/MBorrowEquipmentForm.vue'
import MBorrowEquipmentReview from '~/components/mobile/booking/MBorrowEquipmentReview.vue'
export default {
  name: 'MBorrowEquipment',
  components: {
    MBorrowEquipmentCondition,
    MPersonalDataForm,
    MBorrowEquipmentForm,
    MBorrowEquipmentReview,
  },
  data() {
    return {
      tab_id: null,
      form: {
        keyword: '',
        sort_by: '',
      },
      page: 1,
      per_page: 4,
      last_page: 0,
      total: 0,
      typingTimer: null,
      doneTypingInterval: 1000,
      category_list: [],
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
      equipment_list: [],
      equipment_category_id: 0,
      equipment_condition_dialog: false,
      user_info_dialog: false,
      equipment_booking_dialog: false,
      equipment_review_dialog: false,
      equipment_id_borrow: null,
      equipment_id_review: null,
      user_data: null,
       image_url: process.env.image_url,
    }
  },
  mounted() {
    this.getCategory()
    this.tab_id = this.$route.query.tab
  },
  methods: {
    openCategory(path, query) {
      this.$router.push({ path, query })
      this.activeCategory(query.equipment_category_id)
      this.equipment_category_id = query.equipment_category_id
      this.getEquipment()
    },
    activeCategory(id) {
      this.category_list.map((data) => (data.is_active = false))
      const index = this.category_list.findIndex((data) => data.id == id)
      this.category_list[index].is_active = !this.category_list[index].is_active
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
    async openUserInfoModal() {
      let res = await this.$store.dispatch('user/find')

      if (res.data.id_card && res.data.phone_number && res.data.address) {
        this.openEquipmentBookingModal()
      } else {
        this.user_data = res.data
        this.user_info_dialog = true
      }
    },
    openEquipmentBookingModal() {
      this.equipment_booking_dialog = true
    },
    openReview(id) {
      this.equipment_review_dialog = true
      this.equipment_id_review = id
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
    closeEquipmentReviewModal(value) {
      this.equipment_review_dialog = value
      this.equipment_id_review = null
    },
    closeEquipmentBookingModal(value) {
      this.equipment_booking_dialog = false

      if (value) {
        this.getEquipment()
      }
    },
    keyDownInput(event) {
      clearTimeout(this.typingTimer)
    },
    changeInput(event) {
      clearTimeout(this.typingTimer)
      this.typingTimer = setTimeout(async () => {
        this.getEquipment()
      }, this.doneTypingInterval)
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
    async getEquipment() {
      this.page = 1
      let res = await this.$store.dispatch('equipment/pagination', {
        page: this.page,
        perPage: this.per_page,
        orderBy: this.form.sort_by,
        equipment_category_id:
          this.equipment_category_id != 0 ? this.equipment_category_id : '',
        keyword: this.form.keyword,
      })

      this.$refs.infiniteloading.stateChanger.reset()
      this.equipment_list = res.data.data
      this.last_page = res.data.lastPage
      this.total = res.data.total
      this.page++
    },
    infiniteScroll($state = null) {
      setTimeout(async () => {
        let res = await this.$store.dispatch('equipment/pagination', {
          page: this.page,
          perPage: this.per_page,
          orderBy: this.form.sort_by,
          equipment_category_id:
            this.equipment_category_id != 0 ? this.equipment_category_id : '',
          keyword: this.form.keyword,
        })
        if (res.data.data.length >= 1) {
          this.equipment_list = this.equipment_list.concat(
            res.data.data.map((data) => {
              data.detail_th = this.$stripHtml(data.detail_th)
              data.detail_en = this.$stripHtml(data.detail_en)

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
    async getCategory() {
      let res = await this.$store.dispatch('equipment_category/get')
      this.category_list = res.data.map((data) => {
        data.is_active = false
        return data
      })
      this.category_list.unshift({
        id: 0,
        is_active: false,
        name_en: 'All',
        name_th: 'ทั้งหมด',
      })

      if (this.$route.query.equipment_category_id != null) {
        this.activeCategory(this.$route.query.equipment_category_id)
      } else {
        this.activeCategory(this.category_list[0].id)
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
