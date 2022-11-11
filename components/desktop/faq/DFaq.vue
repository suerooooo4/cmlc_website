<template>
  <div>
    <v-container>
      <div class="expansion">
        <div class="expansion__header">{{ $t('FAQ.TITLE') }}</div>
        <div class="expansion__content">
          <v-expansion-panels
            v-for="faq of faq_list"
            v-model="faq.status"
            :key="faq.id"
            accordion
            flat
          >
            <v-expansion-panel>
              <v-expansion-panel-header class="ps-0 pe-0" disable-icon-rotate>
                <template v-slot:actions>
                  <v-icon v-if="faq.status != 0" color="blue" large
                    >mdi-plus</v-icon
                  >
                  <v-icon v-else color="blue" large>mdi-minus</v-icon>
                </template>
                <span class="header">{{
                  $lang(faq.question_th, faq.question_en)
                }}</span>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                {{ $lang(faq.answer_th, faq.answer_en) }}
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DFaq',
  data() {
    return {
      faq_list: [],
    }
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    async getData() {
      let res = await this.$store.dispatch('faq/get')
      this.faq_list = res.data
    },
  },
}
</script>

<style scoped lang="scss">
.expansion {
  margin: 100px 0;
  padding: 0 15%;
  border-radius: 6px 6px 0px 0px;
  overflow: hidden; // clear-fix

  &__header {
    padding: 30px 0;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 36px;
    line-height: 20px;
    background-color: #001538;
  }

  &__content {
    .icon {
      order: 0;
    }

    .header {
      order: 1;
      line-height: 1.5;
      color: #001538;
      padding-left: 5px;
    }

    .v-expansion-panel-content {
      color: #696868;
      font-size: 12px;
    }

    .v-expansion-panel {
      border-bottom: 2px solid #a2a2a2;
      border-radius: 0;
    }
  }
}
</style>
