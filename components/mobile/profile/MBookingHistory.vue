<template>
  <div>
    <section class="content-mobile-container">
      <v-tabs v-model="tab" fixed-tabs slider-size="4">
        <v-tab @click="random = (Math.random() + 1).toString(36).substring(7)">
          {{ $t('BOOKING.EQUIPMENT_BORROWING.TITLE') }}
        </v-tab>

        <v-tab @click="random = (Math.random() + 1).toString(36).substring(7)">
          {{ $t('BOOKING.STUDIO_BOOKING.TITLE') }}
        </v-tab>

        <v-tab @click="random = (Math.random() + 1).toString(36).substring(7)">
          {{ $t('BOOKING.ADVISOR_BOOKING.TITLE') }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <div class="tab-content">
            <MHistoryEquipment :random="random" />
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="tab-content">
            <MHistoryStudio :random="random" />
          </div>
        </v-tab-item>

        <v-tab-item>
          <div class="tab-content">
            <MHistoryAdvisor :random="random" />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </section>
  </div>
</template>

<script>
import MHistoryAdvisor from '~/components/mobile/profile/MHistoryAdvisor.vue'
import MHistoryEquipment from '~/components/mobile/profile/MHistoryEquipment.vue'
import MHistoryStudio from '~/components/mobile/profile/MHistoryStudio.vue'

export default {
  name: 'MBookingHistory',
  components: {
    MHistoryAdvisor,
    MHistoryEquipment,
    MHistoryStudio,
  },
  data() {
    return {
      tab: 0,
      random: (Math.random() + 1).toString(36).substring(7),
    }
  },
}
</script>

<style scoped lang="scss">
.content-mobile-container {
  .v-tab {
    border-bottom: 2px solid #b2b2b2;
    font-size: 14px;
    white-space: inherit;
  }

  .v-tab--active {
    font-weight: bold;
  }
  .tab-content {
    overflow: auto;
  }
}
</style>

<style lang="css">
.content-mobile-container .v-tabs .v-slide-group__prev {
  display: none !important;
}
</style>
