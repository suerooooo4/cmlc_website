<template>
  <main>
    <MArticleBanner
      :title="$t('BOOKING.TITLE')"
      :subtitle="$t('BOOKING.SUBTITLE')"
      :image="'/images/banner-booking.png'"
    />
    <div class="booking-mobile-container">
      <v-tabs v-model="tab" fixed-tabs>
        <v-tab @click="openPage('/booking', { tab: 1 })">
          <h3>{{ $t('BOOKING.EQUIPMENT_BORROWING.TITLE') }}</h3>
        </v-tab>

        <!-- <v-tab @click="openPage('/booking', { tab: 2 })">
          {{ $t('BOOKING.EQUIPMENT_RETURN.TITLE') }}
        </v-tab> -->

        <v-tab @click="openPage('/booking', { tab: 2 })">
          <h3>{{ $t('BOOKING.STUDIO_BOOKING.TITLE') }}</h3>
        </v-tab>

        <v-tab @click="openPage('/booking', { tab: 3 })">
          <h3>{{ $t('BOOKING.ADVISOR_BOOKING.TITLE') }}</h3>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <div class="tab-content">
            <MBorrowEquipment />
          </div>
        </v-tab-item>

        <!-- <v-tab-item>
          <div class="tab-content">
            <MReturnEquipment />
          </div>
        </v-tab-item> -->

        <v-tab-item>
          <div class="tab-content">
            <MBookingStudio />
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="tab-content">
            <MBookingAdvisor />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </main>
</template>

<script>
import MArticleBanner from '~/components/mobile/shared/MArticleBanner.vue'
import MBorrowEquipment from '~/components/mobile/booking/MBorrowEquipment.vue'
import MReturnEquipment from '~/components/mobile/booking/MReturnEquipment.vue'
import MBookingStudio from '~/components/mobile/booking/MBookingStudio.vue'
import MBookingAdvisor from '~/components/mobile/booking/MBookingAdvisor.vue'
export default {
  name: 'MBooking',
  components: {
    MArticleBanner,
    MBorrowEquipment,
    MReturnEquipment,
    MBookingStudio,
    MBookingAdvisor,
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
.booking-mobile-container {
  padding: 15px 0;
  margin-left: -12px;
  margin-right: -12px;
  .v-tab {
    border-bottom: 2px solid #b2b2b2;
    font-size: 14px;
    white-space: inherit;
  }

  .v-tab--active {
    font-weight: bold;
  }

  .tab-content {
    padding-top: 30px;
  }
}
</style>

<style lang="css">
.booking-mobile-container .v-tabs .v-slide-group__prev {
  display: none !important;
}
</style>
