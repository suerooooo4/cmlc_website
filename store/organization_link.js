export const state = () => ({
    path: 'organization_link'
  })
  
  export const actions = {
    get(context) {
      return this.$axios.$get(`${context.state.path}`)
    }
  }