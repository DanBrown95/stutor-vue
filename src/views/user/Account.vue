<template>
    <div class="main">
        <div id="banner">
            
        </div>
        <div>
            <v-row>
                <v-col cols="3">
                    <v-subheader class="float-right">Email </v-subheader>
                </v-col>
                <v-col cols="6">
                    <v-text-field v-model="$auth.user.email" readonly disabled>
                        <template v-slot:prepend>
                            <v-icon color="blue">mdi-email</v-icon>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col v-if="!$auth.user['https://stutor.com/email_verified']">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-chip v-bind="attrs" v-on="on" v-if="!$auth.user['https://stutor.com/email_verified']"
                                class="ma-2"
                                color="red"
                                text-color="white"
                            >
                                UNVERIFIED
                            </v-chip>
                        </template>
                        <span>Please verify your email by clicking the link sent to the address listed.</span>
                    </v-tooltip>
                                        
                    <v-chip class="ma-2" @click="resendEmailVerification">
                        Resend Link
                    </v-chip>
                </v-col>
                <v-col v-else>
                    <v-chip
                        class="ma-2"
                        color="green"
                        text-color="white"
                    >
                        VERIFIED
                    </v-chip>
                </v-col>

                
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-subheader class="float-right">Phone</v-subheader>
                </v-col>
                <v-col cols="6">
                    <template>
                        <vue-tel-input :allCountries="allowedCountries" @validate="validatePhone" v-model="phoneField"></vue-tel-input>
                    </template>
                    <div v-if="displayNewPhoneUpdateButton">
                        <v-btn  @click="updatePhone">Update</v-btn>
                    </div>
                </v-col>
                <v-col v-if="!$auth.user['https://stutor.com/phone_verified']">
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-chip v-bind="attrs" v-on="on" v-if="!$auth.user['https://stutor.com/phone_verified']"
                                class="ma-2"
                                color="red"
                                text-color="white"
                            >
                                UNVERIFIED
                            </v-chip>
                        </template>
                        <span>Please verify your phone number.</span>
                    </v-tooltip>
                    
                    <v-chip v-show="phoneVerificationStatus == null" id="btn-phone-resend" class="ma-2" @click="resendPhoneVerification">
                        Resend Link
                    </v-chip>
                    <div style="display: inline-block;" v-if="phoneVerificationStatus == 'pending'">
                        <v-label>Verification Code</v-label>
                        <CodeInput :fieldWidth=35 :fieldHeight=35 :loading="verifyLoading" class="input" v-on:complete="onPhoneVerifyComplete" />
                        <span v-text="pinMessage" color="red"></span>
                    </div>
                </v-col>
                <v-col v-else>
                    <v-chip
                        class="ma-2"
                        color="green"
                        text-color="white"
                    >
                        VERIFIED
                    </v-chip>
                </v-col>

            </v-row>
        </div>
        <div v-if="isExpert">
            <v-snackbar v-model="showSuccess" color="success" :timeout="1500">Timezone Changed!</v-snackbar>
            <v-row>
                <v-col cols="3">
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

            <div class="btn-wrapper" v-if="expertTopics != null && expertTopics.length > 0">
                <v-btn @click="toggleExpertTopics" class="inst-btn" color="success" rounded outlined>View Expert Topics</v-btn>
            </div>
            <slide-up-down :active="showExpertTopics" :duration="500">
                <v-row>
                    <v-col cols="2">
                        <v-subheader class="float-right">Topics</v-subheader>
                    </v-col>
                    <v-col cols="9" >
                        <div v-for="expertTopic in expertTopics" :key="expertTopic.id">
                            <v-row align="center">
                                <v-col cols="1">
                                    <v-icon small class="mr-2" @click="unassignTopic(expertTopic)" color="red" title="Revoke Topic">
                                        mdi-delete
                                    </v-icon>
                                    <v-icon small class="mr-2" @click="displaySpecialtiesModal(expertTopic)" color="red" title="Modify Specialties">
                                        mdi-clipboard-text-outline
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
            </slide-up-down>

            <div class="btn-wrapper">
                <v-btn @click="togglePaymentInfo" class="inst-btn" color="success" rounded outlined>View Payment Information</v-btn>
            </div>
            <slide-up-down :active="showPaymentInfo" :duration="500">
                <v-row class="justify-center" style="margin-top: 2em;">
                    <v-btn @click="gotoPaymentPortal" class="inst-btn" color="info" rounded outlined>Payment Portal</v-btn>
                </v-row>
            </slide-up-down>
            

            <v-row dense class="justify-center" style="margin-top: 2em;">
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

                <!-- <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="error" v-bind="attrs" v-on="on" 
                                @click="deactivateExpert">Remove Expert Status</v-btn>
                    </template>
                    <span>This will revert you to a normal user.</span>
                </v-tooltip> -->
                
            </v-row>

            <!-- The edit specialties modal -->
            <v-dialog v-model="specialtiesDialog" @click:outside="outside" max-width="500px">
                <v-card>
                    <v-card-title class="justify-center">
                        <span class="headline">Edit Specialties</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row justify="center">
                                <v-col cols="12" sm="12" md="12">
                                    <template>
                                        <v-combobox
                                            v-model="selectedSpecialties"
                                            :items="availableSpecialties"
                                            item-text="name"
                                            chips
                                            clearable
                                            label="Select up to 5 specialties"
                                            multiple
                                            prepend-icon="mdi-filter-variant"
                                            solo
                                        >
                                            <template v-slot:selection="{ attrs, item, select, selected }">
                                            <v-chip
                                                v-bind="attrs"
                                                :input-value="selected"
                                                close
                                                @click="select"
                                                @click:close="removeSpecialty(item)"
                                            >
                                                <strong>{{ item.name }}</strong>&nbsp;
                                            </v-chip>
                                            </template>
                                        </v-combobox>
                                    </template>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeSpecialtyModal">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveSpecialtyModal">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </div>
    </div>
