export const state = () => ({
  path: 'media_playlist',
  page: 1,
  activeMenu: 0,
  mediaCategoryId: '',
})

export const actions = {
  pagination(context, payload) {
    let param = this.$setParam(payload)
    context.commit('setPage', payload.page)

    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  },

  playlist_title(context, payload) {
    let param = this.$setParam(payload)
    context.commit('setPage', payload.page)

    return this.$axios.$get(`${context.state.path}/playlist_title${param}`)
  },
}

export const mutations = {
  setPage(state, page) {
    state.page = page
  },

  setActiveMenu(state, activeMenu) {
    state.activeMenu = activeMenu
  },

  setMediaCategoryId(state, mediaCategoryId) {
    state.mediaCategoryId = mediaCategoryId
  },
}
