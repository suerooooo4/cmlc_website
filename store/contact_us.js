export const state = () => ({
  path: 'contact_us'
})

export const actions = {
  send(context, param) {
    return this.$axios.$post(`${context.state.path}`, param)
  }
}