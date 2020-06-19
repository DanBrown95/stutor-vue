<template>
    <div>
        <div class="banner">
            <h1>Our Privacy Policy</h1>
        </div>
        <div class="main-content-wrapper">
            <v-container>
                <v-content>
                    <v-row justify="center">
                        <v-col cols="7" class="main-content">
                            <Privacy-policy-content/>
                        </v-col>
                    </v-row>
                </v-content>
            </v-container>
        </div>
    </div>
</template>

<script>
import PrivacyPolicyContent from "../../components/legal/PrivacyPolicyContent.vue";
export default {
    components: {
        PrivacyPolicyContent
    }
}
</script>

<style scoped>
    .banner {
        height: 200px;
        justify-content: center;
        align-items: center;
        display: flex;
        background-color: #E9ECEE;
    }
    .main-content-wrapper{
        background-color: #FAFAFA;
    }

    .main-content {
        background-color: white;
    }
</style>