export const state = () => ({
  path: 'faq'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  }
}