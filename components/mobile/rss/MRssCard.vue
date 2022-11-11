<template>
  <div>
    <a :href="detail_path" target="_blank" class="article-link">
      <div class="article-container">
        <img :src="data.image" class="article-image" alt="article-image" />

        <div class="article-info">
          <p class="article-date">
            {{ data.created_at }}
          </p>

          <p class="article-topic">
            {{ $lang(data.name_th, data.name_en) }}
          </p>

          <p class="article-detail">
            {{ $lang($stripHtml(data.detail_th), $stripHtml(data.detail_en)) }}
          </p>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'MRssCard',
  props: ['data', 'detail_path'],
}
</script>

<style scoped lang="scss">
.article-link {
  text-decoration: none;
}

.article-container {
  cursor: pointer;
  background: #f8f7f6;

  .article-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
    object-position: center;
  }

  .article-info {
    padding: 10px 15px;

    .article-date,
    .article-topic,
    .article-detail {
      margin-bottom: 5px;
    }

    .article-date,
    .article-detail {
      font-size: 13px;
      color: #b2b2b2;
    }

    .article-topic {
      font-weight: bold;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .article-detail {
      min-height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
