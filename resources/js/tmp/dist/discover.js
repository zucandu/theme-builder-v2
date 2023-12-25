import API_DISCOVER from '@/api/discover'


// initial state
const state = {
    posts: [],
    paginationLinks: [],
    postDetails: {},
    object: {}
}

// getters
const getters = {
}
  
// actions
const actions = {
    
    async tool_post_listing({ commit, rootGetters }, params) {
        commit('SET_POSTS', await API_DISCOVER.tool_post_listing(rootGetters.catalog_listing_params(params)))
    },

    async tool_post_listing_by_category({ commit, rootGetters }, params) {
        commit('SET_POSTS', await API_DISCOVER.tool_post_listing_by_category(rootGetters.catalog_listing_params(params)))
    },

    async tool_post_listing_by_author({ commit, rootGetters }, params) {
        commit('SET_POSTS', await API_BLOG_POST.tool_post_listing_by_author(rootGetters.catalog_listing_params(params)))
    },

    async tool_post_listing_by_keyword({ commit, rootGetters }, params) {
        commit('SET_POSTS', await API_DISCOVER.tool_post_listing_by_keyword(rootGetters.catalog_listing_params(params)))
    },

    async tool_post_get_info({ commit }, slug) {
        commit('SET_POST_DETAILS', await API_DISCOVER.tool_post_get_info(slug))
    },
    
    async tool_post_latest({ commit }) {
        commit('SET_LATEST_POSTS', await API_DISCOVER.tool_post_latest())
    },
}

// mutations is often used to filter results
const mutations = {
    SET_POSTS(state, response) {
        const { paginator, object } = response.data
        state.posts = paginator.data
        state.paginationLinks = paginator.links
        state.object = !_.isEmpty(object) ? object : undefined
    },
    SET_LATEST_POSTS(state, response) {
        state.posts = response.data.posts
    },
    SET_POST_DETAILS(state, response) {
        state.postDetails = response.data.post
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}