</template>

<script>
import AvailabilityDisplay from '@/components/utils/AvailabilityDisplay.vue';
import { RatingAsTitle } from '@/helpers/Rating.js';
import { EmailConfirmation as _accountRepo_ResendEmail,
         PhoneConfirmation as _accountRepo_ResendPhone,
         UpdatePhone as _accountRepo_UpdatePhone,
         VerifyPhonePin as _accountRepo_verifyPhonePin } from '@/store/account/repository.js'; 
import { GetAll as _timezoneRepo_GetAll } from '@/store/timezone/repository.js';
import { ExpertTimezoneId as _expertRepo_ExpertTimezoneId, 
         ExpertTopics as _expertRepo_ExpertTopics,
         GetActiveStatus as _expertRepo_GetActiveStatus,
         ToggleIsActive as _expertRepo_ToggleIsActive, 
         UpdateTimezone as _expertRepo_UpdateTimezone,
         RevokeTopicExpert as _expertRepo_RevokeTopicExpert,
         GetSpecialties as _expertRepo_GetSpecialties,
         UpdateSpecialties as _expertRepo_UpdateSpecialties } from '@/store/expert/repository.js';
import { GetAllSpecialties as _topicRepo_GetAllSpecialties} from "@/store/topic/repository.js";


import CodeInput from "vue-verification-code-input";
import SlideUpDown from 'vue-slide-up-down';

