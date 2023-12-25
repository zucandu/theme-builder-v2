<template>
    <router-link v-if="item.link !== `webaddress`" @click="closeOffCanvas" :to="url" :class="`nav-link ${item.heading === 1 ? `heading` : ``} ${ extraClass !== undefined ? extraClass : '' } ${item.blocks && item.blocks.length > 0 ? 'dropdown-toggle' : '__'}`">
        {{ setting_translation.title }}
    </router-link>
    <a v-else :href="setting_translation.url" target="_blank" :class="`nav-link ${item.heading === 1 ? `heading` : ``} ${ extraClass !== undefined ? extraClass : '' } ${item.blocks && item.blocks.length > 0 ? 'dropdown-toggle' : '__'}`">{{ setting_translation.title }}</a>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['item', 'extraClass'],
    computed: {
        ...mapGetters(['transObj', 'trim']),
        setting_translation() {
            return this.transObj(this.item, this.$i18n.locale)
        },
        url() {
            return ['page', 'product', 'banner'].includes(this.item.link) === false ? `/${this.item.link}/${this.setting_translation.url}` : `/${_.trim(this.setting_translation.url, '/')}`
        }
    },
    methods: {
        closeOffCanvas() {
            let btnOffcanvas = document.getElementById('closeNavOffcanvas')
            if(btnOffcanvas) {
                btnOffcanvas.click()
            }
        }
    }
}
</script>