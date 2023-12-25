<template>
    <div v-if="setting_currency_converter" class="inline-block">
        <template v-if="setting_currency_converter.position === 'l'">
            <span class="product-price is-sale" v-if="productPrice.sale > 0">
                <del>{{ setting_currency_converter.symbol }}{{ global_money_format(productPrice.base, this.setting_currency_converter.decimal_digits) }}</del>
                <span class="text-danger ps-1">{{ setting_currency_converter.symbol }}{{ global_money_format(productPrice.sale, this.setting_currency_converter.decimal_digits) }}</span>
            </span>
            <span class="product-price" v-else>
                {{ setting_currency_converter.symbol }}{{ global_money_format(productPrice.base, this.setting_currency_converter.decimal_digits) }}
            </span>
        </template>
        <template v-else-if="setting_currency_converter.position === 'r'">
            <span class="product-price is-sale" v-if="productPrice.sale > 0">
                <del>{{ global_money_format(productPrice.base, this.setting_currency_converter.decimal_digits) }}{{ setting_currency_converter.symbol }}</del>
                <span class="text-danger ps-1">{{ global_money_format(productPrice.sale, this.setting_currency_converter.decimal_digits) }}{{ setting_currency_converter.symbol }}</span>
            </span>
            <span class="product-price" v-else>
                {{ global_money_format(productPrice.base, this.setting_currency_converter.decimal_digits) }}{{ setting_currency_converter.symbol }}
            </span>
        </template>
    </div>
    <div v-else>___</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['productPrice'],
    computed: {
        ...mapGetters(['setting_currency_converter', 'global_money_format']),
    }
}
</script>