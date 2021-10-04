<template>
    <div class="main" v-if="topic">
        <div class="banner">
            <h1>{{topic.name}}</h1>
        </div>

        <!-- Shows the searching component when searching for experts -->
        <searching-pulse :showSearching="searchingForExperts" color="skyblue"
                            :allowAlternateText="true" searchingText="Searching for Experts"
                            alternateText="We are still searching for experts. Please continue to wait" />

        <!-- Shows the experts component -->
        <Experts v-if="topic" id="experts" :TopicId="topic.id" @expertSelected="expertSelected" @searching="searching"/> <!-- The experts -->

        <!-- Shows the payment slide out drawer -->
        <v-navigation-drawer id="drawer" v-model="drawer" :permanent="keepDrawerVisible" absolute temporary right :width="700">  <!-- Slide out drawer -->
            <v-list-item style="background-color: #385F73;">  
            <v-list-item-content >
                <v-list-item-title style="color: white;" class="headline text-center">Purchase Confirmation</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-container v-if="!showSuccess && selectedExpert && !showOrderError"> <!-- Order details -->
                <v-row dense>
                    <v-col cols="12">
                    <v-card color="#385F73" dark flat>
                        <v-card-subtitle class="text-center">Confirm your purchase and we will conect you with an expert!</v-card-subtitle>

                        <v-card-title class="justify-center">
                            Description: {{topic.name}} Service by Stutor
                        </v-card-title>

                        <v-card-title class="justify-center">
                            <span style="margin-right: 10px;">Expert Rating: </span>
                            <div v-for="index in selectedExpert.rating" :key="index">
                                <img class="star" src="@/assets/gold-star.png"/>
                            </div>
                        </v-card-title>

                    </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container v-if="!showSuccess && selectedExpert && !showOrderError"> <!-- Order Costs section -->
                <v-row justify="center" dense>
                    <v-col cols="9">
                    <v-card color="white" dark flat>

                        <v-card-text style="text-align: right; fontSize: 18px; color: black;">
                            Expert Price: ${{selectedExpert.price | AsFixedDecimal}}
                        </v-card-text>
                        <v-spacer/>
                        <v-card-text style="text-align: right; fontSize: 18px; color: black;">
                            Service Fees: ${{2.50 | AsFixedDecimal}}
                        </v-card-text>
                        <v-spacer/>
                        <v-card-text style="text-align: center; fontSize: 18px; color: black;">
                            Total: ${{2.50 + selectedExpert.price | AsFixedDecimal}}
                        </v-card-text>
                    </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="payment-card" v-if="!showSuccess && !showOrderError"> <!-- Card container -->
                <v-row dense>
                    <v-col cols="12">
                        <Card/>
                    </v-col>
                </v-row>
            </v-container>

            
            <v-container style="">
                <v-row class="justify-center">
                    <v-col cols="10">
                        <v-card color="#ECEBEB" dark flat>
                            <v-card-subtitle style="color: #F53535" class="text-center">DO NOT click outside this pane after or when processing card! <br> Clicking outside will result in a loss of information.</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="success" v-if="showSuccess && selectedExpert && showOrderError != true"> <!-- Purchase confirmation container -->
                <br />
                <br />
                <v-row dense>
                    <v-col cols="12">
                        <v-card color="white" class="text-center" dark flat>
                            <div>
                                <img src="@/assets/green-tick.png" height="80" width="80"/>
                                <h2 style="color: black">Success!</h2>
                            </div>
                            <br/>
                            <div>
                                <h3>${{selectedExpert.price | AsFixedDecimal}}</h3>
                                <h3>Your payment is complete</h3>
                            </div>
                            <br />
                            <br />
                            <div>
                                <h3>Verification Code:</h3>
                                <h4 id="payment-verification"></h4>
                                <h3>{{paymentVerification}}</h3>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
                 <v-row dense>
                    <v-col cols="12">
                        <v-card color="white" class="text-center" dark flat>
                            <br />
                            <br />
                            <div>
                                <p style="color: red;">You will receive a text message & email with further instructions. Do not delete that message.</p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="success" v-if="showOrderError"> <!-- Purchase confirmation container -->
                <v-row dense>
                    <v-col cols="12">
                        <v-card color="white" class="text-center" dark flat>
                            <br />
                            <br />
                            <div>
                                <p style="color: red;">There was an error completing your order. Your purchase will be refunded.<br/> We apologize for any inconvenience.</p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

      </v-navigation-drawer>
      <ButtonBack/>
      <RatingLegend/>
    </div>
</template>

<script>
import Experts from '@/components/expert/ExpertIcons.vue';
import SearchingPulse from '@/components/utils/SearchingPulse.vue';
import Card from "@/components/stripe/Card.vue";
import ButtonBack from "@/components/utils/ButtonBack.vue";
import RatingLegend from "@/components/utils/RatingLegend";
import { RatingAsTitle } from '@/helpers/Rating.js';
import { Get as _topicRepo_Get } from "@/store/topic/repository.js";
import moment from 'moment';

