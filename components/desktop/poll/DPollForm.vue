<template>
  <div v-if="poll">
    <h2 class="poll-question">
      {{ $lang(poll.question_th, poll.question_en) }}
    </h2>

    <p class="sub-title">
      {{ $t('POLL.SUB_TITLE') }}
    </p>

    <div class="answer-container">
      <v-btn
        @click="submit(1)"
        outlined
        large
        block
        depressed
        class="btn-answer"
      >
        {{ $lang(poll.answer_th_1, poll.answer_en_1) }}
      </v-btn>

      <v-btn
        @click="submit(2)"
        outlined
        large
        block
        depressed
        class="btn-answer"
      >
        {{ $lang(poll.answer_th_2, poll.answer_en_2) }}
      </v-btn>

      <v-btn
        v-if="poll.answer_th_3 && poll.answer_en_3"
        @click="submit(3)"
        outlined
        large
        block
        depressed
        class="btn-answer"
      >
        {{ $lang(poll.answer_th_3, poll.answer_en_3) }}
      </v-btn>

      <v-btn
        v-if="poll.answer_th_4 && poll.answer_en_4"
        @click="submit(4)"
        outlined
        large
        block
        depressed
        class="btn-answer"
      >
        {{ $lang(poll.answer_th_4, poll.answer_en_4) }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'DPollForm',
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
    async submit(answerNumber) {
      let res = await this.$store.dispatch('user_poll/create', {
        poll_id: this.id,
        poll_answer_number: answerNumber,
      })

      if (res.status == 'success') {
        Swal.fire({
          title: this.$t('SHARED.DIALOG.SUCCESS'),
          text: this.$t(`SHARED.RESPONSE_MSG.SUCCESS_TO_SAVE_DATA`),
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
        })
        this.$emit('set_done_poll')
      } else {
        Swal.fire({
          title: this.$t('SHARED.DIALOG.ERROR'),
          text: this.$t(`SHARED.RESPONSE_MSG.${res.error}`),
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: this.$t('SHARED.DIALOG.CLOSE'),
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.poll-question {
  font-size: 30px;
  line-height: 36px;
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

  .btn-answer {
    margin-bottom: 20px;
    padding: 30px;
  }
}
</style>
