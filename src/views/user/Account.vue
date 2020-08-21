<template>
    <div class="main">
        <div id="banner">
            
        </div>
        <div>
            <v-snackbar v-model="showSuccess" color="success" :timeout="1500">Timezone Changed!</v-snackbar>
            <v-row>
                <v-col cols="3">
                    <v-subheader class="float-right">Timezone </v-subheader>
                </v-col>
                <v-col cols="6">
                    <v-select
                        v-model="selectedTimezone"
                        :items="tz_timezones"
                        menu-props="auto"
                        label="Select your local timezone"
                        value="value"
                        prepend-icon="mdi-earth"
                        single-line
                    ></v-select>
                </v-col>
            </v-row>
            <v-row >
                <v-col cols="3">
                    <v-subheader class="float-right">Topics</v-subheader>
                </v-col>
                <v-col cols="6">
                    <div v-for="expertTopic in expertTopics" :key="expertTopic.topicId">
                        <span>
                            {{expertTopic.topicName}}
                        </span>
                        <v-icon small class="mr-2" @click="unassignTopic(expertTopic)" color="red">
                            mdi-delete
                        </v-icon>
                    </div>
                </v-col>
            </v-row>
            <v-row dense class="justify-center">
                <v-btn color="error" @click="deactivateExpert">Remove Expert Status</v-btn>
            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: [],
                tz_timezones: [],
                selectedTimezone: "",
                expertTopics: [],

                showSuccess: false
            }
        },
        mounted() {
            this.getUser();
            this.tz_timezones = this.$store.getters.getTimezones;
            this.selectedTimezone = this.$store.getters.getExpertTimezone('2015');
            this.expertTopics = this.$store.getters.getExpertTopics('2015').map(t => ({...t, topicName: this.$store.getters.topic(t.topicId).Name}));
        },
        watch: {
            selectedTimezone(newValue, oldValue) {
                // change the experts timezone in the db
                // if successful
                this.showSuccess = (oldValue != '');
            }
        },
        methods: {
            async getUser(){
                const accessToken = await this.$auth.getAccessToken();
                this.user = await this.$auth.getUser(accessToken);
            },
            deactivateExpert() {
                let message = "Are you sure you want to remove your expert status?";

                let options = {
                    html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
                    loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
                    reverse: false, // switch the button positions (left to right, and vise versa)
                    okText: 'Yes',
                    cancelText: 'Close',
                    animation: 'bounce', // Available: "zoom", "bounce", "fade"
                    type: 'hard', // coming soon: 'soft', 'hard'
                    verification: 'remove', // for hard confirm, user will be prompted to type this to enable the proceed button
                    verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
                    backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
                    customClass: '' // Custom class to be injected into the parent node for the current dialog instance
                };
                this.$dialog.confirm(message, options)
                .then(function () {
                    // remove the users expert status
                })
                .catch(function () {
                    // This will be triggered when user clicks on cancel. Do nothing.
                });
            },
            unassignTopic(expertTopic) {
                console.log(expertTopic);
                let message = "Are you sure you no longer want to be an expert on " + expertTopic.topicName + "?";

                let options = {
                    html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
                    loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
                    reverse: false, // switch the button positions (left to right, and vise versa)
                    okText: 'Yes',
                    cancelText: 'Close',
                    animation: 'zoom', // Available: "zoom", "bounce", "fade"
                    type: 'hard', // coming soon: 'soft', 'hard'
                    verification: expertTopic.topicName, // for hard confirm, user will be prompted to type this to enable the proceed button
                    verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
                    backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
                    customClass: '' // Custom class to be injected into the parent node for the current dialog instance
                };
                this.$dialog.confirm(message, options)
                .then(function () {
                    // remove the users expert status
                })
                .catch(function () {
                    // This will be triggered when user clicks on cancel. Do nothing.
                });
            }

        }
    }
</script>

<style scoped>
    #banner {
        display:flex;
        align-items: center;
        height: 62px;
        background-color: #DEA800;
    }

    .float-right {
        float: right;
    }

    .main {
        min-height: 100vh;
        padding-bottom: 2em;
    }
</style>