<template>
    <span class="display-price-with-currency">
        <template v-if="realCurrency">
            <span v-if="realCurrency.position === 'l'">
                {{ realCurrency.symbol }}{{ moneyFormat(realPrice, setting_get_currency_by_code(currency).decimal_digits) }}
            </span>
            <span v-else>
                {{ moneyFormat(realPrice, setting_get_currency_by_code(currency).decimal_digits) }}{{ realCurrency.symbol }}
            </span>
        </template>
        <span v-else>___</span>
    </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['price', 'currency'],
    computed: {
        ...mapGetters(['setting_get_currency_by_code', 'moneyFormat']),
        realCurrency() {
            return this.setting_get_currency_by_code(this.currency)
        },
        realPrice() {
            return Number.parseFloat(this.price).toFixed(2)
        }
    }
}
</script>