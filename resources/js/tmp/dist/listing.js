import API_LISTING from '@/api/listing'


// initial state
const state = {
    products: [],
    paginationLinks: [],
    paginationShowing: {},
    filters: {},
    object: {}
}

// getters
const getters = {
    catalog_listing_params: () => (params) => {
        return { 
            slug: params.slug, 
            keyword: params.keyword, 
            querystr: Object.keys(params.objParams).filter(key => !_.isEmpty(key)).map(key => `${key}=${params.objParams[key]}`).join('&')
        }
    }
}
  
// actions
const actions = {

    /**
     * 
     * @param {Object} params An object of the category slug and query string 
     */
    async catalog_listing_by_category({ commit, getters }, params) {
        commit('SET_LISTING_PRODUCTS', await API_LISTING.catalog_listing_by_category(getters.catalog_listing_params(params)))
    },

    /**
     * 
     * @param {Object} params An object of the manufacturer slug and query string 
     */
    async catalog_listing_by_manufacturer({ commit, getters }, params) {
        commit('SET_LISTING_PRODUCTS', await API_LISTING.catalog_listing_by_manufacturer(getters.catalog_listing_params(params)))
    },

    /**
     * 
     * @param {Object} params An object of the keyword and query string 
     */
    async catalog_listing_by_keyword({ commit, getters }, params) {
        commit('SET_LISTING_PRODUCTS', await API_LISTING.catalog_listing_by_keyword(getters.catalog_listing_params(params)))
    },
}

// mutations is often used to filter results
const mutations = {
    SET_LISTING_PRODUCTS(state, response) {
        const { paginator, filters, object } = response.data
        state.products = paginator.data
        state.paginationLinks = paginator.links
        state.paginationShowing = { from: paginator.from, to: paginator.to, total: paginator.total }
        state.filters = filters
        state.object = object
    },
    resetListing(state) {
        state.products = [], state.paginationLinks = []
        state.filters = {}, state.object = {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}