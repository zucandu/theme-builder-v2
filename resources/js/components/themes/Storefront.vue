<template>
    <main :id="`main-${$route.name}`" class="main">
        <layout-header></layout-header>
        <div class="main__content my-3">
            <div :class="$route.name === `index` ? `container-fluid` : `container`">
                <router-view></router-view>
            </div>
        </div>
        <layout-footer></layout-footer>
        <display-toast></display-toast>
    </main>
</template>

<script>

// Layouts
import LayoutHeader from '@theme/storefront/templates/layout/Header'
import LayoutFooter from '@theme/storefront/templates/layout/Footer'
import DisplayToast from '@theme/storefront/templates/element/DisplayToast'

// Modules
import storefront from '@/store/storefront'
import { mapGetters, mapState } from 'vuex'
export default {
    data: () => ({
        meta: undefined
    }),
    components: {
        LayoutHeader, LayoutFooter, DisplayToast
    },
    created() {
        Object.keys(storefront).forEach(moduleName => this.$store.registerModule(moduleName, storefront[moduleName]))
    }, 
    beforeUnmount() {
        Object.keys(storefront).forEach(moduleName => this.$store.unregisterModule(moduleName))
    },
    mounted() {

        /**
         * Get Init Settings
         */
        this.$store.dispatch('setting_initialize').then(() => this.$i18n.locale = this.language)

        // Loads account info
        if(this.account_customer_access_token && Object.keys(this.profile).length === 0) {
            this.$store.dispatch('account_customer_get_info')
        }

        // Get all banners
        if(this.banners.length === 0) this.$store.dispatch('global_banner_all')

        /* Tiny slider js */
        const tinysliderjs= document.createElement("script")
        tinysliderjs.src = `https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.9.2/min/tiny-slider.js`
        tinysliderjs.id = 'tiny-slider-js'
        document.head.appendChild(tinysliderjs)

    },

    /**
     * Change meta tag for static pages
     */
    beforeRouteUpdate (to, from, next) {
        this.setting_set_meta_tags(to, this.$i18n.locale)
        next()
    },
    computed: {
        ...mapGetters(['account_customer_access_token', 'setting_set_meta_tags']),
        ...mapState({
            language: state => state.setting.language,
            metaTags: state => state.setting.metaTags,
            profile: state => state.customer.profile,
            banners: state => state.global.globalBanners,
        })
    },

}
</script>