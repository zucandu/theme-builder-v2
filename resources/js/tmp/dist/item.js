import API_ITEM from '@/api/item'


// initial state
const state = {
    products: [],
    catalog_product_widget: {
        new: [],
        sale: [],
        featured: []
    },
    catalog_product_get_info: {},
    reviews: []
}

// getters
const getters = {

    /**
     * Calculate the base price with tax for product
     * @param {price} float 
     * @param {taxAmount} float
     */
     catalog_product_base_price_with_tax: () => () => 0,

    /**
     * Calculate price for product
     * @param {item} object
     */
     catalog_product_calc: () => (item) => ({
        retail: item.price,
        sale: +item.sale_price > 0 ? item.sale_price : undefined,
        final: +item.sale_price > 0 ? item.sale_price : item.price,
        tax: 0
    }),
    catalog_product_display_price: () => (price, qty) => {
        const __price = price*qty
        return __price ? __price.toFixed(2) : '___'
    },
    catalog_product_tax_rate_amount: () => () => 0,
    catalog_product_tax_rate: () => () => 0,
    catalog_product_price_format: () => (price) => price,
    catalog_product_price: (state, getters) => (item, qty = 1) => {
        const calculated = getters.catalog_product_calc(item)
        return {
            base: getters.catalog_product_display_price(calculated.retail, qty),
            sale: getters.catalog_product_display_price(calculated.sale, qty)
        }
    },
    catalog_product_get_child: () => (product, selectedAtt) => {
        if(product.id === 38) {
            return product.children[+selectedAtt[1]-1]
        }
    },
    catalog_product_display_attributes: () => ([]),
    catalog_product_variants: (state) => {
        return state.catalog_product_get_info.id === 38 ? [ 
            { 
                "id": 1, 
                "translations": [ { "name": "Color", "locale": "en" } ], 
                "values": [ 
                    { 
                        "id": 1, 
                        "attribute_option_id": 1, 
                        "filterable": 1, "sort": 0, 
                        "translations": [ { "name": "Grey", "locale": "en" } ], 
                        "vid": 1 
                    }, 
                    { 
                        "id": 2, 
                        "attribute_option_id": 1, 
                        "filterable": 1, 
                        "sort": 0, 
                        "translations": [ { "name": "Brown", "locale": "en" } ], 
                        "vid": 2 
                    }, 
                    { 
                        "id": 3, 
                        "attribute_option_id": 1, 
                        "filterable": 1, 
                        "sort": 0, 
                        "translations": [ { "name": "Pink", "locale": "en" } ], 
                        "vid": 3 
                    } 
                ], 
                "sort": 0 
            } 
        ] : undefined
    },
    catalog_product_attributes_read_only: (state) => {
        return state.catalog_product_get_info.id === 38 ? {
            "8": {
                "translations": [
                    {
                        "name": "Features",
                        "locale": "en"
                    }
                ],
                "values": [
                    {
                        "id": 47,
                        "attribute_option_id": 8,
                        "filterable": 1,
                        "sort": 0,
                        "translations": [
                            {
                                "name": "LED Display",
                                "locale": "en"
                            }
                        ],
                        "vid": 47
                    },
                    {
                        "id": 49,
                        "attribute_option_id": 8,
                        "filterable": 1,
                        "sort": 0,
                        "translations": [
                            {
                                "name": "Touch",
                                "locale": "en"
                            }
                        ],
                        "vid": 49
                    }
                ]
            },
            "9": {
                "translations": [
                    {
                        "name": "Application",
                        "locale": "en"
                    }
                ],
                "values": [
                    {
                        "id": 50,
                        "attribute_option_id": 9,
                        "filterable": 1,
                        "sort": 0,
                        "translations": [
                            {
                                "name": "Indoor",
                                "locale": "en"
                            }
                        ],
                        "vid": 50
                    },
                    {
                        "id": 51,
                        "attribute_option_id": 9,
                        "filterable": 1,
                        "sort": 0,
                        "translations": [
                            {
                                "name": "Garden",
                                "locale": "en"
                            }
                        ],
                        "vid": 51
                    },
                    {
                        "id": 54,
                        "attribute_option_id": 9,
                        "filterable": 1,
                        "sort": 0,
                        "translations": [
                            {
                                "name": "Camping",
                                "locale": "en"
                            }
                        ],
                        "vid": 54
                    }
                ]
            }
        } : undefined
    },
    catalog_product_attributes_text: () => ([]),
    
}
  
// actions
const actions = {

    async catalog_product_widget({commit}) {
        commit('setProductWidget', await API_ITEM.catalog_product_widget())
    },

    async catalog_product_get_info({commit}, slug) {
        commit('setProductDetails', await API_ITEM.catalog_product_get_info(slug))
    },

    async catalog_product_latest_reviews({commit}, id) {
        commit('setReviews', await API_ITEM.catalog_product_latest_reviews(id))
    },
    
}

// mutations is often used to filter results
const mutations = {
    setProductWidget(state, response) {
        state.catalog_product_widget = response.data
    },

    setProductDetails(state, response) {
        state.catalog_product_get_info = response.data.product
    },

    setReviews(state, response) {
        state.reviews = response.data.reviews
    },

    resetProductDetails(state) {
        state.catalog_product_get_info = {}
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}