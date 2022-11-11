<template>
  <div>
    <v-container>
      <section class="content-container">
        <v-row>
          <v-col cols="12">
            <h2 class="section-title" @click="openPage('/poll')">
              <span>
                <i class="fa fa-chevron-left"></i>
                {{ $t('POLL.TITLE_DETAIL') }}
              </span>
            </h2>
          </v-col>
        </v-row>

        <v-row v-if="user_poll">
          <v-col>
            <div v-if="!is_done">
              <MPollForm
                v-if="render_form"
                @set_done_poll="donePoll()"
                :id="id"
              />
            </div>

            <div v-else>
              <MPollResult v-if="render_result" :id="id" />
            </div>
          </v-col>
        </v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import MPollForm from '~/components/mobile/poll/MPollForm.vue'
import MPollResult from '~/components/mobile/poll/MPollResult.vue'
export default {
  name: 'MPollDetail',
  components: {
    MPollForm,
    MPollResult,
  },
  data() {
    return {
      id: this.$route.query.id,
      is_done: null,
      user_poll: null,
      render_form: true,
      render_result: true,
    }
  },
  async mounted() {
    this.$auth()
    await this.isDone()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async isDone() {
      let res = await this.$store.dispatch('user_poll/isDone', this.id)
      this.is_done = res.data
      this.user_poll = true

      if (!this.is_done) {
        this.render_form = false
        this.$nextTick(() => {
          this.render_form = true
        })
      } else {
        this.render_result = false
        this.$nextTick(() => {
          this.render_result = true
        })
      }
    },
    donePoll() {
      this.is_done = true
    },
  },
}
</script>

<style lang="scss" scoped>
.content-container {
  padding: 25px 0 150px;

  .section-title {
    font-size: 18px;
  }
}
</style>
