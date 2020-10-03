<template>
    <div class="main">
        <div class="banner"></div>
        <div class="content">
            <div v-if="!payloadSent">
                <v-container>
                    <v-row dense class="justify-center"> 
                        <v-col cols="11" class="text-center">
                            <v-card>
                                <v-card-text>
                                    <v-autocomplete
                                        v-model="selectedTopic"
                                        :items="topics"
                                        :loading="isLoading"
                                        :search-input.sync="search"
                                        hide-no-data
                                        hide-selected
                                        item-text="name"
                                        item-value="id"
                                        label="Currently Approved Topics"
                                        placeholder="Start typing to Search for a topic"
                                        prepend-icon="mdi-database-search"
                                        return-object
                                    ></v-autocomplete>
                                </v-card-text>
                                <v-divider></v-divider>
                                <!-- <v-expand-transition>
                                    <v-list v-if="selectedTopic" class="red lighten-3">
                                        <v-list-item>
                                            <v-list-item-content class="pointer" @click="gotoTopic">
                                                <v-list-item-subtitle class="pointer" v-text="selectedTopic.Name" @click="gotoTopic"></v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-expand-transition> -->
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container>
                    <v-row dense class="justify-center">
                        <v-btn v-show='search != null && search != "" && search.length > 1' @click="loadForm">Still cant find the topic?</v-btn>
                    </v-row>
                </v-container>
                <v-container v-if="displayForm">
                    <v-row dense class="justify-center">
                        <v-col cols="11" class="text-center">
                            <v-form>
                                <v-row dense style="padding-bottom: 1em;">
                                    <model-list-select 
                                        :list="allCategories"
                                        v-model="selectedCategoryId"
                                        option-value="id"
                                        option-text="name"
                                        id="categorySelect"
                                        placeholder="Select a Category"
                                        @change="$v.selectedCategoryId.$touch()" @blur="$v.selectedCategoryId.$touch()"
                                        :error-messages="selectedCategoryIdErrors">
                                    </model-list-select>
                                    <p style="color: #ff5252; font-size: 12px;">{{selectedCategoryIdErrors[0]}}</p>
                                </v-row>
                                <v-row dense style="margin-bottom: 1em;">
                                    <v-text-field id="topicName" v-model="newTopicName" label="New topic name"
                                                @input="$v.newTopicName.$touch()" @blur="$v.newTopicName.$touch()" 
                                                :error-messages="newTopicNameErrors" required>
                                    </v-text-field>
                                </v-row>
                                <v-row dense>
                                    <v-textarea v-model="description" rows="6" label="Provide a description of this topic and features you would cover" 
                                                @input="$v.description.$touch()" @blur="$v.description.$touch()"
                                                :error-messages="descriptionErrors" required>
                                    </v-textarea>
                                </v-row>
                                <v-row justify="center" align="center">
                                    <v-col cols="1">
                                        <vue-recaptcha
                                            ref="invisibleRecaptcha"
                                            @verify="onCaptchaVerify"
                                            @expired="onCaptchaExpired"
                                            size="invisible"
                                            :sitekey="recaptchaSitekey">
                                        </vue-recaptcha>
                                        <v-btn color="primary" @click="verify">Submit Topic Request</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
            <div v-else style="height: 100%;">
                <v-container style="position: relative; top: 45%;">
                    <v-row class="text-center">
                        <v-col>
                            <h2>{{requestResponse}}</h2>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </div>
        <ButtonBack />
    </div>    
</template>

<script>
import ButtonBack from '@/components/utils/ButtonBack.vue'
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import VueRecaptcha from 'vue-recaptcha';
import { GetBySubstring as _topicRepo_GetBySubstring, SubmitRequest as _topicRepo_SubmitRequest } from '@/store/topic/repository.js';
import { GetAll as _categoryRepo_GetAll } from '@/store/category/repository.js';

export default {
    name: 'TopicRequest',
    components: {
        ModelListSelect,
        VueRecaptcha,
        ButtonBack
    },
    
    mixins: [validationMixin],

    validations: {
        selectedCategoryId: {
            required
        },
        newTopicName: {
            required,
            maxLength: maxLength(75)
        },
        description: {
            required,
            minLength: minLength(15),
            maxLength: maxLength(500)
        }
    },

    data() {
        return {
            recaptchaSitekey: "6LdVY6YZAAAAAKzj2aDl_Rbw1ctMc7MKdeBwLZL8",
            topics: [],
            selectedTopic: null,

            allCategories: [],
            selectedCategoryId: null,

            newTopicName: "",
            description: "",

            displayForm: false,
            isLoading: false,
            search: null,
            payloadSent: false,
            requestResponse: ""
        }
    },
    watch: {
      async search (val) {
        // Items have already been requested
        if(val == null || val == "" || val.length < 2) return
        if (this.isLoading) return

        // Lazily load topics
        this.isLoading = true
        this.topics = await _topicRepo_GetBySubstring(val)
        this.isLoading = false;
      },
      selectedTopic(val){
        if(val == null || val == {}) return
        this.$router.push({name: 'Topic', params: {id: this.selectedTopic.id} });
      }
    },
    methods: {
        async loadForm(){
            this.displayForm = false;
            this.allCategories = await _categoryRepo_GetAll();
            this.displayForm = true;
        },
        verify () {
            this.$v.$touch();
            if (this.$v.$invalid) {
                console.log("form invalid")
            } else {
                // eslint-disable-next-line no-undef
                this.$refs.invisibleRecaptcha.execute()
            }
        },
        async onCaptchaVerify() {
            this.$refs.invisibleRecaptcha.reset();

            //send data to backend
            var payload = {
                name: this.newTopicName,
                description: this.description,
                categoryId: this.selectedCategoryId
            }

            const accessToken = await this.$auth.getAccessToken();
            if(await _topicRepo_SubmitRequest(accessToken, payload) == 1){
                this.requestResponse = "Topic request successfully sent!"
            }else{
                this.requestResponse = "There was an issue sending your request. Please try again later."
            }
            this.payloadSent = true;
        },
        onCaptchaExpired: function () {
            this.$refs.invisibleRecaptcha.reset()
        }
    },
    computed: {
        formValid () {
            var newTopicNameValid = (this.newTopicName != null && this.newTopicName != "");
            var descriptionValid = (this.description != null && this.description != "");
            var categoryValid = (this.selectedCategoryId != null);
            return (newTopicNameValid && descriptionValid && categoryValid);
        },
        selectedCategoryIdErrors () {
            const errors = []
            if(!this.$v.selectedCategoryId.$dirty) return errors
            !this.$v.selectedCategoryId.required && errors.push("Category is required")
            return errors
        },
        newTopicNameErrors () {
            const errors = []
            if(!this.$v.newTopicName.$dirty) return errors
            !this.$v.newTopicName.required && errors.push("Name is required")
            !this.$v.newTopicName.maxLength && errors.push("Name must be less than 75 characters")
            return errors
        },
        descriptionErrors () {
            const errors = []
            if(!this.$v.description.$dirty) return errors
            !this.$v.description.required && errors.push("Summary is required")
            !this.$v.description.minLength && errors.push("Sumamry must be greater than 15 characters")
            !this.$v.description.maxLength && errors.push("Description must be less than 500 characters")
            return errors
        }
    }
    
}
</script>

<style scoped>
    .main {
        min-height: 100vh;
        background-color: #80AFBA;
    }

    .content {
        padding-top: 150px;
    }

    .pointer {
        cursor: pointer;
    }
</style>

<style>
    #categorySelect + div.text.default {
        color: black;
    }
</style>