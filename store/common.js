export const state = () => ({
  device_type: 'desktop',
  platform_ready: false
})

export const mutations = {
  setDeviceType(state, payload) {
    state.device_type = payload;
  },
  setPlatformReady(state) {
    state.platform_ready = true
  }
}