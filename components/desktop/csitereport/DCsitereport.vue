<template>
  <div>
    <v-container>
      <div class="header">
        <h2 class="csitereport-title">
          {{ $t('CSITEREPORT.TITLE') }}
        </h2>
      </div>

      <div class="content-container">
        <v-row>
          <v-col>
            <iframe
              src="https://www.csitereport.com/explore"
              width="100%"
              height="600"
              frameborder="0"
            ></iframe>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'DCsitereport',
}
</script>

<style lang="scss" scoped>
.header {
  margin: 50px 0 30px;

  .csitereport-title {
    text-align: center;
    font-size: 36px;
    color: #001538;
  }
}

.content-container {
  padding-bottom: 100px;

  iframe {
    background: #e8e8e8;
  }
}
</style>
