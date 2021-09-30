<template>
    <div class="main">
        <div class="header">
        </div>
        <v-row id="no-orders-row" justify="center">
            <h2> Please verify your phone and email address.</h2>
        </v-row>
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