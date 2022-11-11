<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon   @click="openPage('/training/')">
          <i class="back"></i>
        </v-btn>
        <a class="link"  @click=" openPage('/training/')"
          >{{ $t('TRAINING.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>
    <div v-if="training">
      <section class="date">{{ training.created_at }}</section>
      <section class="content">
        <h1 class="content__title">
          {{ $lang(training.name_th, training.name_en) }}
        </h1>
        <img
          :src="`${image_url}${training.image}`"
          alt="content-image"
          class="content__image"
        />

        <div
          v-html="$lang(training.detail_th, training.detail_en)"
          class="content__html"
        ></div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MTrainingDetail',
 /*  props: ['id'], */
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getTraining()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      previous_page: this.$store.state.training.page,
      type: this.$route.query.type,
      training: null,
      id:this.$route.query.id,
    }
  },
  async mounted() {
    await this.getTraining()
    await this.updateTotalView()
  },
  methods: {
    openPage(path, query = null) {
      this.$router.push({ path, query })
    },
    async getTraining() {
      let res = await this.$store.dispatch('training/find', this.id)
      this.training = res.data
    },
    async updateTotalView(id) {
      await this.$store.dispatch('training/updateTotalView', this.id)
    },
  },
}
</script>

<style scoped lang="scss">
.main {
  padding: 12px;
}
.header {
  &__topbar {
    color: #001538;
    position: relative;

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 6px;
      border-radius: 6px;
      background: #000;
      position: absolute;
      bottom: -11px;
      left: 0;
    }
    .link {
      color: #001538;
    }
  }
  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid #ccc;
    padding: 0;
  }
}
.date {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 1rem;
}

.content {
  &__title {
    font-size: 22px;
    color: #001538;
  }
  &__image {
    width: 100%;
    margin-bottom: 15px;
  }
  &__html {
    color: #001538;
  }
}

.recommend {
  margin-left: -12px;
  padding-left: 12px;
  width: 100vw;
  background: #f8f7f6;

  &__title {
    padding-top: 12px;
    font-size: 22px;
    color: #001538;
  }
}
</style>
