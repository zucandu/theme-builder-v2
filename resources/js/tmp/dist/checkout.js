// initial state
const state = {
    shippingMethods: [],
    paymentMethods: [],
    discountModules: [],
    orderFormData: {
        shipping: {},
        payment: {},
        promotion: {},
        discount: []
    },
    orderFromDb: {},
    orderTrackingInfo: [],
}

// getters
const getters = {
    order_shipping_methods: state => state.shippingMethods || undefined,
    order_payment_methods: state => state.paymentMethods || undefined,
    order_promotions: state => state.discountModules || undefined,
    order_shipping_cost: () => 2.3,
    order_tax_amount: () => 0,
    order_tax_name: () => undefined,
    order_discount_amount: () => 0,
    order_total: () => 12.3,
    order_ready_to_checkout: () => true,
    order_params: state => {
        return {
            profile: {"id": 1,"firstname": "Hello","lastname": "World","email": "tester@test.com","username": null,"default_billing_address_id": 1,"default_shipping_address_id": 1,"avatar": "avatar.png","is_guest": 0,"newsletter": 0,"created_at": "2021-12-02 11:11:59","updated_at": "2021-12-11 03:14:44","addresses": [{"id": 1,"customer_id": 1,"company": null,"name": "Hello World","address_line_1": "5465 S OAKRIDGE DR","address_line_2": null,"city": "HOMOSASSA","postcode": "90001","zone_code": "CA","zone_name": "California","country_code": "US","country_name": "United States","phone": "1234567890"}],"tax": null,"notifications": []},
            items: [
                {
                    "id": 43,
                    "sku": "Model2Green",
                    "translations": [
                        {
                            "id": 43,
                            "product_id": 43,
                            "locale": "en",
                            "name": "Water Kettle SWK 1000OE Green",
                            "slug": "water-kettle-swk-1000oe-green",
                            "description": "Quisque sed leo. Vivamus arcu purus, adipiscing et, consequat id, tincidunt sed, ligula. Proin bibendum dignissim sem. Nam tempus. Vestibulum sagittis suscipit urna. Vestibulum malesuada commodo odio. Nam fermentum neque sit amet massa. Nunc blandit lacus in quam. Aliquam fringilla, massa vel malesuada feugiat, enim mi molestie turpis, in rhoncus dui tellus vitae turpis. Donec urna enim, congue ut, hendrerit nec, imperdiet sed, libero.\r\n\r\nNulla ante eros, sagittis et, laoreet in, congue nec, odio. In lectus nisi, scelerisque quis, condimentum a, sollicitudin vitae, ligula. Maecenas blandit. Duis sodales euismod lectus. Sed vel est et orci laoreet ultricies. Mauris consequat placerat diam. Etiam ut libero. Pellentesque aliquet fermentum velit. Nullam risus metus, dignissim interdum, dapibus sed, posuere ac, mi. Mauris condimentum, neque vel tristique faucibus, mauris tortor tincidunt nunc, at pretium turpis dui id elit. Donec sit amet est. Mauris quis erat ac diam tincidunt hendrerit. Fusce malesuada tortor ut leo. Nulla facilisi. Aenean placerat, eros quis ultrices vehicula, enim lacus interdum turpis, non iaculis metus odio sit amet tellus. Pellentesque cursus tempor metus. In aliquam pulvinar nibh.",
                        }
                    ],
                    "weight": 9,
                    "inventory": 999,
                    "price": 292,
                    "sale_price": 0,
                    "qty": 3,
                    "tax_class_id": 1
                }
            ],
            subtotal: 10, 
            shippingcost: 2.3,
            tax_name: null,
            tax: 0,
            total: 12.3,
            discount: 0,
            currency: 'USD',
            language: 'EN',
            billing: {"id": 1,"customer_id": 1,"company": null,"name": "Hello World","address_line_1": "5465 S OAKRIDGE DR","address_line_2": null,"city": "HOMOSASSA","postcode": "90001","zone_code": "CA","zone_name": "California","country_code": "US","country_name": "United States","phone": "1234567890"},
            shipping: {"id": 1,"customer_id": 1,"company": null,"name": "Hello World","address_line_1": "5465 S OAKRIDGE DR","address_line_2": null,"city": "HOMOSASSA","postcode": "90001","zone_code": "CA","zone_name": "California","country_code": "US","country_name": "United States","phone": "1234567890"},
            paymentmethod: state.orderFormData.payment,
            shippingmethod: state.orderFormData.shipping,
            discountmodules: {}
        }
    }
}
  
