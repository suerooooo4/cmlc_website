export const state = () => ({
  path: 'user',
  user_id: null
})

export const actions = {
  login(context, payload) {
    return this.$axios.$post(`${context.state.path}/login`, payload)
  },
  register(context, payload) {
    return this.$axios.$post(`${context.state.path}/register`, payload)
  },
  find(context) {
    return this.$axios.$get(`${context.state.path}/profile`)
  },
  update(context, payload) {
    return this.$axios.$put(`${context.state.path}/profile`, payload)
  },
  updateImage(context, payload) {
    return this.$axios.$post(`${context.state.path}/profile_image`, payload)
  },
  changePassword(context, payload) {
    return this.$axios.$put(`${context.state.path}/change_password`, payload)
  },
  logout(context) {
    return this.$axios.$post(`${context.state.path}/logout`)
  },
}

export const mutations = {
  setData(state, payload) {
    this.$axios.setToken(payload.accessToken.token, "Bearer");
    state.user_id = payload.user.id;
    localStorage.setItem("token", payload.accessToken.token);
    localStorage.setItem("user_id", payload.user.id);
  },
  setDataFromStorage(state) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    this.$axios.setToken(token, "Bearer");
    state.user_id = userId
  },
  clearData(state) {
    this.$axios.setToken('')
    state.user_id = null
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }
};
