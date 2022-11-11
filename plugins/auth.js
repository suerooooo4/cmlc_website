export default (context, inject) => {
  inject('auth', () => {
    if (!context.store.state.user.user_id) {
      return context.redirect('/')
    }
  })
}