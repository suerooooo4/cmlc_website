<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click="openPage('/activity', { page: previous_page })">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="openPage('/activity', { page: previous_page })"
          >{{ $t('ACTIVITY.HEADER') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <div v-if="activity">
      <section class="date">{{ activity.created_at }}</section>
      <section class="content">
        <h1 class="content__title">
          {{ $lang(activity.name_th, activity.name_en) }}
        </h1>
        <div class="content__image">
          <img :src="`${image_url}${activity.image}`" alt="content-image" />
        </div>
        <div
          v-html="$lang(activity.detail_th, activity.detail_en)"
          class="content__html"
        ></div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MActivityDetail',
/*   props: ['id'], */
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getActivity()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      previous_page: this.$store.state.activity.page,
      activity: null,
      id:this.$route.query.id,
    }
  },
  async mounted() {
    await this.getActivity()
    await this.updateTotalView()
  },
  methods: {
     openPage(path, query = null) {
      this.$router.push({ path, query })
    }, 
    async getActivity() {
      let res = await this.$store.dispatch('activity/find', this.id)
      this.activity = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('activity/updateTotalView', this.id)
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
  &__image > img {
    max-width: 100%;
    object-fit: cover;
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
