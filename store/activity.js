export const state = () => ({
  path: 'activity',
  page: 1,
})

export const actions = {
  pagination(context, payload) {
    let param = this.$setParam(payload)
    context.commit('setPage', payload.page)

    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  },
  find(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}`)
  },
  updateTotalView(context, id) {
    return this.$axios.$put(`${context.state.path}/${id}/view`)
  }
}

export const mutations = {
  setPage(state, page) {
    state.page = page
  }
}