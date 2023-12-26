<template>
    <div>{{ countries }}</div>
</template>

<script>
import DisplayPrice from '@theme/storefront/templates/currency/DisplayPrice'
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
        estimateLoading: false,
        picked: undefined,
    }),
    props: ['subtotal'],
    components: { DisplayPrice },
    async created() {

        // Get countries and assign the default country
        await this.$store.dispatch('country_list').then(() => this.estimateFormData.country_code = this.countries.find(country => country.id > 0).iso_code_2)
    },
    computed: {
        ...mapGetters(['cart_total', 'cart_all_items', 'country_get_zones_by_country_code', 'catalog_product_display_price']),
        ...mapState({
            countries: state => state.country.countries,
            estimateFormData: state => state.cart.estimateFormData,
            estimateShippingCost: state => state.cart.estimateShippingCost,
            profile: state => state.customer.profile,
        }),
        regions: function() {
            const regions = this.country_get_zones_by_country_code(this.estimateFormData.country_code)
            if(regions.length > 0 && regions.find(r => r.code === this.estimateFormData.zone_code) === undefined) {

                this.estimateFormData.zone_code = regions.find(r => r.id > 0).code

                // Reset zone name
                this.estimateFormData.zone_name = undefined
            }
            return regions
        },
    },
}
</script>