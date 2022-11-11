<template>
  <div>
    <DArticleBanner
      :title="$t('BOOKING.TITLE')"
      :subtitle="$t('BOOKING.SUBTITLE')"
      :image="'/images/banner-booking.png'"
    />

    <v-container>
      <div class="booking-container">
        <v-tabs v-model="tab" grow slider-size="4">
          <v-tab @click="openPage('/booking', { tab: 1 })">
            <h2>{{ $t('BOOKING.EQUIPMENT_BORROWING.TITLE') }}</h2>
          </v-tab>

          <!-- <v-tab @click="openPage('/booking', { tab: 2 })">
            {{ $t('BOOKING.EQUIPMENT_RETURN.TITLE') }}
          </v-tab> -->

          <v-tab @click="openPage('/booking', { tab: 2 })">
            <h2>{{ $t('BOOKING.STUDIO_BOOKING.TITLE') }}</h2>
          </v-tab>

          <v-tab @click="openPage('/booking', { tab: 3 })">
            <h2>{{ $t('BOOKING.ADVISOR_BOOKING.TITLE') }}</h2>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <div class="tab-content">
              <DBorrowEquipment />
            </div>
          </v-tab-item>

          <!-- <v-tab-item>
            <div class="tab-content">
              <DReturnEquipment />
            </div>
          </v-tab-item> -->

          <v-tab-item>
            <div class="tab-content">
              <DBookingStudio />
            </div>
          </v-tab-item>

          <v-tab-item>
            <div class="tab-content">
              <DBookingAdvisor />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
    </v-container>
  </div>
</template>

<script>
import DArticleBanner from '~/components/desktop/shared/DArticleBanner.vue'
import DBorrowEquipment from '~/components/desktop/booking/DBorrowEquipment.vue'
// import DReturnEquipment from '~/components/desktop/booking/DReturnEquipment.vue'
import DBookingStudio from '~/components/desktop/booking/DBookingStudio.vue'
import DBookingAdvisor from '~/components/desktop/booking/DBookingAdvisor.vue'

export default {
  name: 'DBooking',
  components: {
    DArticleBanner,
    DBorrowEquipment,
    // DReturnEquipment,
    DBookingStudio,
    DBookingAdvisor,
  },
  data() {
    return {
      tab: this.$route.query.tab ? parseInt(this.$route.query.tab) - 1 : 0,
    }
  },
  watch: {
    $route() {
      this.tab = this.$route.query.tab ? parseInt(this.$route.query.tab) - 1 : 0
    },
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
  },
}
</script>

<style scoped lang="scss">
.booking-container {
  padding: 30px 0 100px;

  .v-tab {
    border-bottom: 2px solid #b2b2b2;
    font-size: 18px;
  }

  .v-tab--active {
    font-weight: bold;
  }

  .tab-content {
    padding-top: 30px;
  }
}
</style>
