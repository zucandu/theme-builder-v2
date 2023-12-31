<template>
    <div :class="`row justify-content-center ${account_customer_logged ? `customer-logged` : ``}`">
        <div class="col-12">
            <div class="h1 text-center">{{ $t('Checkout') }}</div>
            <div v-if="!account_customer_logged" class="text-center text-uppercase letter-spacing-1px">{{ $t('Already have an account?') }} <router-link :to="{ path: `/login`, query: { redirect: `/checkout` } }">{{ $t('Log in') }}</router-link></div>
            <transition name="fade">
                <div class="row" v-if="order_ready_to_checkout">
                    <div class="left-column col-lg-6 pt-lg-5 pt-3">
                        <component :is="checkoutStep" @updateCheckoutStep="updateCheckoutStep" :params="checkoutParams"></component>
                    </div>
                    <div class="right-column col-lg-5 offset-lg-1">
                        <div class="sticky-top pt-lg-5 pt-3">
                            <div class="card card-body shadow">
                                <div class="cart-contents order-md-0 order-1">
                                    <div class="h5 mb-3">{{ $t('Your shopping cart') }}</div>
                                    <div class="cart-items">
                                        <table class="table table-striped hover">
                                            <tbody>
                                                <tr v-for="item in items" :key="item.id">
                                                    <td>
                                                        <img v-if="item.images && item.images.length > 0" :src="`/storage/${zucConfig.small_image_size}/${item.images[0].src}`" :width="zucConfig.small_image_size" alt="product" class="img-thumbnail">
                                                        <img v-else src="/storage/no-image.png" alt="No image" :width="zucConfig.small_image_size" class="img-thumbnail">
                                                    </td>
                                                    <td>
                                                        <div v-html="setting_translation(item, 'name', $i18n.locale)"></div>
                                                        <div class="text-gray-500 small">{{ $t('Qty') }}: {{ item.qty }}</div>

                                                        <!-- Hook product title. -->
                                                        <template v-for="(component, index) in $pluginStorefrontHooks['checkout_product_title']" :key="index">
                                                            <component :is="component" :product="item"></component>
                                                        </template>

                                                    </td>
                                                    <td class="text-end">
                                                        <product-display-price :product-price="catalog_product_price(item, item.qty)"></product-display-price>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="total-summary">
                                        <table class="table table-striped hover">
                                            <tfoot class="h6">
                                                <tr>
                                                    <td colspan="3" class="text-end border-0">{{$t('Subtotal:')}}</td>
                                                    <td class="text-end border-0">
                                                        <display-price :price="cart_total"></display-price>
                                                    </td>
                                                </tr>
                                                <tr v-if="orderFormData.shipping.id">
                                                    <td colspan="3" class="text-end border-0">{{$t('Shipping')}} ({{orderFormData.shipping.title}}):</td>
                                                    <td class="text-end border-0">
                                                        <display-price :price="order_shipping_cost"></display-price>
                                                    </td>
                                                </tr>
                                                <template v-if="orderFormData.discount.length > 0">
                                                    <tr v-for="(discount, index) in orderFormData.discount" :key="index">
                                                        <td colspan="3" class="text-end border-0">{{$t(discount.module)}}</td>
                                                        <td class="text-end border-0">
                                                            <span>-</span>
                                                            <display-price :price="discount.details.amount"></display-price>
                                                        </td>
                                                    </tr>
                                                </template>
                                                <tr v-if="order_tax_amount > 0">
                                                    <td colspan="3" class="text-end border-0">{{ $t('Sales Tax') }}:</td>
                                                    <td class="text-end border-0">
                                                        <display-price :price="order_tax_amount"></display-price>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="3" class="text-end border-0">{{$t('Total:')}}</td>
                                                    <td class="text-end border-0">
                                                        <display-price :price="order_total"></display-price>
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>

                                    <!-- Hook checkout summary. -->
                                    <template v-for="(component, index) in $pluginStorefrontHooks['checkout_summary']" :key="index">
                                        <component :is="component" :products="items"></component>
                                    </template>

                                </div>
                                <div class="checkout-payment-gateway-container order-md-1 order-0 mb-3 mb-lg-0">
                                    <div v-if="Object.keys(orderFormData.payment).length === 0 || Object.keys(orderFormData.shipping).length === 0" class="alert alert-warning">
                                        {{ $t('Please select shipping and payment method.') }}
                                    </div>
                                    <checkout-payment-gateway></checkout-payment-gateway>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <template v-if="!order_ready_to_checkout">
                <checkout-loading></checkout-loading>
            </template>
        </div>
    </div>
</template>

<script>
import CheckoutLoading from '@theme/storefront/templates/checkout/Loading'
import CheckoutCreateAccount from '@theme/storefront/templates/checkout/CreateAccount'
import CheckoutForm from '@theme/storefront/templates/checkout/Form'
import CheckoutAddress from '@theme/storefront/templates/checkout/Address'
import CheckoutPaymentGateway from '@theme/storefront/templates/checkout/PaymentGateway'
import DisplayPrice from '@theme/storefront/templates/currency/DisplayPrice'
import ProductDisplayPrice from '@theme/storefront/templates/product/DisplayPrice'
import { mapState, mapGetters } from 'vuex'
export default {
    data: () => ({
        checkoutStep: undefined,
        checkoutParams: {},
    }),
    components: {
        CheckoutLoading, CheckoutCreateAccount, CheckoutForm, CheckoutAddress, CheckoutPaymentGateway, 
        ProductDisplayPrice, DisplayPrice
    },
    created() {

        // Customer with normal account
        if(this.account_customer_logged === true) {
            if(this.profile.addresses.length === 0) {
                this.checkoutStep = 'CheckoutAddress' // addressform
            } else {
                this.checkoutStep = 'CheckoutForm' // order processing
            }
        } else {

            // Customer with guest
            if(this.account_customer_access_token=== true) {
                this.$store.dispatch('account_customer_get_info').then(() => {
                    if(this.profile && this.profile.addresses.length === 0) {
                        this.checkoutStep = 'CheckoutAddress' // addressform
                    } else {
                        this.checkoutStep = 'CheckoutForm' // order processing
                    }
                })
            } else {
                this.checkoutStep = 'CheckoutCreateAccount'
            }
        }

    },
    methods: {
        updateCheckoutStep(obj) {
            // Update component
            this.checkoutStep = obj.step

            // Assign params between components
            this.checkoutParams = { ...this.checkoutParams, ...obj.params }
        }
    },
    computed: {
        ...mapGetters(['setting_translation', 'cart_total', 'account_customer_logged', 
                        'account_customer_access_token', 'catalog_product_price', 
                        'order_shipping_cost', 'order_tax_amount', 'order_total', 
                        'order_ready_to_checkout', 'order_tax_name', 'order_shipping_methods']),
        ...mapState({
            items: state => state.cart.items,
            profile: state => state.customer.profile,
            orderFormData: state => state.order.orderFormData
        })
    }
}
</script>