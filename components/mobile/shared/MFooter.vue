<template>
  <v-footer color="primary" dark>
    <v-row class="ma-0">
      <v-col cols="12" class="pa-0">
        <div class="text-center">ผู้เข้าชมเว็บไซต์ {{ view_total }}</div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    name: 'MFooter',

    data() {
      return {
        view_total: 0,
      }
    },

    async mounted() {
      await this.getViewTotal()
    },
    methods: {
      openPage(path, query = null) {
        this.$router.push({ path, query })
      },
      async getViewTotal() {
        let res = await this.$store.dispatch('view_counter/get')
        this.view_total = res.data
      },
    },
  }
</script>

<style scoped lang="scss"></style>
