export const state = () => ({
  path: 'view_counter'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}/view_total`)
  },
  count(context) {
    return this.$axios.$put(`${context.state.path}`)
  }
}