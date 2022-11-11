export const state = () => ({
  path: 'equipment'
})

export const actions = {
  pagination(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  },
  find(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}`)
  }
}