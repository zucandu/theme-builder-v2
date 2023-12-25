<template>
    <span class="inline-block">
        <span v-if="setting_currency_converter">
            <span v-if="setting_currency_converter.position === 'l'">
                {{setting_currency_converter.symbol}}{{displayPrice(priceRange.min, 1)}} - {{setting_currency_converter.symbol}}{{displayPrice(priceRange.max, 1)}}
            </span>
            <span v-else-if="setting_currency_converter.position === 'r'">
                {{displayPrice(priceRange.min, 1)}}{{setting_currency_converter.symbol}} - {{displayPrice(priceRange.max, 1)}}{{setting_currency_converter.symbol}}
            </span>
        </span>
        <span v-else>___</span>
    </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['priceRange'],
    computed: {
        ...mapGetters(['setting_currency_converter', 'displayPrice']),
    }
}
</script>