// actions
const actions = {

    order_init_checkout({ commit }) {
        const { shippingModules, paymentModules, discountModules } = JSON.parse(`{"shippingModules":[{"code":"Flat","name":"Flat Rate","description":"Flat Rate","methods":[{"id":"Flat","title":"Flat Rate","cost":2.3}]}],"paymentModules":[{"id":"MoneyOrder","module":"Check\/Money Order","image":"paypal-visa-mastercard-american.credit-card.png"}],"discountModules":[{"id":"CouponModule","module":"Discount Coupon","fields":[{"label":"Coupon Code","name":"coupon_code","input":"text","placeholder":"Please enter your coupon code"}]}]}`)
        commit('ORDER_SHIPPING_METHODS', shippingModules)
        commit('ORDER_PAYMENT_METHODS', paymentModules)
        commit('ORDER_DISCOUNT_MODULES', discountModules)

    },
    order_get_info_by_ref({ commit },) {
        commit('ORDER_SET_ORDER', `{"order":{"id":14252342346,"reference":"698412HE28PGYN23QNWIYE4L","customer_id":1,"firstname":"Steven","lastname":"Garret","email":"hello@example.com","payment_method":"Check\/Money Order","payment_code":"MoneyOrder","shipping_method":"Flat Rate","shipping_code":"Flat","status":1,"currency":"USD","language":"en","subtotal":"1221.0000","shipping_amount":"2.3600","order_tax_name":null,"order_tax":"0.0000","order_total":"1223.3600","is_guest":0,"recover_abandoned":0,"ip_address":"127.0.0.1","session_id":33,"meta":null,"created_at":"2021-12-08 08:38:13","updated_at":null,"addresses":[{"id":1,"customer_id":1,"order_id":14252342346,"company":null,"name":"Steven Garret","address_line_1":"5465 S OAKRIDGE DR","address_line_2":null,"city":"HOMOSASSA","postcode":"90001","zone_name":"California","country_name":"United States","phone":"1234567890","address_type":"shipping","created_at":null,"updated_at":null}],"items":[{"id":1,"order_id":14252342346,"product_id":9,"sku":"Model9","name":"Hood CDA EVCK4SS 40cm Cylinder","price":"359.0000","tax":"0.0000","tax_included":0,"qty":2,"meta":null,"created_at":null,"updated_at":null,"images":[{"id":9,"product_id":9,"src":"09.jpg","created_at":null,"updated_at":null}]},{"id":2,"order_id":14252342346,"product_id":7,"sku":"Model7","name":"DEF 18W-804","price":"503.0000","tax":"0.0000","tax_included":0,"qty":1,"meta":null,"created_at":null,"updated_at":null,"images":[{"id":7,"product_id":7,"src":"07.jpg","created_at":null,"updated_at":null}]}],"orderstatus":{"name":"Pending"},"comments":[{"id":1,"order_id":14252342346,"order_status_id":1,"hidden":0,"note":"Thank you for ordered. We will update your order as soon as possible.","courier":null,"tracking_number":null,"admin":null,"created_at":"08 December, 2021 15:13 PM","updated_at":null}],"discounts":[],"returns":[]}}`)
    },
    
    order_tracking_info_by_ref({ commit }) {
        commit('ORDER_SET_TRACKING', `{"order_id":14252342346,"step":2,"trackdetails":{"date":"11 December, 2021","message":"Your order is being processed and you will be notified of the result shortly","location":""},"courier":null,"tracking_number":null,"orderstatus":{"id":1,"name":"Pending","deleted_at":null,"created_at":"2021-12-01 06:24:50","updated_at":"2021-12-01 06:24:50"}}`)
    },
    order_apply_discount ({ commit }) {
        commit('ORDER_SET_DISCOUNT', `{"discount":[{"id":"CouponModule","module":"Discount Coupon (18LJ51)","details":{"module_track_id":1,"amount":1,"type":"F"}}]}`)
    },
}

// mutations is often used to filter results
const mutations = {

    ORDER_SHIPPING_METHODS(state, shippingModules) {
        state.shippingMethods = shippingModules;
    },

    ORDER_PAYMENT_METHODS(state, paymentModules) {
        state.paymentMethods = paymentModules;
    },

    ORDER_DISCOUNT_MODULES(state, discountModules) {
        state.discountModules = discountModules;
    },

    ORDER_SET_FORMDATA(state, obj) {
        state.orderFormData = { ...state.orderFormData, ...obj }
    },

    ORDER_SET_PROMODATA(state, obj) {
        state.orderFormData.promotion = { ...state.orderFormData.promotion, ...obj }
    },

    ORDER_SET_ORDER: (state, json) => {state.orderFromDb = JSON.parse(json).order},

    ORDER_CONNECT_PAYMENT: (state) => {
        if(state.orderFormData.payment.id && state.orderFormData.shipping.id) {
            document.getElementById("render-payment-gateway").innerHTML = "";
            const btn = document.createElement("button");
            btn.setAttribute('class', 'btn btn-primary btn-large w-100');
            btn.innerHTML = `Pay Now`
            document.getElementById("render-payment-gateway").appendChild(btn)
            btn.addEventListener ("click", function() {
                window.location.href = "/checkout-success/782578HHS590S0AOTCOUPPIA";
            })
        }
    },

    /**
     * 
     * @param {*} state 
     * @param {*} response 
     */
    ORDER_SET_DISCOUNT(state, json) {
        state.orderFormData.discount = JSON.parse(json).discount
    },
    
    /**
     * Set order tracking from order id
     */
     ORDER_SET_TRACKING(state, json) {
        state.orderTrackingInfo = JSON.parse(json)
    },

    orderComplete: () => {},
    reORDER_SET_ORDERFromDb: () => {state.orderFromDb = {}},
    reORDER_SET_ORDERDataDiscount: () => {state.orderFormData.discount = {}}
    
}

export default {
    state,
    getters,
    actions,
    mutations
}