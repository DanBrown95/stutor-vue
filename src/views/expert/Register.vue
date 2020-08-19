<template>
    <div class="main">
        <div class="banner">
        </div>
        <v-container v-if="!submitted">
            <v-row dense class="justify-center">
                <v-col cols="10" class="text-center">
                    <v-form @submit.prevent="onSubmit">

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>* Desired Topic: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-autocomplete v-model="selectedTopic" :items="topics" item-text="Name" label="Available Topics" placeholder="Start typing for topics" 
                                                prepend-icon="mdi-database-search" return-object :error-messages="topicErrors" 
                                                @change="$v.selectedTopic.$touch()" @blur="$v.selectedTopic.$touch()" required></v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>* Available Days: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-btn-toggle color="primary" v-model="selectedDays" multiple>
                                    <v-btn rounded value="MON">Monday</v-btn>
                                    <v-btn rounded value="TUE">Tuesday</v-btn>
                                    <v-btn rounded value="WED">Wednesday</v-btn>
                                    <v-btn rounded value="THU">Thursday</v-btn>
                                    <v-btn rounded value="FRI">Friday</v-btn>
                                    <v-btn rounded value="SAT">Saturday</v-btn>
                                    <v-btn rounded value="SUN">Sunday</v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>

                        <v-row v-if="weekdaysSelected">
                            <v-col cols="3">
                                <v-subheader>* Available Weekday Hours: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-row>
                                    <v-col cols="6" sm="5">
                                        <v-menu
                                            ref="menu"
                                            v-model="wdshMenu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="weekdayStartHours"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="weekdayStartHours"
                                                label="Start Time"
                                                prepend-icon="mdi-clock-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                            v-if="wdshMenu"
                                            v-model="weekdayStartHours"
                                            full-width
                                            @click:minute="$refs.menu.save(weekdayStartHours)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>

                                    <!-- End Time -->
                                    <v-col cols="6" sm="5">
                                        <v-menu
                                            ref="d"
                                            v-model="wdehMenu"
                                            :close-on-content-click="false"
                                            :return-value.sync="weekdayEndHours"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="weekdayEndHours"
                                                label="End Time"
                                                prepend-icon="mdi-clock-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                            v-if="wdehMenu"
                                            v-model="weekdayEndHours"
                                            full-width
                                            @click:minute="$refs.d.save(weekdayEndHours)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row v-if="weekendsSelected">
                            <v-col cols="3">
                                <v-subheader>* Available Weekend Hours: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-row>
                                    <v-col cols="6" sm="5">
                                        <v-menu
                                            ref="weshmenu"
                                            v-model="weshMenu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="weekendStartHours"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="weekendStartHours"
                                                label="Start Time"
                                                prepend-icon="mdi-clock-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                            v-if="weshMenu"
                                            v-model="weekendStartHours"
                                            full-width
                                            @click:minute="$refs.weshmenu.save(weekendStartHours)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-spacer></v-spacer>

                                    <!-- End Time -->
                                    <v-col cols="6" sm="5">
                                        <v-menu
                                            ref="weehmenu"
                                            v-model="weehMenu"
                                            :close-on-content-click="false"
                                            :return-value.sync="weekendEndHours"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="weekendEndHours"
                                                label="End Time"
                                                prepend-icon="mdi-clock-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                            v-if="weehMenu"
                                            v-model="weekendEndHours"
                                            full-width
                                            @click:minute="$refs.weehmenu.save(weekendEndHours)"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>* Timezone</v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-select
                                    v-model="selectedTimezone"
                                    :items="tz_timezones"
                                    menu-props="auto"
                                    label="Select your local timezone"
                                    value="value"
                                    prepend-icon="mdi-earth"
                                    single-line
                                    :error-messages="timezoneErrors" 
                                    @change="$v.selectedTimezone.$touch()" @blur="$v.selectedTimezone.$touch()" required
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Linkedin Url: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="linkedinUrl"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Website Url: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="websiteUrl"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>* Resume: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-file-input v-model="resumes" accept=".doc,.docx,.pdf" multiple chips required></v-file-input>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>College Transcript: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-file-input v-model="transcripts" accept=".doc,.docx,.pdf" multiple chips></v-file-input>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Certifications/Degrees: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-text-field v-model="certifications"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Years of Experience: </v-subheader>
                            </v-col>
                            <v-col cols="9" style="text-align: left;">
                                    <VueNumberInput v-model="yearsOfExperience" :min="1" inline center controls ></VueNumberInput>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Additional Notes: </v-subheader>
                            </v-col>
                            <v-col cols="9">
                                <v-textarea v-model="notes" placeholder="Add any additional qualifications or useful notes for us to consider here."></v-textarea>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <v-checkbox v-model="agreeToTerms" label="Do you agree to our Terms and Conditions?" :error-messages="agreeToTermsErrors" 
                                                                @change="$v.agreeToTerms.$touch()" @blur="$v.agreeToTerms.$touch()" required></v-checkbox>
                        </v-row>

                        <v-row>
                            <vue-recaptcha
                                ref="invisibleRecaptcha"
                                @verify="onVerify"
                                @expired="onExpired"
                                size="invisible"
                                :sitekey="sitekey">
                            </vue-recaptcha>
                            <v-btn class="mr-4" @click="verify" :disabled="!formValid">Submit</v-btn>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row dense class="justify-center">
                <v-col cols="6" class="text-center">
                    <h2 style="margin-top: 8em; margin-bottom: 3em;">You application has been sent. We will contact you shortly</h2>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import VueRecaptcha from 'vue-recaptcha';
