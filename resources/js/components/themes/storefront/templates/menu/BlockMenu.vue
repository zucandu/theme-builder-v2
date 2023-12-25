<template>
    <section :class="`menu-element menu-element-${item.id} menu-${item.link}-element`">
        <figure v-if="item.extra_data && item.extra_data.image">
            <router-link :class="`nav-link ${ extraClass !== undefined ? extraClass : '' }`" :to="url">
                <img v-if="item.link === 'banner'" :src="`/storage/${item.extra_data.image}`" :alt="setting_translation.title" class="img-fluid">
                <img v-else :src="`/storage/${zucConfig.medium_image_size}/${item.extra_data.image}`" :alt="setting_translation.title" class="img-fluid">
            </router-link>
        </figure>
        <h5 class="menu-element__content">
            <router-link :class="`nav-link ${ extraClass !== undefined ? extraClass : '' }`" :to="url">
                {{ setting_translation.title }}
            </router-link>
        </h5>
        <template v-if="item.rating || item.extra_data.price">
            <display-rating :rating="item.rating" :total="item.total_reviews"></display-rating>
            <product-display-price :product-price="catalog_product_price(item.extra_data, 1)"></product-display-price>
        </template>
    </section>
</template>

<script>
import ProductDisplayPrice from '@theme/storefront/templates/product/DisplayPrice'
import DisplayRating from '@theme/storefront/templates/product/DisplayRating'
import { mapGetters, mapState } from 'vuex'
export default {
    props: ['item', 'extraClass'],
    components: { ProductDisplayPrice, DisplayRating },
    computed: {
        ...mapGetters(['setting_trans_obj', 'trim', 'catalog_product_price']),
        ...mapState({
            
        }),
        setting_translation() {
            return this.setting_trans_obj(this.item, this.$i18n.locale)
        },
        url() {
            return ['page', 'product', 'banner'].includes(this.item.link) === false ? `/${this.item.link}/${this.setting_translation.url}` : `/${_.trim(this.setting_translation.url, '/')}`
        }
    },
}
</script>