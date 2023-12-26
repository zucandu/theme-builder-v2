import AUTH from '@/api/AUTH'

// initial state
const state = {}

// getters
const getters = {}

// actions 
const actions = {
    
    async register({commit}, formdata) {
        commit('setToken', await AUTH.apiRegister(formdata))
    },

    async login({ commit }, formdata) {
        commit('setToken', await AUTH.apiLogin(formdata))
    },

    logout({ commit }) {
        commit('setToken')
        commit('customerResetProfile')
    }
}

// mutations is often used to filter results
const mutations = {
    setToken : (state, response) => {response === undefined ? localStorage.removeItem('jwt_customer') : localStorage.setItem('jwt_customer', response.data.token)}
};

export default {
    state,
    getters,
    actions,
    mutations
}