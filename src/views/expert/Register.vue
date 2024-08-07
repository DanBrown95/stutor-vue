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
                            <v-col cols="6">
                                <v-autocomplete v-model="selectedTopic" 
                                                :items="topics" item-text="name" 
                                                label="Available Topics" 
                                                placeholder="Start typing for topics" 
                                                prepend-icon="mdi-database-search" 
                                                return-object 
                                                :error-messages="topicErrors" 
                                                @change="$v.selectedTopic.$touch()" 
                                                @blur="$v.selectedTopic.$touch()" 
                                                :search-input.sync="topicSearch"
                                                :hide-no-data="true"
                                                required
                                >
                                </v-autocomplete>
                            </v-col>
                            <v-col style="align-self: center;">
                                <span v-if="selectedTopic != null" style="float: left;">Selected: {{selectedTopic.name}}</span>
                            </v-col>
                        </v-row>

                        <v-row v-if="selectedTopic && availableSpecialties.length > 0">
                            <v-col cols="3">
                                <v-subheader>Specialties: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <template>
                                    <v-select
                                        v-model="selectedSpecialties"
                                        :items="availableSpecialties"
                                        item-text="name"
                                        item-value="id"
                                        chips
                                        clearable
                                        label="Select up to 5 specialties"
                                        multiple
                                        prepend-icon="mdi-filter-variant"
                                        solo
                                        @input="$v.selectedSpecialties.$touch()" 
                                        @blur="$v.selectedSpecialties.$touch()" 
                                        :error-messages="specialtiesErrors"
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
                                    </v-select>
                                </template>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>* Available Days: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-btn-toggle color="primary" v-model="selectedDays" multiple>
                                    <v-btn rounded value="mon">Monday</v-btn>
                                    <v-btn rounded value="tue">Tuesday</v-btn>
                                    <v-btn rounded value="wed">Wednesday</v-btn>
                                    <v-btn rounded value="thu">Thursday</v-btn>
                                    <v-btn rounded value="fri">Friday</v-btn>
                                    <v-btn rounded value="sat">Saturday</v-btn>
                                    <v-btn rounded value="sun">Sunday</v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>

                        <v-row v-if="weekdaysSelected">
                            <v-col cols="3">
                                <v-subheader>* Available Weekday Hours: </v-subheader>
                            </v-col>
                            <v-col cols="8">
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
                                            :max="weekdayEndHours"
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
                                            :min="weekdayStartHours"
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
                            <v-col cols="8">
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
                                            :max="weekendEndHours"
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
                                            :min="weekendStartHours"
                                            ></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>

                        <v-row v-if="!isExpert">
                            <v-col cols="3">
                                <v-subheader>* Location</v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <GoogleLocation @locationChange="locationChanged" :auto-locate="true"></GoogleLocation>
                                <div v-for="error in locationErrors" :key="error">
                                    <span style="color: red">{{error}}</span>
                                </div>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Linkedin Url: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field v-model="linkedinUrl"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Website Url: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field v-model="websiteUrl"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>* Resume: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-file-input v-model="resumes" accept=".doc,.docx,.pdf" multiple chips required
                                                @input="$v.resumes.$touch()" 
                                                @blur="$v.resumes.$touch()" 
                                                :error-messages="resumeErrors"
                                ></v-file-input>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>College Transcript: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-file-input v-model="transcripts" accept=".doc,.docx,.pdf" multiple chips></v-file-input>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Certifications/Degrees: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field v-model="certifications" 
                                            @input="$v.certifications.$touch()" 
                                            @blur="$v.certifications.$touch()" 
                                            :error-messages="certificationErrors">
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Years of Experience: </v-subheader>
                            </v-col>
                            <v-col cols="8" style="text-align: left;">
                                    <VueNumberInput v-model="yearsOfExperience" :min="0" inline center controls ></VueNumberInput>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="3">
                                <v-subheader>Additional Notes: </v-subheader>
                            </v-col>
                            <v-col cols="8">
                                <v-textarea v-model="notes" 
                                            placeholder="Add any additional qualifications or useful notes for us to consider here."
                                            @input="$v.notes.$touch()" 
                                            @blur="$v.notes.$touch()" 
                                            :error-messages="notesErrors"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        
                        <v-row>
                            <v-checkbox v-model="agreeToTerms" label="Do you agree to our Terms and Conditions?" :error-messages="agreeToTermsErrors" 
                                                                @change="$v.agreeToTerms.$touch()" @blur="$v.agreeToTerms.$touch()" required></v-checkbox>
                        </v-row>

                        <v-row>
                            <vue-recaptcha
                                ref="invisibleRecaptcha"
                                @verify="onCaptchaVerified"
                                @expired="onCaptchaExpired"
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
                    <h2 style="margin-top: 8em; margin-bottom: 3em;">{{submitResponse}}</h2>
                </v-col>
            </v-row>
        </v-container>
        <ButtonBack/>
    </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, helpers } from "vuelidate/lib/validators";
