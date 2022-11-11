export const state = () => ({
  path: 'equipment_review'
})

export const actions = {
  get(context, equipmentId) {
    return this.$axios.$get(`${context.state.path}/equipment/${equipmentId}`)
  },
  permission(context, equipmentId) {
    return this.$axios.$get(`${context.state.path}/permission/${equipmentId}`)
  },
  create(context, payload) {
    return this.$axios.$post(`${context.state.path}`, payload)
  }
}