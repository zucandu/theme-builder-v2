<template>
    <section v-if="loaded" class="row justify-content-center account-area">
        <div v-if="account_customer_is_normal_account" class="col-12">
            <div class="row">
                <div class="col-lg-3 no-print">
                    <account-left-nav></account-left-nav>
                </div>
                <div class="col-lg-9 mt-3 mt-lg-0">
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <div v-else-if="Object.keys(profile).length > 0 && +profile.is_guest === 1" class="col-12 col-lg-6 text-center">
            <div class="card">
                <div class="card-body">
                    <div class="card-title h5">{{$t("You're viewing the account page as a guest")}}</div>
                    <p>{{$t('To receive more offers and promotional emails, we suggest you create an account by clicking the "Create an account" button below. You will receive an email containing the password.')}}</p>
                    <button :disabled="converting" class="btn btn-primary btn-lg" @click.stop="convertGuest2NormalAccount">{{$t('Create an account')}}</button>
                </div>
            </div>
        </div>
    </section>
    <section v-if="!loaded" class="row justify-content-center account-area">
        <div class="col-12">
            <div class="row">
                <div class="col-lg-3 no-print">
                    <div class="card card-body">
                        <div class="bg-gray-200 py-3 w-100 mb-2"></div>
                        <div class="bg-gray-200 py-3 w-100 mb-2"></div>
                        <div class="bg-gray-200 py-3 w-100 mb-2"></div>
                        <div class="bg-gray-200 py-3 w-100 mb-2"></div>
                        <div class="bg-gray-200 py-3 w-100 mb-2"></div>
                        <div class="bg-gray-200 py-3 w-100 mb-2"></div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <loading-account></loading-account>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLeftNav from '@theme/storefront/templates/account/Nav'
import LoadingAccount from '@theme/storefront/templates/account/LoadingAccount'
import { mapState, mapGetters } from 'vuex';
export default {
    data: () => ({
        loaded: false,
        converting: false
    }),
    components: {
        AccountLeftNav, LoadingAccount
    },
    created() {

        // Query customer profile when token exists
        if(this.account_customer_access_token && Object.keys(this.profile).length === 0) {
            this.$store.dispatch('account_customer_get_info').then(() => {
                this.loaded = true
            })
        } else {

            // If customer does not log in, redirect login page
            if(this.account_customer_logged === true) {
                this.loaded = true
            } else {
                this.$router.push('/login')
            }
        }
    },
    mounted() {
        if(this.countries.length === 0) {
            this.$store.dispatch('country_list')
        }
    },
    methods: {
        convertGuest2NormalAccount() {
            this.converting = true
            this.$store.dispatch('account_customer_set_account').then(() => {
                this.$store.commit('SETTING_SET_ALERT', {
                    'color': 'success', 
                    'message': this.$t("We have emailed you a temporary password. Please check your email and change it as soon as possible.")
                })
            }).catch(error => {
                this.$store.commit('SETTING_SET_ALERT', {
                    'color': 'danger', 
                    'message': this.$t(error.response.data.message)
                })
            })
        },
    },
    computed: {
        ...mapGetters(['account_customer_address_total', 'account_customer_is_normal_account', 'account_customer_access_token', 'account_customer_logged']),
        ...mapState({
            profile: state => state.customer.profile,
            countries: state => state.country.countries
        }),
    }
}
</script>