import VueNumberInput from '@chenfengyuan/vue-number-input';

export default {
    name: 'expertRegistration',
    components: {
        VueRecaptcha,
        VueNumberInput
    },

    mixins: [validationMixin],

    validations: {
        selectedTopic: { required },
        selectedTimezone: { required },
        resumes: { required },
        agreeToTerms: {
            checked (val) {
                return val
            }
        }
    },

    data() {
        return {
            sitekey: "6LdVY6YZAAAAAKzj2aDl_Rbw1ctMc7MKdeBwLZL8",
            topics: [],
            search: null,

            selectedTopic: {},
            selectedDays: [],
            
            wdshMenu: false,
            weekdayStartHours: null,
            wdehMenu: false,
            weekdayEndHours: null,
            weshMenu: false,
            weekendStartHours: null,
            weehMenu: null,
            weekendEndHours: null,

            tz_timezones: [
                {
                    text: '	Hawaii Standard Time',
                    value: 'Pacific/Honolulu',
                },{
                    text: 'Alaska Daylight Time',
                    value: 'America/Anchorage',
                },{
                    text: 'Pacific Daylight Time',
                    value: 'America/Los_Angeles',
                },{
                    text: 'Mountain Standard Time (MST)',
                    value: 'America/Phoenix',
                },{ 
                    text: 'Mountain Daylight Time (MDT)', 
                    value: 'America/Denver',
                },{
                    text: 'Central Time (US and Canada)',
                    value: 'America/Chicago'
                },{
                    text: 'Eastern Daylight Time',
                    value: 'America/New_York'
                }
            ],
            selectedTimezone: null,

            certifications: "",
            linkedinUrl: null,
            websiteUrl: null,
            resumes: null,
            transcripts: null,
            yearsOfExperience: 0,
            notes: "",
            agreeToTerms: false,

            submitted: false
        }
    },
    mounted() {
        this.topics = this.$store.getters.allTopics;
    },
    computed: {
        formValid () {
            var topicValid = (this.selectedTopic != null)
            var timezoneValid = (this.selectedTimezone != null && this.selectedTimezone != '')
            var daysValid = (this.selectedDays != [] && this.selectedDays.length > 0)
            var weekdayTimesValid = true;
            if (this.weekdaysSelected){
                weekdayTimesValid = !(this.weekdayStartHours == null || this.weekdayEndHours == null)
            }
            var weekendTimesValid = true;
            if (this.weekendsSelected){
                weekendTimesValid = !(this.weekendStartHours == null || this.weekendEndHours == null)
            }
            var resumeValid = (this.resumes != null && this.resumes.length > 0)
            var checkboxValid = this.agreeToTerms
            return (topicValid && timezoneValid && daysValid && weekdayTimesValid && weekendTimesValid && resumeValid && checkboxValid);
        },
        weekdaysSelected: function() {
            var weekdays = ["MON","TUE","WED","THU","FRI"]
            return this.selectedDays.some(x => weekdays.includes(x));
        },
        weekendsSelected: function() {
            var weekends = ["SAT","SUN"]
            return this.selectedDays.some(x => weekends.includes(x));
        },
        agreeToTermsErrors () {
            const errors = []
            if(!this.$v.agreeToTerms.$dirty) return errors
            !this.$v.agreeToTerms.checked && errors.push("You must agree to continue")
            return errors
        },
        topicErrors () {
            const errors = []
            if(!this.$v.selectedTopic.$dirty) return errors
            !this.$v.selectedTopic.required && errors.push("Topic is required")
            return errors
        },
        timezoneErrors () {
            const errors = []
            if(!this.$v.selectedTimezone.$dirty) return errors
            !this.$v.selectedTimezone.required && errors.push("Timezone is required")
            return errors
        },
        resumeErrors () {
            const errors = []
            if(!this.$v.resumes.$dirty) return errors
            !this.$v.resumes.required && errors.push("Resume is required")
            return errors
        }
    },
    methods: {
        verify () {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                // eslint-disable-next-line no-undef
                this.$refs.invisibleRecaptcha.execute()
            }
        },
        onVerify: function (response) {
            this.submit(response);
            //send data to backend
        },
        onExpired: function () {
            this.$refs.invisibleRecaptcha.reset()
        },
        submit(recaptchaResponse) {
            console.log("captcha response", recaptchaResponse);
            var documents = new FormData()
            for (let index = 0; index < this.resumes.length; index++) {
                const element = this.resumes[index];
                documents.append('resumes[]', element, 'resume'+index);
            }

            for (let index = 0; index < this.transcripts.length; index++) {
                const element = this.transcripts[index];
                console.log("element", element);
                documents.append('transcripts[]', element, 'transcript'+index);
            }

            var formData = {
                captcha: recaptchaResponse,
                selectedTopicId: this.selectedTopicId,
                selectedDays: this.selectedDays,
                weekdayHours: this.weekdayStartHours + "-" + this.weekdayEndHours,
                weekendHours: this.weekendStartHours + "-" + this.weekendEndHours,
                websiteUrl: this.websiteUrl,
                linkedinUrl: this.linkedinUrl,
                certifications: this.certifications,
                yearsOfExperience: this.yearsOfExperience,
                notes: this.notes
            }            
            
            fetch("https://localhost:44343/api/expert/UploadDocuments", {
                method: "POST",
                body: documents
            })
            .then( (response) => {
                console.log("posted documents:", response);

                if(response.ok){
                    fetch('https://localhost:44343/api/expert/Register', {
                        method: "POST",
                        body: JSON.stringify(formData)
                    })
                    .then ((response) => {
                        console.log("form data posted", response);
                        if(response.ok){
                            this.submitted = true;
                        }
                    });
                }
            });

        }// End of submit
    }
}
</script>

<style scoped>
    .banner {
        background-color: #DEA800;
        height: 80px;
    }

    form {
        margin-top: 5em;
        margin-bottom: 3em;
    }

    .v-subheader {
        color: #DEA800;
    }
</style>