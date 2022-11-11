export const state = () => ({
  path: 'member_group'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  },
  find(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}`)
  },
  pagination(context, payload) {
    let param = this.$setParam(payload)
    context.commit('setPage', payload.page)
    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  }
}