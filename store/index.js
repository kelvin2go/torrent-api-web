
export const state = () => ({
    apiLoading: false,
})

export const mutations = {
    setApiLoading(state, loading) {
        state.apiLoading = loading
    },
}