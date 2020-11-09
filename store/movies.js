export const state = () => ({
    pop: {},
    latest: {},
})

const API_URL = process.env.API_URL;
export const actions = {
    async getPop({ commit }, params) {
        try {
            const { data } = await this.$axios.get(`${API_URL}/ranked-movies/pop`)
            console.log("popMovie", data)
            if (data) {
                const popMovies = data.list.map((x) => {
                    return {
                        ...x,
                        cover: `${process.env.TMDB_IMG_BASE}w500${x.backdrop_path}`,
                        poster: `${process.env.TMDB_IMG_BASE}w342${x.poster_path}`,
                    }
                })
                commit('SET_POPMOVIES', popMovies)
            }
        } catch (err) {
            console.log(err)
        }
    },
    async getLatest({ commit }, params) {
        try {
            const { data } = await this.$axios.get(`${API_URL}/torrent/lastest`)
            console.log("lastest", data)
            commit('SET_LATEST_MOVIES', data)
        } catch (err) {
            console.log(err)
        }
    }
}

export const mutations = {
    SET_POPMOVIES(state, movies) {
        state.pop = movies
    },
    SET_LATEST_MOVIES(state, movies) {
        state.latest = movies
    },
}