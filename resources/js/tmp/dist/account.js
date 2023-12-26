import API_ACCOUNT from '@/api/account'

// initial state
const state = {
    profile: {},
    orders: []
}

// getters
const getters = {
    customerId: () => 1,
    addressLength: () => 1,
    defaultBillingAddress: () => ({
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
    defaultShippingAddress: () => ({
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
    getAddressById: state => () => ({
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
    customerOrderDetailsByRef: state => ref => state.profile.orders.find(order => order.reference === ref) || undefined,
    isNormalAccount: () => true,
    isCustomerLogged: (state) => !_.isEmpty(state.profile) && !_.isEmpty(localStorage.getItem('jwt_customer')),
    account_customer_access_token: () => !_.isEmpty(localStorage.getItem('jwt_customer')),
    customerNotifications: () => undefined,
    numberOfCustomerNotifications: () => 0,
    customerTax: () => undefined
}
  
// actions
const actions = {
    async account({commit}) {
        commit('setAccount', await API_ACCOUNT.account())
    },

    async accountOrders({commit}) {
        commit('setAccountOrders', await API_ACCOUNT.accountOrders())
    },

    async addNewAddress({commit}) {
        commit('setAccount', await API_ACCOUNT.account())
    },
    subscribeNewsletter({}, formdata) {
        console.log(formdata)
    },
}

// mutations is often used to filter results
const mutations = {

    setAccount: (state, response) => {state.profile = response.data.profile},
    setAccountOrders: (state, response) => {state.orders = response.data.orders},
    ACCOUNT_CUSTOMER_RESET: (state) => {state.profile},
}

export default {
    state,
    getters,
    actions,
    mutations
  }