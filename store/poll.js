export const state = () => ({
  path: 'poll'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  },
  find(context, id) {
    return this.$axios.$get(`${context.state.path}/${id}`)
  }
}