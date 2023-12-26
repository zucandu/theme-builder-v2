import AUTH from '@/api/AUTH'

// initial state
const state = {}

// getters
const getters = {}

// actions 
const actions = {
    
    async account_auth_register({commit}, formdata) {
        commit('SET_CUSTOMER_TOKEN', await AUTH.account_auth_register(formdata))
    },

    async account_auth_login({ commit }, formdata) {
        commit('SET_CUSTOMER_TOKEN', await AUTH.account_auth_login(formdata))
    },

    logout({ commit }) {
        commit('SET_CUSTOMER_TOKEN')
        commit('ACCOUNT_CUSTOMER_RESET')
    }
}

// mutations is often used to filter results
const mutations = {
    SET_CUSTOMER_TOKEN : (state, response) => {response === undefined ? localStorage.removeItem('jwt_customer') : localStorage.setItem('jwt_customer', response.data.token)}
};

export default {
    state,
    getters,
    actions,
    mutations
}