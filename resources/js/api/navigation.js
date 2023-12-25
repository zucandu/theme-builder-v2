
export default {
    tool_menu_get_info(key) {
        return axios.get(`/api/theme-builder/nav-${key}`)
    },
}