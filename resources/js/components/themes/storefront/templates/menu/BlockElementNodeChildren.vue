<template>
    <div v-if="item.icon" class="block-element__icon">
        <img :src="`/storage/${item.icon}`" width="40" height="40" :alt="setting_translation.title">
    </div>
    <div v-if="item.extra_data.image" class="block-element__img">
        <router-link v-if="item.extra_data.no_link !== 1" :to="url">
            <img v-if="imgType === `original`" :src="`/storage/${item.extra_data.image}`" :alt="setting_translation.title" class="img-fluid">
            <img v-else :src="`/storage/${imgSize}/${item.extra_data.image}`" :alt="setting_translation.title" class="img-fluid">
        </router-link>
        <template v-else>
            <img v-if="imgType === `original`" :src="`/storage/${item.extra_data.image}`" :alt="setting_translation.title" class="img-fluid">
            <img v-else :src="`/storage/${imgSize}/${item.extra_data.image}`" :alt="setting_translation.title" class="img-fluid">
        </template>
    </div>
    <div :class="`block-element__content index-${index}`">
        <div :class="`title ${item.heading === 1 ? 'heading' : ''}`">
            <router-link v-if="item.extra_data.no_link !== 1" :to="url">{{ setting_translation.title }}</router-link>
            <template v-else>{{ setting_translation.title }}</template>
        </div>
        <div v-if="setting_translation.content" v-html="setting_translation.content" class="text"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['item', 'index', 'imgSize', 'imgType'],
    computed: {
        ...mapGetters(['setting_trans_obj']),
        setting_translation() {
            return this.setting_trans_obj(this.item, this.$i18n.locale)
        },
        url() {
            return ['page', 'product', 'banner'].includes(this.item.link) === false ? `/${this.item.link}/${this.setting_translation.url}` : `/${_.trim(this.setting_translation.url, '/')}`
        }

    }
}
</script>