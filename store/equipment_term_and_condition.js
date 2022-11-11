export const state = () => ({
  path: 'equipment_term_and_condition'
})

export const actions = {
  find(context) {
    return this.$axios.$get(`${context.state.path}`)
  },
  create(context) {
    return this.$axios.$post(`${context.state.path}`)
  }
}