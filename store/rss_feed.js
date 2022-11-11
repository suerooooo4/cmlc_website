export const state = () => ({
  path: 'rss_feed'
})

export const actions = {
  get(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}${param}`)
  }
}