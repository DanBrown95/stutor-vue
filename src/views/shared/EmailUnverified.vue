<template>
    <div class="main">
        <v-container>
            <v-card class="col-md-9">
                <v-row justify="center">
                    <v-col cols="12">
                        <h2 style="color: grey;">Email Verification</h2>
                        <h4>Please verify your email using the link that was sent to the email on file.</h4>
                        <hr />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="9">
                        <h4 style="color: grey;">To resend the link click the following button</h4>
                    </v-col>
                    <v-col>
                        <v-btn color="success">Resend</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .main {
        background-color: aliceblue;
    }

    div.main > div.container {
        height: 690px;
    }

    div.main > div.container > div.v-card {
        margin: auto;
        height: 50%; 
        top: 20%;
    }

    h2, h4 {
        padding-bottom: 1em;
    }

    .v-btn { 
        float: right;
    }
</style>