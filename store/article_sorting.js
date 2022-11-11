export const state = () => ({
  path: 'article_sorting'
})

export const actions = {
  pagination(context, payload) {
    let param = this.$setParam(payload)
    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  }
}