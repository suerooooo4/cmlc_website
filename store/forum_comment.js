export const state = () => ({
  path: 'forum_comment'
})

export const actions = {
  get(context, param) {
    return this.$axios.$get(`${context.state.path}${param}`)
  },
  create(context, payload) {
    return this.$axios.$post(`${context.state.path}`, payload)
  }
}