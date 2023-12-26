<template>
    <div :style="`cursor:pointer;height:${zucConfig.medium_image_size}px; background-image: url('${zucConfig.store_url}/storage/${src}'); background-repeat: no-repeat; background-size: cover; background-position: center;`"></div>
</template>

<script>
export default {
    props: ['src', 'height', 'baseUrl']
}
</script>