<template>
    <span>
        <span v-if="setting_currency_converter">
            <span v-if="setting_currency_converter.position === 'l'">
                {{ setting_currency_converter.symbol }}{{ moneyFormat(price, this.setting_currency_converter.decimal_digits) }}
            </span>
            <span v-else-if="setting_currency_converter.position === 'r'">
                {{ moneyFormat(price, this.setting_currency_converter.decimal_digits) }}{{ setting_currency_converter.symbol }}
            </span>
        </span>
        <span v-else>___</span>
    </span>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['price'],
    computed: {
        ...mapGetters(['setting_currency_converter', 'moneyFormat']),
    }
}
</script>