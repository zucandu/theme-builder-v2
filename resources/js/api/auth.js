export default {

    account_auth_register(formdata) {
        return axios.post('/api/theme-builder/register', formdata);
    },
    
    account_auth_login(formdata) {
        return Axios.post('/api/theme-builder/login', formdata);
    },
}