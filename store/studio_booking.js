export const state = () => ({
  path: 'studio_booking'
})

export const actions = {
  get(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}${param}`)
  },
  total(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}/booking_total${param}`)
  },
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