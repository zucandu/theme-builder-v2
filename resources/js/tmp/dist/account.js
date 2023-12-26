import API_ACCOUNT from '@/api/account'

// initial state
const state = {
    profile: {},
    orders: []
}

// getters
const getters = {
    account_customer_address_total: () => 1,
    account_customer_billing_address: () => ({
        "id":1,
        "customer_id":1,
        "company":null,
        "name":"Hello World",
        "address_line_1":"5465 S OAKRIDGE DR",
        "address_line_2":null,
        "city":"HOMOSASSA",
        "postcode":"90001",
        "zone_code":"CA",
        "zone_name":"California",
        "country_code":"US",
        "country_name":"United States",
        "phone":"1234567890"
    }),
    account_customer_shipping_address: () => ({
        "id":1,
        "customer_id":1,
        "company":null,
        "name":"Hello World",
        "address_line_1":"5465 S OAKRIDGE DR",
        "address_line_2":null,
        "city":"HOMOSASSA",
        "postcode":"90001",
        "zone_code":"CA",
        "zone_name":"California",
        "country_code":"US",
        "country_name":"United States",
        "phone":"1234567890"
    }),
    account_customer_is_normal_account: () => true,
    account_customer_logged: (state) => !_.isEmpty(state.profile) && !_.isEmpty(localStorage.getItem('jwt_customer')),
    account_customer_access_token: () => !_.isEmpty(localStorage.getItem('jwt_customer')),
    account_customer_tax: () => undefined
}
  
// actions
const actions = {
    async account_customer_get_info({commit}) {
        commit('SET_ACCOUNT', await API_ACCOUNT.account_customer_get_info())
    },

    async account_customer_orders({commit}) {
        commit('SET_ACCOUNT_ORDERS', await API_ACCOUNT.account_customer_orders())
    },

    async addNewAddress({commit}) {
        commit('SET_ACCOUNT', await API_ACCOUNT.account())
    },
    subscribeNewsletter({}, formdata) {
        console.log(formdata)
    },
}

// mutations is often used to filter results
const mutations = {

    SET_ACCOUNT: (state, response) => {state.profile = response.data.profile},
    SET_ACCOUNT_ORDERS: (state, response) => {state.orders = response.data.orders},
    ACCOUNT_CUSTOMER_RESET: (state) => {state.profile},
}

export default {
    state,
    getters,
    actions,
    mutations
  }