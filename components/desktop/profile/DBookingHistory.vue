<template>
  <div class="booking-container">
    <h2 class="booking-title">
      {{ $t('PROFILE.TAB.BOOKING.TITLE') }}
    </h2>

    <section class="content-container">
      <v-tabs v-model="tab" fixed-tabs slider-size="4">
        <v-tab>
          {{ $t('BOOKING.EQUIPMENT_BORROWING.TITLE') }}
        </v-tab>

        <v-tab>
          {{ $t('BOOKING.STUDIO_BOOKING.TITLE') }}
        </v-tab>

        <v-tab>
          {{ $t('BOOKING.ADVISOR_BOOKING.TITLE') }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <div class="tab-content">
            <DHistoryEquipment />
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="tab-content">
            <DHistoryStudio />
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="tab-content">
            <DHistoryAdvisor />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </section>
  </div>
</template>

<script>
import DHistoryEquipment from '~/components/desktop/profile/DHistoryEquipment.vue'
import DHistoryStudio from '~/components/desktop/profile/DHistoryStudio.vue'
import DHistoryAdvisor from '~/components/desktop/profile/DHistoryAdvisor.vue'

export default {
  name: 'DBookingHistory',
  components: {
    DHistoryEquipment,
    DHistoryStudio,
    DHistoryAdvisor,
  },
  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<style scoped lang="scss">
.booking-container {
  .booking-title {
    padding-bottom: 15px;
  }

  .content-container {
    margin-top: 15px;

    .v-tab {
      background: #f8f7f6;
      border-bottom: 2px solid #b2b2b2;
      font-size: 18px;
    }

    .v-tab--active {
      font-weight: bold;
    }

    .tab-content {
      background: #f8f7f6;
      padding-top: 15px;
    }
  }
}
</style>
