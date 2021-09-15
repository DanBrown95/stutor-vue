<template>
    <div class="main">
        <div v-if="!messageSent">
            <h2 class="heading">Contact Us</h2>
            <v-form @submit.prevent="onSubmit">
                <v-container>
                    <v-row justify="center">
                        <v-col cols="4">
                            <v-text-field v-model="firstName" label="First Name" required 
                                            @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()"
                                            :error-messages="firstNameErrors">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field v-model="lastName" label="Last Name" required 
                                            @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"
                                            :error-messages="lastNameErrors">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="4">
                            <v-text-field v-model="email" label="Email" required 
                                            @input="$v.email.$touch()" @blur="$v.email.$touch()"
                                            :error-messages="emailErrors">
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-select v-model="subject" :items="availableSubjects" label="Subject" required 
                                        @input="$v.subject.$touch()" @blur="$v.subject.$touch()"
                                        :error-messages="subjectErrors"
                            ></v-select>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-col cols="8">
                            <v-textarea v-model="message" label="Message" required 
                                            @input="$v.message.$touch()" @blur="$v.message.$touch()"
                                            :error-messages="messageErrors">
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
                <v-row justify="center" align="center">
                    <v-col cols="1">
                        <!-- <div id="recaptcha" class="g-recaptcha" data-sitekey="6LdVY6YZAAAAAKzj2aDl_Rbw1ctMc7MKdeBwLZL8" data-callback="submit" data-size="invisible"></div>
                        <v-btn color="primary" @click="verify">Submit</v-btn> -->
                        <vue-recaptcha
                            ref="invisibleRecaptcha"
                            @verify="onCaptchaVerify"
                            @expired="onCaptchaExpired"
                            size="invisible"
                            :sitekey="sitekey">
                        </vue-recaptcha>
                        <v-btn color="primary" @click="verify">Submit</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
        <div v-else style="height: 100%;">
            <v-container style="position: relative; top: 45%;">
                <v-row class="text-center">
                    <v-col>
                        <h2 id="response-header">{{responseHeader}}</h2>
                        <p>{{responseParagraph}}</p>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>    
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha';
import { SendEmail as _utilsRepo_SendEmail } from '@/store/utils/repository.js';

export default {
    mixins: [validationMixin],

    validations: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      subject: { required },
      message: { required, minLength: minLength(15) },
    },

    name: 'ContactForm',
    components: {
        VueRecaptcha
    },
    data() {
        return {
            sitekey: "6LdVY6YZAAAAAKzj2aDl_Rbw1ctMc7MKdeBwLZL8",
            firstName: "",
            lastName: "",
            email: "",
            message: "",
            subject: "",
            availableSubjects: [
                "My Account",
                "Billing",
                "Report a problem",
                "Other"
            ],
            messageSent: false,
            responseHeader: "",
            responseParagraph: ""
        }
    },
    computed: {
        firstNameErrors () {
            const errors = []
            if(!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.required && errors.push("First Name is required")
            return errors
        },
        lastNameErrors () {
            const errors = []
            if(!this.$v.lastName.$dirty) return errors
            !this.$v.lastName.required && errors.push("Last Name is required")
            return errors
        },
        emailErrors () {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be a valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        messageErrors () {
            const errors = []
            if(!this.$v.message.$dirty) return errors
            !this.$v.message.required && errors.push("Message is required")
            !this.$v.message.minLength && errors.push("Message must be greater than 15 characters")
            return errors
        },
        subjectErrors () {
            const errors = []
            if (!this.$v.subject.$dirty) return errors
            !this.$v.subject.required && errors.push('subject is required')
            return errors
        },
    },
    methods: {
        verify () {
            this.$v.$touch();
            console.log("verifying");
            if (this.$v.$invalid) {
                console.log("form invalid")
            } else {
                // eslint-disable-next-line no-undef
                this.$refs.invisibleRecaptcha.execute()
            }
        },
        async onCaptchaVerify(token) {
            this.$refs.invisibleRecaptcha.reset();
            console.log('Verified: ' + token);

            //send data to backend
            var payload = {
                firstName: this.firstName,
                lastName: this.lastName,
                subject: this.subject,
                email: this.email,
                message: this.message
            }

            var response = await _utilsRepo_SendEmail(payload);
            if(response.status == 200){
                this.responseHeader = "Message Sent!";
                this.responseParagraph = "We will get back to as soon as possible.";
                this.messageSent = true;
            }else{
                this.responseHeader = "Oops something went wrong.";
                this.responseParagraph = "This is embaressing. We will get working on this ASAP!";
                this.messageSent = true;
            }

        },
        onCaptchaExpired: function () {
            this.$refs.invisibleRecaptcha.reset();
        }
    }
}
</script>

<style scoped>
    .main {
        height: 600px;
    }

    .heading {
        margin-top: 2em;
        text-align: center;
    }

    #response-header {
        font-size: 2em;
        color: #DEA800;
    }
</style>