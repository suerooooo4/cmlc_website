export const state = () => ({
  path: 'member_group_member'
})

export const actions = {
  pagination(context, payload) {
    let param = this.$setParam(payload)

    return this.$axios.$get(`${context.state.path}/pagination${param}`)
  },
  get(context, id) {
    return this.$axios.$get(`${context.state.path}?member_group_id=${id}`)
  }
}