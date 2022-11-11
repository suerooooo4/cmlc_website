<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click.native="$emit('detail_dialog', false)">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="$emit('detail_dialog', false)"
          >{{ $t('MEDIA_GLOBAL.TITLE') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>
    <div v-if="media_global">
      <section class="date">{{ media_global.created_at }}</section>
      <section class="content">
        <h1 class="content__title">
          {{ $lang(media_global.name_th, media_global.name_en) }}
        </h1>
        <div class="content__image">
          <img :src="`${image_url}${media_global.image}`" alt="content-image" />
        </div>
        <div
          v-html="$lang(media_global.detail_th, media_global.detail_en)"
          class="content__html"
        ></div>
      </section>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MMediaGlobalDetail',
  props: ['id'],
  watch: {
    id: {
      async handler(val, oldVal) {
        await this.getMedia()
        await this.updateTotalView()
      },
      deep: true,
    },
  },
  data() {
    return {
      image_url: process.env.image_url,
      media_global: null,
    }
  },
  async mounted() {
    await this.getMedia()
    await this.updateTotalView()
  },
  methods: {
    async getMedia() {
      let res = await this.$store.dispatch('media_global/find', this.id)
      this.media_global = res.data
    },
    async updateTotalView() {
      await this.$store.dispatch('media_global/updateTotalView', this.id)
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
