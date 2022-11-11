<template>
  <div v-if="poll">
    <h2 class="poll-question">
      {{ $lang(poll.question_th, poll.question_en) }}
    </h2>

    <p class="sub-title">
      {{ $t('POLL.SUB_TITLE') }}
    </p>

    <div class="answer-container">
      <div class="answer-wrapper">
        <div
          class="answer-background"
          :style="`width: ${poll.answer_total.answer_1}%`"
        ></div>

        <div class="answer-info">
          <div class="total-percent">{{ poll.answer_total.answer_1 }} %</div>

          <div class="answer-detail">
            {{ $lang(poll.answer_th_1, poll.answer_en_1) }}
          </div>
        </div>
      </div>

      <div class="answer-wrapper">
        <div
          class="answer-background"
          :style="`width: ${poll.answer_total.answer_2}%`"
        ></div>

        <div class="answer-info">
          <div class="total-percent">{{ poll.answer_total.answer_2 }} %</div>

          <div class="answer-detail">
            {{ $lang(poll.answer_th_2, poll.answer_en_2) }}
          </div>
        </div>
      </div>

      <div class="answer-wrapper">
        <div
          class="answer-background"
          :style="`width: ${poll.answer_total.answer_3}%`"
        ></div>

        <div class="answer-info">
          <div class="total-percent">{{ poll.answer_total.answer_3 }} %</div>

          <div class="answer-detail">
            {{ $lang(poll.answer_th_3, poll.answer_en_3) }}
          </div>
        </div>
      </div>

      <div class="answer-wrapper">
        <div
          class="answer-background"
          :style="`width: ${poll.answer_total.answer_4}%`"
        ></div>

        <div class="answer-info">
          <div class="total-percent">{{ poll.answer_total.answer_4 }} %</div>

          <div class="answer-detail">
            {{ $lang(poll.answer_th_4, poll.answer_en_4) }}
          </div>
        </div>
      </div>

      <div class="total-vote">
        <p>{{ `${poll.answer_total.total_vote} ${$t('POLL.VOTE')}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DPollResult',
  props: ['id'],
  data() {
    return {
      poll: null,
    }
  },
  async mounted() {
    await this.getPoll()
  },
  methods: {
    async getPoll() {
      let res = await this.$store.dispatch('poll/find', this.id)
      this.poll = res.data
    },
  },
}
</script>

<style lang="scss" scoped>
.poll-question {
  font-size: 36px;
  color: #001538;
  text-align: center;
}

.sub-title {
  margin-top: 15px;
  text-align: center;
  color: #b2b2b2;
}

.answer-container {
  width: 80%;
  margin: 50px auto;

  .answer-wrapper {
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    border: solid 1px #f1f0eb;

    .answer-info {
      position: absolute;
      top: 18px;
      left: 25px;
      font-size: 20px;

      .total-percent {
        float: left;
        font-weight: bold;
      }

      .answer-detail {
        margin-left: 100px;
      }
    }

    .answer-background {
      height: 65px;
      background: #f1f0eb;
    }
  }

  .total-vote {
    margin-top: 30px;
  }
}
</style>
