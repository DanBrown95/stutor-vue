<template>
    <div class="main">
        <div id="banner">
            
        </div>
        <div v-if="isExpert">
            <v-snackbar v-model="showSuccess" color="success" :timeout="1500">Timezone Changed!</v-snackbar>
            <v-row>
                <v-col cols="2">
                    <v-subheader class="float-right">Timezone </v-subheader>
                </v-col>
                <v-col cols="6">
                    <v-select
                        v-model="selectedTimezoneId"
                        :items="timezones"
                        menu-props="auto"
                        label="Select your local timezone"
                        item-value="id"
                        item-text="friendlyName"
                        single-line
                    >
                        <template v-slot:prepend>
                            <v-icon color="blue">mdi-earth</v-icon>
                        </template>
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                    <v-subheader class="float-right">Topics</v-subheader>
                </v-col>
                <v-col cols="9" >
                    <div v-for="expertTopic in expertTopics" :key="expertTopic.id">
                        <v-row align="center">
                            <v-col cols="1">
                                <v-icon small class="mr-2" @click="unassignTopic(expertTopic)" color="red">
                                    mdi-delete
                                </v-icon>
                            </v-col>
                            <v-col cols="3">
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <span v-bind="attrs" v-on="on">{{expertTopic.name}}</span>
                                    </template>
                                    <span>Rating: {{ expertTopic.topicExpert.rating | RatingAsTitle }} <br /> Price: ${{expertTopic.topicExpert.price.toFixed(2)}}</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="7">
                                <AvailabilityDisplay :availability="expertTopic.topicExpert.availability"></AvailabilityDisplay>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
            <v-row dense class="justify-center">
                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn style="margin-right: 5px;" v-bind="attrs" v-on="on" 
                                @click="toggleIsActive" v-bind:class="isActive ? 'error' : 'success' "
                        >
                                {{isActiveButtonText}}
                        </v-btn>
                    </template>
                    <span>When deactivated you will no longer be recommended to users.</span>
                </v-tooltip>

                <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="error" v-bind="attrs" v-on="on" 
                                @click="deactivateExpert">Remove Expert Status</v-btn>
                    </template>
                    <span>This will revert you to a normal user.</span>
                </v-tooltip>
                
            </v-row>
        </div>
    </div>
</template>

<script>
import AvailabilityDisplay from '@/components/utils/AvailabilityDisplay.vue';
import { RatingAsTitle } from '@/helpers/Rating.js';
import { GetAll as _timezoneRepo_GetAll } from '@/store/timezone/repository.js';
import { ExpertTimezoneId as _expertRepo_ExpertTimezoneId, 
         ExpertTopics as _expertRepo_ExpertTopics,
         GetActiveStatus as _expertRepo_GetActiveStatus,
         ToggleIsActive as _expertRepo_ToggleIsActive } from '@/store/expert/repository.js';

export default {
    name: 'Account',
    props: ['user'],
    components: {
        AvailabilityDisplay
    },
    data() {
        return {
            timezones: [],
            selectedTimezoneId: null,
            expertTopics: [],
            isActive: false,

            showSuccess: false
        }
    },
    computed: {
        isExpert: function(){
            if(this.user.groups != null){
                return this.user.groups.map((a) => { return a.toLowerCase() }).includes('experts');
            }
            return false;
        },
        isActiveButtonText() {
            return this.isActive ? "Temporarily Deactivate" : "Re-enable your availability";
        }
    },
    filters: {
        RatingAsTitle(rating) {
            return RatingAsTitle(rating);
        }
    },
    watch: {
        user() {
            this.populateData();
        },
        selectedTimezoneId(newValue, oldValue) {
            // change the experts timezone in the db
            // if successful
            this.showSuccess = (oldValue);
        }
    },
    methods: {
        async populateData() {

            if(this.isExpert){
                // Populate the timezones
                this.timezones = await _timezoneRepo_GetAll();

                // Get the experts timezone
                this. selectedTimezoneId = await _expertRepo_ExpertTimezoneId(this.user.sub);

                // Get the experts expertTopics
                this.expertTopics = await _expertRepo_ExpertTopics(this.user.sub);

                // Get the experts Active status
                this.isActive = await _expertRepo_GetActiveStatus(this.user.sub);
            }

        },
        async toggleIsActive() {
            // toggle the active status
            this.isActive = await _expertRepo_ToggleIsActive(this.isActive, this.user.sub);
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
            let message = "Are you sure you no longer want to be an expert on " + expertTopic.name + "?";

            let options = {
                html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
                loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
                reverse: false, // switch the button positions (left to right, and vise versa)
                okText: 'Yes',
                cancelText: 'Close',
                animation: 'zoom', // Available: "zoom", "bounce", "fade"
                type: 'hard', // coming soon: 'soft', 'hard'
                verification: expertTopic.name, // for hard confirm, user will be prompted to type this to enable the proceed button
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

    .column {
        display: inline-block;
    }
</style>