<template>
    <div class="row justify-content-center">
        <div class="col-12 col-lg-5 mt-5">
            <div class="card card-body">
                <div class="card-title text-uppercase fw-bold">{{ $t('Returns & Exchanges') }}</div>
                <p>{{ $t('To initiate a return or exchange, simply fill out the form and we will make sure to process your request quickly to get you what you need on time. We will reach out to you if we need more info to complete the request.') }}</p>
                <form @submit.prevent="request()">
                    <div class="mb-3">
                        <label class="form-label">{{ $t('Order ID') }}</label>
                        <input v-model="formdata.order_id" type="text" class="form-control" placeholder="E.g. 847568" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">{{ $t('Email') }}</label>
                        <input v-model="formdata.email" type="email" class="form-control" placeholder="E.g. name@example.com" required>
                    </div>
                    <div class="text-end">
                        <button class="btn btn-primary" type="submit">
                            {{ $t('Next') }}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data: () => ({
        formdata: {
            order_id: undefined,
            email: undefined,
            grecaptcha_token: undefined,
        }
    }),
    methods: {
        async request() {

            // Get Google reCAPTCHA token if the site key is set
            const _ = this
            if(_.zucConfig && _.zucConfig.recaptcha_site_key) {
                grecaptcha.ready(function() {
                    grecaptcha.execute(_.zucConfig.recaptcha_site_key, { action: 'submit' }).then(function(token) {
                        _.formdata.grecaptcha_token = token
                    })
                })
                while(_.formdata.grecaptcha_token === undefined) {
                    await new Promise(r => setTimeout(r, 100))
                }
            }

            this.$store.dispatch('order_get_ref', this.formdata).then(resp => this.$router.push(`/return-exchange/${resp.data.ref}`)).catch(error => {
                this.$store.commit('SETTING_SET_ALERT', {
                    'color': 'danger', 
                    'message': this.$t(error.response.data.message)
                })
            })
        }
    }
}
</script>