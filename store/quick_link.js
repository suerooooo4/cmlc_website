export const state = () => ({
  path: 'quick_link'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  }
}