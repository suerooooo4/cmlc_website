export const state = () => ({
  path: 'user_poll'
})

export const actions = {
  isDone(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}/is_done`)
  },
  create(context, payload) {
    return this.$axios.$post(`${context.state.path}`, payload)
  }
}