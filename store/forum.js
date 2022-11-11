export const state = () => ({
  path: 'forum',
  page: 1,
})

export const actions = {
  pagination(context, payload) {
    let param = this.$setParam(payload)
    context.commit('setPage', payload.page)

    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  },
  history(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}_history${param}`)
  },
  find(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}`)
  },
  create(context, payload) {
    return this.$axios.$post(`${context.state.path}`, payload)
  },
  update(context, payload, id) {
    return this.$axios.$put(`${context.state.path}/${payload.id}`, payload)
  },
  delete(context, id) {
    return this.$axios.$delete(`${context.state.path}/${id}`)
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
