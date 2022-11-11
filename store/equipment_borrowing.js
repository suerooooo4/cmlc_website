export const state = () => ({
  path: 'equipment_borrowing'
})

export const actions = {
  history(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}/history${param}`)
  },
  create(context, payload) {
    return this.$axios.$post(`${context.state.path}`, payload)
  },
  unbooking(context, id) {
    return this.$axios.$put(`${context.state.path}/${id}/unbooking`)
  }
}