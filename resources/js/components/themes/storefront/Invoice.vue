<template>
    <div class="row justify-content-center">
        <div class="col-lg-8 col-12">
            <template v-if="account_customer_access_token">
                <div class="card">
                    <div class="card-header fw-bold h3 text-uppercase">
                        {{ $t('Invoice #:') }} <template v-if="loaded">{{ order.id }}</template><template v-else>...</template>
                    </div>
                    <div class="card-body">
                        <template v-if="loaded">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="h5">{{ $t('Delivery Address') }}</div>
                                    <display-address :address="shippingAddress"></display-address>
                                    <div class="h5 mt-3">{{ $t('Shipping Method') }}</div>
                                    <p>{{order.shipping_method}}</p>
                                </div>
                                <div class="col-md-6">
                                    <div class="h5">{{ $t('Billing Address') }}</div>
                                    <display-address :address="billingAddress"></display-address>
                                    <div class="h5 mt-3">{{ $t('Payment Method') }}</div>
                                    <p>{{ $t(order.payment_method) }}</p>
                                </div>
                            </div>
                            <table class="table table-striped hover">
                                <caption>{{ $t('Order created') }}: {{ order.purchased_at }}</caption>
                                <thead>
                                    <tr>
                                        <th>{{ $t('Name') }}</th>
                                        <th>{{ $t('Qty') }}</th>
                                        <th>{{ $t('Unit') }}</th>
                                        <th class="text-end">{{ $t('Total') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in order.items" :key="item.id">
                                        <td>
                                            <div class="mb-2">{{ item.name }}</div>
                                        </td>
                                        <td>{{ item.qty }}</td>
                                        <td>
                                            <display-price-with-currency :price="item.price" :currency="order.currency"></display-price-with-currency>
                                        </td>
                                        <td class="text-end">
                                            <display-price-with-currency :price="item.price*item.qty" :currency="order.currency"></display-price-with-currency>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot class="h6">
                                    <tr>
                                        <td colspan="3" class="text-end border-0">{{ $t('Subtotal:') }}</td>
                                        <td class="text-end border-0">
                                            <display-price-with-currency :price="order.subtotal" :currency="order.currency"></display-price-with-currency>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="3" class="text-end border-0">{{ $t('Shipping') }} ({{order.shipping_method}}):</td>
                                        <td class="text-end border-0">
                                            <display-price-with-currency :price="order.shipping_amount" :currency="order.currency"></display-price-with-currency>
                                        </td>
                                    </tr>
                                    <tr v-if="zucConfig.product_price_with_tax === 'n' && order.order_tax > 0">
                                        <td colspan="3" class="text-end border-0">{{ $t('Tax:') }}</td>
                                        <td class="text-end border-0">
                                            <display-price-with-currency :price="order.order_tax" :currency="order.currency"></display-price-with-currency>
                                        </td>
                                    </tr>
                                    <template v-if="order.discounts && order.discounts.length > 0">
                                        <tr v-for="discount in order.discounts" :key="discount.id">
                                            <td colspan="3" class="text-end border-0">{{ $t(discount.name)}}</td>
                                            <td class="text-end border-0">
                                                <span>-</span>
                                                <display-price-with-currency :price="discount.amount" :currency="order.currency"></display-price-with-currency>
                                            </td>
                                        </tr>
                                    </template>
                                    <tr>
                                        <td colspan="3" class="text-end border-0">{{ $t('Total:') }}</td>
                                        <td class="text-end border-0">
                                            <display-price-with-currency :price="order.order_total" :currency="order.currency"></display-price-with-currency>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </template>
                        <div v-else class="text-center p-5">
                            <div class="spinner-border opacity-25 m-auto" style="width: 4rem; height: 4rem;" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <div v-if="!zucConfig.module_payment_square_environment" class="alert alert-warning">{{ $t('Please enable your card payment.') }}</div>
                        <div v-else>
                            <form id="sq-payment-form">
                                <template v-if="errors.length > 0">
                                    <div class="text-danger mb-3" v-for="(error, index) in errors" :key="index">{{ error }}</div>
                                </template>
                                <div id="render-payment-gateway">
                                    <div id="card-container"></div>
                                </div>
                                <button v-if="loaded" :disabled="paying" type="submit" class="btn btn-success btn-lg w-100 text-white">{{ $t('Pay') }} {{ Number.parseFloat(order.order_total).toFixed(2) }} {{ order.currency }}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </template>
            <div v-else class="text-center">
                <template v-if="!account_customer_logged">
                    <p>{{ $t('Please login your account then you can start paying invoice.') }}</p>
                    <router-link :to="`/login?redirect=/invoice/${$route.params.ref}`" class="btn btn-primary">{{ $t('Login') }}</router-link>
                </template>
                <p v-else>{{ $t('Please refresh the page and try again') }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import DisplayPriceWithCurrency from '@theme/storefront/templates/currency/DisplayPriceWithCurrency'
import DisplayAddress from '@theme/storefront/templates/account/DisplayAddress'
import { mapState, mapGetters } from 'vuex'
export default {
    data: () => ({
        loaded: false,
        errorMsg: undefined,
        paying: false,
        errors: []
    }),
    components: { DisplayAddress, DisplayPriceWithCurrency },
    created() {
        
        // Get order
        this.$store.dispatch('order_get_info_by_ref', this.$route.params.ref).then(() => {
            this.$store.dispatch('order_tracking_info', this.order.id).then(() => this.loaded = true)
        }).catch(error => {
            this.errorMsg = error.response.data.message
        })

        // Get countries to get country code from name
        if(this.countries.length === 0) {
            this.$store.dispatch('country_list')
        }

        // Load square script
        const script = document.createElement("script")
        script.src = "https://sandbox.web.squarecdn.com/v1/square.js"
        if(this.zucConfig.module_payment_square_environment === 'live') {
            script.src = "https://web.squarecdn.com/v1/square.js"
        }
        script.id = 'squareScript'
        script.addEventListener("load", this.loadedPayment)
        document.head.appendChild(script)
    },
    methods: {
        /**
         * 
         * @param {*} payments 
         * @returns
         */
        async initializeCard(payments) {
            const card = await payments.card();
            await card.attach('#card-container'); 
            return card; 
        },

        async verifyBuyer(payments, token) {
            const verificationDetails = {
                amount: this.order.order_total,
                billingContact: {
                    addressLines: [this.billingAddress.address_line_1],
                    familyName: this.billingAddress.name,
                    givenName: this.billingAddress.name,
                    email: this.order.email,
                    country: this.country_get_by_name(this.billingAddress.country_name).iso_code_2,
                    phone: this.billingAddress.phone,
                    postalCode: this.billingAddress.postcode,
                    city: this.billingAddress.city,
                },
                currencyCode: this.order.currency,
                intent: 'CHARGE',
            };

            const verificationResults = await payments.verifyBuyer(token, verificationDetails);
            return verificationResults.token;
        },
        
        // This function tokenizes a payment method. 
        // The ‘error’ thrown from this async function denotes a failed tokenization,
        // which is due to buyer error (such as an expired card). It is up to the
        // developer to handle the error and provide the buyer the chance to fix
        // their mistakes.
        async tokenize(paymentMethod) {
            const tokenResult = await paymentMethod.tokenize();
            if (tokenResult.status === 'OK') {
                return tokenResult.token;
            } else {
                let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
                if (tokenResult.errors) {
                    errorMessage += ` and errors: ${JSON.stringify(
                        tokenResult.errors
                    )}`;
                }
                throw new Error(errorMessage);
            }
        },

        async loadedPayment() {
            
            // Application Id
            let appId = this.zucConfig.module_payment_square_sanbox_application_id
            if(this.zucConfig.module_payment_square_environment === 'live') {
                appId = this.zucConfig.module_payment_square_production_application_id
            }

            const payments = Square.payments(appId, this.zucConfig.module_payment_square_location_id);
            let card;
            try {
                card = await this.initializeCard(payments);
            } catch (e) {
                console.error('Initializing Card failed', e);
            }
        
            // Handle card token
            const form = document.getElementById('sq-payment-form');

            const __ = this

            form.addEventListener('submit', async function(event) {
                
                // disable reload
                event.preventDefault()
                __.paying = true

                try {
                    // disable the submit button as we await tokenization and make a
                    // payment request.
                    //document.getElementById('sq-card-button').disabled = true;
                    
                    const token = await __.tokenize(card);

                    const verificationToken = await __.verifyBuyer(payments, token);

                    // Square Payment API
                    __.$store.dispatch('order_pay_invoice', { 
                        profile: {
                            id: __.billingAddress.customer_id,
                            firstname: __.billingAddress.name,
                            lastname: "",
                            email: __.order.email
                        },
                        billing: __.billingAddress,
                        total: __.order.order_total,
                        currency: __.order.currency,
                        billing: __.billingAddress,
                        nonce: token,
                        idempotency_key: __.uuidv4(),
                        verification_token: verificationToken
                    }).then(() => {
                        __.$router.push('/account')
                    }).catch(error => {
                        __.errors.push(error.response.data.message)
                    }).finally(() => __.paying = false)

                } catch (e) {
                    console.log(e)
                    __.paying = false
                }

            });
        },
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
                return v.toString(16)
            })
        }
    },
    computed: {
        ...mapGetters(['account_customer_logged', 'account_customer_access_token', 'country_get_by_name']),
        ...mapState({
            order: state => state.order.orderFromDb,
            orderFormData: state => state.order.orderFormData,
            countries: state => state.country.countries
        }),
        orderAddress() {
            if(this.order && this.order.addresses && this.order.addresses.length > 0) {
                return {
                    shipping: this.order.addresses.find(address => address.address_type === 'shipping'),
                    billing: this.order.addresses.find(address => address.address_type === 'billing'),
                }
            }
        },
        shippingAddress() {
            return this.order.addresses.find(addr => addr.address_type === 'shipping')
        },
        billingAddress() {
            const address = this.order.addresses.find(addr => addr.address_type === 'billing')
            if(address === undefined) {
                return this.shippingAddress
            }
            return address
        }
    }
}
</script>