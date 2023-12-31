import API_GLOBAL from '@/api/global';

// initial state
const state = {
    globalBanners: []
}

// getters
const getters = {
    global_trim: () => (str, ch) => _.trim(str, ch),
    global_compare: () => (a, b) => a < b ? -1 : (a > b ? 1 : 0),
    global_url_param: () => (url, paramName) => {
        if(!url) return undefined
        let objURL = new URL(url)
        return objURL.searchParams.get(paramName)
    },

    global_all_url_params: () => (excludingParams = []) => {
        let __excludingParams = [ ...excludingParams, 'just_created']

        let __params = {}
        let paramstring = window.location.search.substring(1)

        let params = paramstring.split('&')
        params.forEach(p => {
            const [key, value] = p.split('=')
            if(key && __excludingParams.includes(key) === false) {
                __params[key] = value.replace(/\+/g, ' ')
            }
        })
        return __params
    },

    global_price_range: () => (priceRange) => {
        const [minPrice, maxPrice] = priceRange.split('-')
        return { min: minPrice, max: maxPrice }
    },
     global_toggle: () => (element, className) => {
         if(element) {
            element.classList.toggle(className)
         }
     },
     global_money_format: () => (price, decimal) => (+price).toFixed(decimal).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'),
    
}
  
// actions
const actions = {

    async global_send_mail({}, formdata) {
        await API_GLOBAL.global_send_mail(formdata)
    },

    /**
     * Storefront loads banners
     * @param {*} param0 
     */
    async global_banner_all({ commit }) {
        commit('SET_SF_BANNERS', await API_GLOBAL.global_banner_all())
    },
}

// mutations is often used to filter results
const mutations = {
    SET_SF_BANNERS: (state, response) => state.globalBanners = response.data.banners
}

export default {
    state,
    getters,
    actions,
    mutations
  }