import VueRecaptcha from 'vue-recaptcha';
import VueNumberInput from '@chenfengyuan/vue-number-input';
import ButtonBack from "@/components/utils/ButtonBack.vue";
import { GetBySubstring as _topicRepo_GetBySubstring, GetAllSpecialties as _topicRepo_GetAllSpecialties } from "@/store/topic/repository.js";
import { Register as _expertRepo_Register, UploadDocuments as _expertRepo_UploadDocuments } from '@/store/expert/repository.js';
import GoogleLocation from '@/components/utils/GoogleLocation.vue';

function maxFilesize(value){
    return !helpers.req(value) || (value && !value.some(x => x.size > 2096128));
}

function maxSpecialties(specialties){
    return specialties != null && specialties.length <= 5;
}

export default {
    name: 'expertRegistration',
    components: {
        VueRecaptcha,
        VueNumberInput,
        ButtonBack,
        GoogleLocation
    },

    mixins: [validationMixin],

    validations: {
        selectedTopic: { required },
        resumes: { 
            required,
            maxFilesize
        },
        certifications: {
            maxLength: maxLength(500)
        },
        notes: {
            maxLength: maxLength(500)
        },
        agreeToTerms: {
            checked (val) {
                return val
            }
        },
        selectedSpecialties: {
            maxSpecialties
        }
    },

    data() {
        return {
            sitekey: "6LdVY6YZAAAAAKzj2aDl_Rbw1ctMc7MKdeBwLZL8",
            topics: [],
            topicSearch: "",

            availableSpecialties: [],
            selectedSpecialties: [],

            selectedTopic: null,
            selectedDays: [],
            
            wdshMenu: false,
            weekdayStartHours: null,
            wdehMenu: false,
            weekdayEndHours: null,
            weshMenu: false,
            weekendStartHours: null,
            weehMenu: null,
            weekendEndHours: null,

            locationData: {
                address: "",
                coords: {lat: 0.0, lng: 0.0},
                isValid: false,
                grantedPermissions: false
            }, 

            certifications: "",
            linkedinUrl: null,
            websiteUrl: null,
            resumes: null,
            transcripts: null,
            yearsOfExperience: 0,
            notes: "",
            agreeToTerms: false,

            submitted: false,
            submitResponse: ""
        }
    },
    watch: {
        topicSearch(val){ 
            this.getTopics(val);
        },
        selectedTopic(val){
            this.getSpecialties(val.id);
        }
    },
    computed: {
        isExpert(){
            if(this.$auth.user['https://stutor.com/roles'] != null){
                return this.$auth.user['https://stutor.com/roles'].map((a) => { return a.toLowerCase() }).includes('expert');
            }
            return false;
        },
        certificationErrors () {
            const errors = []
            if(!this.$v.certifications.$dirty) return errors
            !this.$v.certifications.maxLength && errors.push("Must be less than 500 characters")
            return errors
        },
        notesErrors () {
            const errors = []
            if(!this.$v.notes.$dirty) return errors
            !this.$v.notes.maxLength && errors.push("Must be less than 500 characters")
            return errors
        },
        formValid () {
            var daysValid = (this.selectedDays != [] && this.selectedDays.length > 0)
            var weekdayTimesValid = true;
            if (this.weekdaysSelected){
                weekdayTimesValid = !(this.weekdayStartHours == null || this.weekdayEndHours == null)
            }
            var weekendTimesValid = true;
            if (this.weekendsSelected){
                weekendTimesValid = !(this.weekendStartHours == null || this.weekendEndHours == null)
            }
            
            return (!this.$v.$invalid && daysValid && weekdayTimesValid && weekendTimesValid && (this.isExpert || (!this.isExpert && this.locationData.isValid)) );
        },
        weekdaysSelected: function() {
            var weekdays = ["mon","tue","wed","thu","fri"]
            return this.selectedDays.some(x => weekdays.includes(x));
        },
        weekendsSelected: function() {
            var weekends = ["sat","sun"]
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
        locationErrors () {
            const errors = []
            !this.locationData.grantedPermissions && errors.push("Location Permissions Required. Allow this site access to your location.")
            !this.locationData.isValid && errors.push("Location is required. Use the locator button to get your position.")
            return errors
        },
        resumeErrors () {
            const errors = []
            if(!this.$v.resumes.$dirty) return errors
            !this.$v.resumes.required && errors.push("Resume is required")
            !this.$v.resumes.maxFilesize && errors.push("Max file size is 2MB")
            return errors
        },
        specialtiesErrors () {
            const errors = []
            if(!this.$v.selectedSpecialties.$dirty) return errors
            !this.$v.selectedSpecialties.maxSpecialties && errors.push("Select no more than 5 specialties")
            return errors
        }
    },
    methods: {
        async getTopics(val) {
            if(val && val.length > 1){
                this.topics = await _topicRepo_GetBySubstring(val);
            }else{
                this.topics = [];
            }
        },
        locationChanged(data){
            this.locationData = data;
        },
        async getSpecialties(topicId){
            this.availableSpecialties = await _topicRepo_GetAllSpecialties(topicId);
            this.selectedSpecialties = [];
        },
        removeSpecialty (item) {
            this.selectedSpecialties.splice(this.selectedSpecialties.indexOf(item), 1);
            this.selectedSpecialties = [...this.selectedSpecialties];
        },
        verify () {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                // eslint-disable-next-line no-undef
                this.$refs.invisibleRecaptcha.execute()
            }
        },
        onCaptchaVerified: function (recaptchaToken) {
            this.$refs.invisibleRecaptcha.reset();
            this.submit(recaptchaToken);
        },
        onCaptchaExpired: function () {
            this.$refs.invisibleRecaptcha.reset()
        },
        async submit(recaptchaToken) {
            var specialtyCSV = this.selectedSpecialties.join();
            var formData = {
                captcha: recaptchaToken,
                userId: this.$auth.user['https://stutor.com/id'],
                topicId: this.selectedTopic.id,
                location: !this.isExpert ? this.locationData : null,
                selectedDays: this.selectedDays,
                weekdayHours: this.weekdayStartHours + "-" + this.weekdayEndHours,
                weekendHours: this.weekendStartHours + "-" + this.weekendEndHours,
                websiteUrl: this.websiteUrl,
                linkedinUrl: this.linkedinUrl,
                certifications: this.certifications,
                yearsOfExperience: this.yearsOfExperience,
                notes: this.notes,
                specialties: specialtyCSV
            }            
            
            const accessToken = await this.$auth.getTokenSilently();
        
            // Submit the application and pass along the id returned
            var applicationId = await _expertRepo_Register(formData, accessToken);
        
            if(applicationId !== 0){
                // Submit the uploaded documents
                
                var documents = new FormData()
                for (let index = 0; index < this.resumes.length; index++) {
                    const element = this.resumes[index];
                    documents.append('resumes[]', element, this.$auth.user['https://stutor.com/id']+'-'+applicationId+'-'+index);
                }

                if(this.transcripts) {
                    for (let index = 0; index < this.transcripts.length; index++) {
                        const element = this.transcripts[index];
                        documents.append('transcripts[]', element, this.$auth.user['https://stutor.com/id']+'-'+applicationId+'-'+index);
                    }
                }

                var docUploadResponse = await _expertRepo_UploadDocuments(documents, accessToken);

                this.submitResponse = (docUploadResponse.status == 200) ? "Your application has been submitted. We will contact you shortly." : "There was an issue submitting your application. Please try again shortly.";
                this.submitted = true;
            }
            
        }// End of submit
    }
}
</script>

<style scoped>
    .banner {
        background-color: #f3ba09;
        height: 62px;
    }

    form {
        margin-top: 5em;
        margin-bottom: 3em;
    }

    .v-subheader {
        float: left;
        font-weight: bold;
    }
</style>