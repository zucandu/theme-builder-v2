
export default {

    /**
     * Listing products from category page
     */
    catalog_listing_by_category(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/theme-builder/cate-listing-${params.slug}${queryStr}`)
    },

    /**
     * Listing products from manufacturer page
     */
    catalog_listing_by_manufacturer(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/theme-builder/manu-listing-${params.slug}${queryStr}`)
    },

    /**
     * Listing products from search page
     */
    catalog_listing_by_keyword(params) {
        const queryStr = params.querystr ? `?${params.querystr}` : ``
        return axios.get(`/api/theme-builder/search-listing-${params.keyword}${queryStr}`)
    },
    
}