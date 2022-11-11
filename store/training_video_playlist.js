export const state = () => ({
    path: 'training_video_playlist',
    page: 1
  })
  
  export const actions = {
    pagination(context, payload) {
      let param = this.$setParam(payload)
      context.commit('setPage', payload.page)
  
      return this.$axios.$get(`${context.state.path}/pagination${param}`)
    },
  }
  
  export const mutations = {
    setPage(state, page) {
      state.page = page
    }
  }