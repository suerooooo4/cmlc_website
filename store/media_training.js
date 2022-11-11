export const state = () => ({
  path: 'media',
  page: 1
})

export const actions = {
  pagination(context, payload) {
    payload.type = 2
    let param = this.$setParam(payload)
    context.commit('setPage', payload.page)

    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  },
  find(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}`)
  },
  updateTotalView(context, id) {
    return this.$axios.$put(`${context.state.path}/${id}/view`)
  },
  updateTotalDownload(context, id) {
    return this.$axios.$put(`${context.state.path}/${id}/download`)
  }
}

export const mutations = {
  setPage(state, page) {
    state.page = page
  }
}
