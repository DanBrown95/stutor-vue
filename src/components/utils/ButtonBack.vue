<template>
    <div>
        <v-btn rounded color="blue lighten-3" @click="back" id="btn-back">Back</v-btn>
    </div>
</template>

<script>
export default {
    name: 'ButtonBack' ,
    methods: {
        back(){
            history.back();
        }
    }
}
</script>

<style scoped>
    #btn-back {
        position: fixed;
        left: 2%;
        bottom: 5%;
    }
</style>