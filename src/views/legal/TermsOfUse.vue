<template>
    <div>
        <div class="banner">
            <h1>Terms Of Use</h1>
        </div>
        <div class="main-content-wrapper">
            <v-container>
                <v-content>
                    <v-row justify="center">
                        <v-col cols="7" class="main-content">
                            <terms-of-use-content/>
                        </v-col>
                    </v-row>
                </v-content>
            </v-container>
        </div>
        <ButtonBack/>
    </div>
</template>

<script>
import TermsOfUseContent from "../../components/legal/TermsOfUseContent.vue";
import ButtonBack from "@/components/utils/ButtonBack.vue";

export default {
    components: {
        TermsOfUseContent,
        ButtonBack
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