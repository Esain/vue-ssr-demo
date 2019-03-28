<template>
    <div>
        <p>
            Say Hello to: {{userName}}
        </p>

    </div>
</template>
<script>
export default {
    data(){
        return {
            userName: this.$route.params['userName']
        }
    }
}
</script>

