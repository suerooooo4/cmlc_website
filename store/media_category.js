export const state = () => ({
  path: 'media_category'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  }
}