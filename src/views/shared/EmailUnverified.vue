<template>
    <div class="main">
        <v-container>
            <v-card class="col-md-9" v-if="!$auth.loading">
                <v-row justify="center">
                    <v-col cols="12" v-if="!$auth.user['https://stutor.com/email_verified'] || !$auth.user['https://stutor.com/phone_verified']">
                        <h2 style="color: grey;">Verification Pending</h2>
                        <ul>
                        <li v-if="!$auth.user['https://stutor.com/email_verified']">Please verify your email using the link that was sent to the email on file.</li>
                        <li v-if="!$auth.user['https://stutor.com/phone_verified']">Please verify your phone number on your account page.</li>
                        </ul>
                        <hr />
                    </v-col>
                    <v-col cols="12" v-else>
                        <h2 style="color: green;">Verification Complete</h2>
                        <h4>Email and phone have both been verified. No more action is required.</h4>
                        <hr />
                    </v-col>
                </v-row>
                <v-row v-if="!$auth.user['https://stutor.com/email_verified']">
                    <v-col cols="9">
                        <h4 style="color: grey;">To resend the email verification link click the following button</h4>
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
    name: 'Unverified',
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .main {
        height: 100%;
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

    h2, h4, li {
        padding-bottom: 1em;
    }

    .v-btn { 
        float: right;
    }
</style>