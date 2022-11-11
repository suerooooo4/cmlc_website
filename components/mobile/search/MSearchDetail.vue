<template>
  <main class="main">
    <header class="header">
      <span class="header__topbar mt-4">
        <v-btn icon @click.native="$emit('detail_dialog', false)">
          <i class="back"></i>
        </v-btn>
        <a class="link" @click="$emit('detail_dialog', false)"
          >{{ $t('SEARCH.TITLE') }}&nbsp;&nbsp;&nbsp;</a
        >
      </span>
      <hr />
    </header>

    <section class="date">{{ data.created_at }}</section>
    <section class="content">
      <h1 class="content__title">
        {{ $lang(data.article.name_th, data.article.name_en) }}
      </h1>
      <div class="content__image">
        <img :src="`${data.image_path}`" alt="content-image" />
      </div>
      <div
        v-html="$lang(data.article.detail_th, data.article.detail_en)"
        class="content__html"
      ></div>
    </section>
  </main>
</template>

<script>
  export default {
    name: 'MSearchDetail',
    props: ['data'],
    data() {
      return {
        content: '<p>ทดสอบ</p>',
      }
    },
    mounted() {},
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
