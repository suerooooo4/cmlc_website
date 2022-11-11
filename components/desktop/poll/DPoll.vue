<template>
  <div>
    <v-container>
      <div class="header">
        <h2 class="poll-title">
          {{ $t('POLL.TITLE') }}
        </h2>
      </div>

      <div class="poll-container">
        <div v-for="poll of poll_list" :key="poll.id" class="poll-list">
          <a @click="openPage('/poll/detail', { id: poll.id })" class="poll">
            {{ $lang(poll.question_th, poll.question_en) }}
          </a>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DPoll',
  data() {
    return {
      poll_list: [],
    }
  },
  async mounted() {
    this.$auth()
    await this.getPoll()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getPoll() {
      let res = await this.$store.dispatch('poll/get')
      this.poll_list = res.data
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  margin: 50px 0 0;

  .poll-title {
    font-size: 36px;
    color: #001538;
    text-align: center;
  }
}

.poll-container {
  width: 80%;
  margin: 50px auto 100px;

  .poll-list {
    margin-bottom: 15px;

    a {
      display: block;
      padding: 15px;
      background: #f1f0eb;
      border-radius: 10px;
    }
  }
}
</style>
