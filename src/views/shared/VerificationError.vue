<template>
    <div class="main">
        <div class="header">
        </div>
        <v-row id="no-orders-row" justify="center" v-if="$auth.loaded && !$auth.user['https://stutor.com/email_verified'] && !$auth.user['https://stutor.com/phone_verified']">
            <h2> Please verify your phone and email address.</h2>
        </v-row>
        <div justify="center" style="text-align: center;" v-else>
            <h1 style="font-size: 100px; display: inline;"> Oops! </h1>
            <h2>404 - Page not found</h2>
        </div>
    </div>    
</template>

<script>
export default {

}
</script>

<style scoped>
    .main {
        min-height: 75vh;
        padding-bottom: 2em;
    }

    .header {
        display:flex;
        align-items: center;
        height: 62px;
        background-color: #f3ba09;
    }

    #no-orders-row {
        min-height: 300px; 
        display:flex; 
        align-items: center;
    }
</style>