export default {
    name: 'SelectedTopic',
    components: {
        Experts,
        Card,
        ButtonBack,
        RatingLegend,
        SearchingPulse
    },
    data () {
        return {
            user: {},
            topic: null,
            selectedExpert: {},
            searchingForExperts: false,
            drawer: null,

            stripe: null,
            elements: null,
            card: null,

            showSuccess: false,
            keepDrawerVisible: false,
            showOrderError: false,
            paymentVerification: "",
            isSending: false
        }
    },
    created() {
        this.user = this.$auth.user;
        this.getTopic();
    },
    methods: {
        back() {
            history.back();
        },
        async getTopic(){
            this.topic = await _topicRepo_Get(this.$route.params.id);
        },
        searching: function(searching){
            this.searchingForExperts = searching;
        },
        expertSelected: function(expert) {
            this.selectedExpert = expert;
            this.showSuccess = false;
            this.openDrawer();
        },
        async openDrawer() {
            this.drawer = !this.drawer;
            
            // A reference to Stripe.js initialized with your real test publishable API key.
            if(this.stripe === null){
                // eslint-disable-next-line no-undef
                this.stripe = Stripe("pk_test_iYxcqWBu8lkKSEgZFG9V3nYg00JiUcoXYQ");
            }
            
            // The items the customer wants to buy
            var purchase = {
                expertId: this.selectedExpert.expertId,
                topicId: this.topic.id
            };
            const accessToken = await this.$auth.getTokenSilently();
            // Disable the button until we have Stripe set up on the page
            document.querySelector("button").disabled = true;
            fetch("https://localhost:44343/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(purchase)
                })
            .then(function(result) {
                return result.json();
            })
            .then((data) => {
                this.elements = this.stripe.elements();
                var style = {
                base: {
                    color: "#32325d",
                    fontFamily: 'Arial, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                    color: "#32325d"
                    }
                },
                invalid: {
                    fontFamily: 'Arial, sans-serif',
                    color: "#fa755a",
                    iconColor: "#fa755a"
                }
                };

                this.card = this.elements.create("card", { style: style });

                // Stripe injects an iframe into the DOM
                this.card.mount("#card-element");
                this.card.on("change", function (event) {
                    // Disable the Pay button if there are no card details in the Element
                    document.querySelector("button").disabled = event.empty;
                    document.querySelector("#card-errors").textContent = event.error ? event.error.message : "";
                });
                var form = document.getElementById("payment-form");
                form.addEventListener("submit", (event) => {
                    event.preventDefault();
                    // Complete payment when the submit button is clicked
                    this.payWithCard(data.clientSecret);
                });
            });
        },
        /* ------- Stripe Required Methods ------- */
        payWithCard: function(clientSecret){
            // Calls stripe.confirmCardPayment
            // If the card requires authentication Stripe shows a pop-up modal to
            // prompt the user to enter authentication details without leaving your page.
            document.getElementById("submit").disabled = true;
            this.loading(true);
            this.stripe
                .confirmCardPayment(clientSecret, {
                receipt_email: this.user.email,//document.getElementById('email').value,
                payment_method: {
                    card: this.card
                }
                })
                .then(result => {
                    if (result.error) {
                        // Show error to your customer
                        this.showError(result.error.message);
                    } else {
                        // The payment succeeded!
                        this.orderComplete(result.paymentIntent.id);
                    }
                });
        },
        /* ------- UI helper methods ------- */
        async orderComplete(paymentIntentId){
            // Shows a success message when the payment is complete
            this.paymentVerification = paymentIntentId;
            //Create the stutor call intent in the database.
            let date = new Date;
            var order = {
                paymentIntentId: paymentIntentId,
                expertId: this.selectedExpert.expertId,
                topicId: this.topic.id,
                topicName: this.topic.name,
                price: this.selectedExpert.price,
                submitted: date,
                friendlySubmitted: moment.utc(date).local().format('MMMM Do YYYY'),
                userId: this.user['https://stutor.com/id']
            }
            const accessToken = await this.$auth.getTokenSilently();
            fetch("https://localhost:44343/api/order/SubmitIntent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(order)
            })
            .then(response => response.json())
            .then(jsonData => {
                if(jsonData == 200){
                    this.loading(false);
                    document.getElementById("submit").disabled = false;
                    this.showSuccess = true;
                }else{
                    this.showOrderError = true;
                }
            });
        },
        showError: function(errorMsgText){
            // Show the customer the error from Stripe if their card fails to charge
            this.loading(false);
            var errorMsg = document.querySelector("#card-errors");
            errorMsg.textContent = errorMsgText;
            setTimeout(function() {
                errorMsg.textContent = "";
            }, 4000);
        },
        loading: function(isLoading){
            // Show a spinner on payment submission
            if (isLoading) {
                // Disable the button and show a spinner
                this.keepDrawerVisible = true;
                document.querySelector("button").disabled = true;
                document.querySelector("#spinner").classList.remove("hidden");
                document.querySelector("#button-text").classList.add("hidden");
            } else {
                this.keepDrawerVisible = false;
                document.querySelector("button").disabled = false;
                document.querySelector("#spinner").classList.add("hidden");
                document.querySelector("#button-text").classList.remove("hidden");
            }
        }
    },
    watch: {
        drawer: function(e){
            if(e == false){
                this.card.unmount("#card-element");
            }
        }
    },
    filters: {
        AsFixedDecimal: function(decimal){
            return decimal != null ? decimal.toFixed(2) : null;
        },
        RatingAsTitle(rating) {
            return RatingAsTitle(rating);
        }
    }
}
</script>

<style scoped>
    .main {
        min-height: 100vh;
        background-image: url('../assets/selected-topic-background.jpg');
        background-size: cover;
    }

    h1 {
        position: relative;
        text-align: center;
        top: 40%;
        color: #f3ba09;
    }

    .banner {
        height: 150px;
        width: 100vw;
    }

    #experts {
        padding-top: 2em;
        display: table;
        margin: 0 auto;
        width: 70%;
    }

    h3, h4 {
        color: black;
    }

    .hidden {
        display: none;
    }

    #btn-back {
        position: fixed;
        bottom: 5%;
        left: 2%;
    }

    .star {
        height: 30px;
        width: 30px;
    }
</style>