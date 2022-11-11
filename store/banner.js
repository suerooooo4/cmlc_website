export const state = () => ({
  path: 'banner'
})

export const actions = {
  get(context) {
    return this.$axios.$get(`${context.state.path}`)
  }
}