export const state = () => ({
  path: 'forum_like'
})

export const actions = {
  create(context, payload) {
    return this.$axios.$post(`${context.state.path}`, payload)
  },
  delete(context, id) {
    return this.$axios.$delete(`${context.state.path}/${id}`)
  }
}