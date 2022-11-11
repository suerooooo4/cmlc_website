export const state = () => ({
  path: 'equipment_category'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  }
}