import API_NAV from '@/api/navigation'

// initial state
const state = {
    tool_menu_get_info: {}
}

// getters
const getters = {}
  
// actions
const actions = {
    async tool_menu_get_info({commit}, key) {
        commit('SET_MENU_DETAILS', await API_NAV.tool_menu_get_info(key))
    },
}

// mutations is often used to filter results
const mutations = {
    SET_MENU_DETAILS: (state, response) => state.tool_menu_get_info = { ...state.tool_menu_get_info, [response.data.key]: response.data.menu }
}

export default {
    state,
    getters,
    actions,
    mutations
}