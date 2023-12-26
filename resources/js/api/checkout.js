
export default {
    order_init_checkout(formdata) {
        return axios.post('/api/theme-builder/checkout-init', formdata);
    },

    order_get_info_by_ref(ref) {
        return axios.get(`/api/theme-builder/orderdetails/${ref}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_customer')
            }
        })
    },

    orderTrackingInfo(id) {
        return axios.get(`/api/theme-builder/account-track-order/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_customer')
            }
        })
    },

    getPaymentMethods(data) {
        return axios.get('/api/theme-builder/checkout/payment_methods', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt_customer'),
                'Data': JSON.stringify(data)
            }
        });
    },

}