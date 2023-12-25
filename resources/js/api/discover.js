
export default {

    tool_post_listing(params) {
        return axios.get(`/api/theme-builder/discover-listing/${params.querystr ? `?${params.querystr}` : ``}`)
    },
    
    tool_post_listing_by_category(params) {
        return axios.get(`/api/theme-builder/discover-category/${params.slug}${params.querystr ? `?${params.querystr}` : ``}`)
    },

    tool_post_listing_by_keyword(params) {
        return axios.get(`/api/theme-builder/discover-search${params.querystr ? `?${params.querystr}` : ``}`)
    },

    postDetails(slug) {
        return axios.get(`/api/theme-builder/discover-${slug}`)
    },

    tool_post_latest() {
        return axios.get('/api/theme-builder/discover-latest')
    },
}