export default {
    name: 'Account',
    components: {
        AvailabilityDisplay,
        CodeInput,
        SlideUpDown
    },
    data() {
        return {
            timezones: [],
            selectedTimezoneId: null,
            showExpertTopics: false,
            showPaymentInfo: false,
            expertTopics: [],
            isActive: false,

            showSuccess: false,
            phoneField: {},
            newPhoneValid: false,
            newPhoneNumber: "",
            allowedCountries: [{
                "name": "United States",
                "iso2": "US",
                "dialCode": "1"
            }],

            phoneVerificationStatus: null,
            verifyLoading: false,
            pinMessage: null,

            specialtiesDialog: false,
            selectedExpertTopic: {},
            availableSpecialties: [],
            selectedSpecialties: []
        }
    },
    created(){
        this.phoneField = this.$auth.user['https://stutor.com/phone'];
        this.populateData();
    },
    computed: {
        isExpert: function(){
            if(this.$auth.user['https://stutor.com/roles'] != null){
                return this.$auth.user['https://stutor.com/roles'].map((a) => { return a.toLowerCase() }).includes('expert');
            }
            return false;
        },
        isActiveButtonText() {
            return this.isActive ? "Temporarily Deactivate" : "Re-enable your availability";
        },
        displayNewPhoneUpdateButton(){
            return (this.newPhoneValid && this.newPhoneNumber != this.$auth.user["https://stutor.com/phone"]);
        }
    },
    filters: {
        RatingAsTitle(rating) {
            return RatingAsTitle(rating);
        }
    },
    watch: {
        async selectedTimezoneId(newValue, oldValue) {
            if(oldValue != null && oldValue !== newValue){
                var success = await _expertRepo_UpdateTimezone(this.$auth.user['https://stutor.com/id'], newValue);
                this.showSuccess = (success);
            }
        }
    },
    methods: {
        async populateData() {

            if(this.isExpert){
                // Populate the timezones
                this.timezones = await _timezoneRepo_GetAll();

                // Get the experts timezone
                this. selectedTimezoneId = await _expertRepo_ExpertTimezoneId(this.$auth.user['https://stutor.com/id']);

                // Get the experts expertTopics
                this.expertTopics = await _expertRepo_ExpertTopics(this.$auth.user['https://stutor.com/id']);

                // Get the experts Active status
                this.isActive = await _expertRepo_GetActiveStatus(this.$auth.user['https://stutor.com/id']);
            }

        },
        async toggleIsActive() {
            // toggle the active status
            this.isActive = await _expertRepo_ToggleIsActive(this.isActive, this.$auth.user['https://stutor.com/id']);
        },
        validatePhone(phone){
            if(phone.valid === true){
                this.newPhoneValid = true;
                this.newPhoneNumber = phone.number;
            }else{
                this.newPhoneValid = true;
                this.newPhoneNumber = this.$auth.user["https://stutor.com/phone"];
            }
        },
        // deactivateExpert() {
        //     let message = "Are you sure you want to remove your expert status?";

        //     let options = {
        //         html: false, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
        //         loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
        //         reverse: false, // switch the button positions (left to right, and vise versa)
        //         okText: 'Yes',
        //         cancelText: 'Close',
        //         animation: 'bounce', // Available: "zoom", "bounce", "fade"
        //         type: 'hard', // coming soon: 'soft', 'hard'
        //         verification: 'remove', // for hard confirm, user will be prompted to type this to enable the proceed button
        //         verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
        //         backdropClose: true, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        //         customClass: '' // Custom class to be injected into the parent node for the current dialog instance
        //     };
        //     this.$dialog.confirm(message, options)
        //     .then(function () {
        //         // remove the users expert status
        //     })
        //     .catch(function () {
        //         // This will be triggered when user clicks on cancel. Do nothing.
        //     });
        // },
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
            var ref = this;
            this.$dialog.confirm(message, options)
            .then(function () {
                // remove the users expert status for this topic
                ref.revokeTopicExpert(expertTopic);
            })
            .catch(function () {
                // This will be triggered when user clicks on cancel. Do nothing.
            });
        },
        async revokeTopicExpert(expertTopic) {
            const accessToken = await this.$auth.getTokenSilently();
            return await _expertRepo_RevokeTopicExpert(expertTopic.topicExpert.id, expertTopic.topicExpert.expertId, accessToken);
        },
        async resendEmailVerification(){
            const accessToken = await this.$auth.getTokenSilently();
            await _accountRepo_ResendEmail(this.$auth.user.sub, accessToken);
        },
        async resendPhoneVerification(){
            const accessToken = await this.$auth.getTokenSilently();
            const res = await _accountRepo_ResendPhone(this.$auth.user["https://stutor.com/id"], accessToken);
            this.phoneVerificationStatus = res.status;
        },
        async onPhoneVerifyComplete(pin) {
            this.verifyLoading = true;
            const accessToken = await this.$auth.getTokenSilently();
            const res = await _accountRepo_verifyPhonePin(this.$auth.user["https://stutor.com/id"], pin, accessToken);
            if(res.success == true){
                window.location.reload()
            }else{
                if(res.exception){
                    this.pinMessage = "Error occured: Please try again later"
                }else{
                    this.pinMessage = res.error;
                }
            }
            this.verifyLoading = false;
        },
        toggleExpertTopics(){
            this.showExpertTopics = !this.showExpertTopics;
        },
        togglePaymentInfo(){
            this.showPaymentInfo = !this.showPaymentInfo;
        },
        async gotoPaymentPortal() {
            // redirect to backend code that connects to stripe customer portal
            const accessToken = await this.$auth.getTokenSilently();

            var formData = {
                userId: this.$auth.user['https://stutor.com/id'],
                customerId: this.$auth.user['https://stutor.com/customer_id']
            };

            fetch("https://localhost:44343/api/PaymentPortal/RedirectToCustomerPortal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(formData)
            }).
            then((response) => response.json())
            .then((jsonData) => {
                window.location.href = jsonData;
            });
        },
        async updatePhone(){
            const accessToken = await this.$auth.getTokenSilently();
            const oldPhone = this.$auth.user['https://stutor.com/phone'];
            const newPhone = this.newPhoneNumber;
            const res = await _accountRepo_UpdatePhone(accessToken, this.$auth.user["https://stutor.com/id"], oldPhone, newPhone);
            if(res.success == true){
                window.location.reload()
            }else{
                this.$dialog.alert("There was an error saving the new number. Please try again later.", {okText: "OK"});
            }
        },
        async displaySpecialtiesModal(expertTopic){
            this.selectedExpertTopic = expertTopic;
            this.selectedSpecialties = await _expertRepo_GetSpecialties(expertTopic.topicExpert.id);
            this.availableSpecialties = await _topicRepo_GetAllSpecialties(expertTopic.topicExpert.topicId);
            this.specialtiesDialog = true;
        },
        outside () {
            this.closeSpecialtyModal();
        },
        async saveSpecialtyModal(){
            var specialtyIds = this.selectedSpecialties.map(x => x.id);

            var payload = {
                topicExpertId: this.selectedExpertTopic.topicExpert.id,
                specialtyIds: specialtyIds
            }

            const accessToken = await this.$auth.getTokenSilently();
            var res = await _expertRepo_UpdateSpecialties(accessToken, payload);
            if(res.success == true){
                var self = this;
                this.$dialog.alert("Your specialties have been updated.", {okText: "OK"}).then(function() {
                    self.closeSpecialtyModal();
                });
            }else{
                this.$dialog.alert("There was an error updating your specialties. Please refresh and try again later.", {okText: "OK"});
            }
        },
        closeSpecialtyModal(){
            this.specialtiesDialog = false;
            this.selectedSpecialties = [];
            this.availableSpecialties = [];
            this.selectedExpertTopic = {};
        },
        removeSpecialty (item) {
            this.selectedSpecialties.splice(this.selectedSpecialties.indexOf(item), 1);
            this.selectedSpecialties = [...this.selectedSpecialties];
        }
    }
}
</script>

<style scoped>
    #banner {
        display:flex;
        align-items: center;
        height: 62px;
        /* background-color: #DEA800; */
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

    /* Code below for the show expert topics button */

    .btn-wrapper {
        margin: 1em auto 0em;
        text-align: center;
    }
    .inst-btn{ 
        color: white; 
        padding: 5px; 
        margin: 0; 
        font-family: "arial"; 
    }
    .btn-wrapper:before,.btn-wrapper:after{
        content:" ";
        width: 15%;
        height: 2px;
        margin: 0 10px;
        background-color: lightgray;
        display:inline-block;
    }
</style>