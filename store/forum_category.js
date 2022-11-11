export const state = () => ({
  path: 'forum_category'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  }
}
