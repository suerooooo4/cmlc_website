<template>
  <div>
    <div class="member-card hover-card">
      <img
        :src="`${image_url}${data.image}`"
        class="member-image"
        alt="member-image"
      />

      <div class="member-info">
        <p class="member-name">
          {{ $lang(data.fullname_th, data.fullname_en) }}
        </p>

        <p class="member-career">
          {{ $lang(data.career_th, data.career_en) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DMemberGroupMemberCard',
    props: ['data'],
    data() {
      return {
        image_url: process.env.image_url,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .member-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 4px 18px rgb(0 0 0 / 25%);

    .member-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      object-position: center;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
    }

    .member-info {
      padding: 10px 15px;

      .member-name,
      .member-career {
        margin-bottom: 5px;
        text-align: center;
      }

      .member-name {
        font-weight: bold;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      .member-career {
        font-size: 14px;
        color: #b2b2b2;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
</style>
