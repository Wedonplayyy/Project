<template>
    <div>

    </div>

</template>

<script>
    export default {
        name: "ShoppingCart",
        components: {},
        props: {},
        data() {
            return {
              msg:['1','2','sdg'],
            }
        },
        methods: {
          onClick(name,title){
            this.$toast(title);
          }
        },
        mounted() {

        },
        created() {

        },
        filters: {},
        computed: {},
        watch: {},
        directives: {}
    }
</script>

<style scoped>

</style>
