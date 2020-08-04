<template>
    <div class="main">
        <div class="banner">
            <h1>{{topic.Name}}</h1>
        </div>
        <experts id="experts" :TopicId="topic.Id" @expertSelected="expertSelected"/>

        <v-navigation-drawer id="drawer" v-model="drawer" absolute temporary right :width="700">
            <v-list-item style="background-color: #385F73;">  
            <v-list-item-content >
                <v-list-item-title style="color: white;" class="headline text-center">Purchase Confirmation</v-list-item-title>
            </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-container>
                <v-row dense>
                    <v-col cols="12">
                    <v-card color="#385F73" dark flat>
                        <v-card-subtitle class="text-center">Confirm your purchase and we will conect you with an expert!</v-card-subtitle>

                        <v-card-title class="justify-center">
                            Price: ${{selectedExpert.Price}}
                        </v-card-title>

                        <v-card-title class="justify-center">
                            Description: {{topic.Name}} Service by Stutor
                        </v-card-title>

                        <v-card-title class="justify-center">
                            <span style="margin-right: 10px;">Expert Rating:</span>
                            <div v-for="index in selectedExpert.Rating" :key="index">
                                <img src="@/assets/gold-star.png" height="30" width="30"/>
                            </div>
                        </v-card-title>

                    </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="payment-card" v-if="!showSuccess">
                <v-row dense>
                    <v-col cols="12">
                        <card></card>
                    </v-col>
                </v-row>
            </v-container>

            
            <v-container style="display: none;">
                <v-row class="justify-center">
                    <v-col cols="10">
                        <v-card color="#ECEBEB" dark flat>
                            <v-card-subtitle style="color: #F53535" class="text-center">DO NOT click outside this pane after or when processing card! <br> Clicking outside will result in a loss of information.</v-card-subtitle>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="success" v-if="showSuccess">
                <v-row dense>
                    <v-col cols="12">
                        <v-card color="white" class="text-center" dark flat>
                            <div>
                                <img src="@/assets/green-tick.png" height="80" width="80"/>
                                <h2 style="color: black">Success!</h2>
                            </div>
                            <br/>
                            <div>
                                <h3>${{selectedExpert.Price}}</h3>
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
            </v-container>

            <v-container id="call-wrapper" v-if="paymentVerification">
                <v-row dense>
                    <v-col cols="12">
                        <v-card color="white" class="text-center" dark flat>
                            <br />
                            <br />
                            <div>
                                <p style="color: red;">You will recieve a text message with further instructions. Do not delete that message.</p>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

      </v-navigation-drawer>
    </div>
</template>

<script>
// import router from '../router'
import experts from '@/components/expert/ExpertIcons.vue'
import card from "@/components/stripe/Card.vue";

export default {
    name: 'SelectedTopic',
    components: {
        experts,
        card
    },
    data () {
        return {
            user: {},
            topic: null,
            selectedExpertId: null,
            selectedExpert: {},
            drawer: null,

            stripe: null,
            elements: null,
            card: null,

            showSuccess: false,
            paymentVerification: "",
            payloadSent: false
        }
    },
    created() {
        this.topic = this.$store.getters.topic(this.$route.params.id);
        this.getUser();
    },
    methods: {
        async getUser(){ // Bad form but having issues accessing the global user property for its Id
            const accessToken = await this.$auth.getAccessToken();
            this.user = await this.$auth.getUser(accessToken);
        },
        expertSelected: function(expertId) {
            this.selectedExpertId = expertId;
            this.showSuccess = false;
            this.openDrawer();
        },
        openDrawer: function() {
            this.drawer = !this.drawer;
            
            // A reference to Stripe.js initialized with your real test publishable API key.
            if(this.stripe === null){
                // eslint-disable-next-line no-undef
                this.stripe = Stripe("pk_test_iYxcqWBu8lkKSEgZFG9V3nYg00JiUcoXYQ");
            }
            
            // The items the customer wants to buy
            var purchase = {
                items: [{ id: self.selectedExpertId }]
            };

            // Disable the button until we have Stripe set up on the page
            document.querySelector("button").disabled = true;
            fetch("https://localhost:44343/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                receipt_email: document.getElementById('email').value,
                payment_method: {
                    card: this.card
                }
                })
                .then(result => {
                    document.getElementById("submit").disabled = false;
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
        orderComplete: function(paymentIntentId){
            // Shows a success message when the payment is complete
            this.loading(false);
            this.showSuccess = true;
            this.paymentVerification = paymentIntentId;
            //Create the stutor call intent in the database.
            var order = {
                clientId: this.user.sub,
                expertId: this.selectedExpertId,
                topicId: this.topic.Id,
                charge: this.selectedExpert.Price,
                submitted: new Date
            }
            
            fetch("https://localhost:44343/api/order/SubmitIntent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
            .then((response) => {
                if(response.ok){
                    this.payloadSent = true;
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
                document.querySelector("button").disabled = true;
                document.querySelector("#spinner").classList.remove("hidden");
                document.querySelector("#button-text").classList.add("hidden");
            } else {
                document.querySelector("button").disabled = false;
                document.querySelector("#spinner").classList.add("hidden");
                document.querySelector("#button-text").classList.remove("hidden");
            }
        }
    },
    watch: {
        selectedExpertId: function(id){
            this.selectedExpert = this.$store.getters.expertById(id);
        },
        drawer: function(e){
            if(e == false){
                this.card.unmount("#card-element");
            }
        }
    },
}
</script>

<style scoped>
    .main {
        height: 940px;
        background-color: #F7F8FC;
    }

    h1 {
        position: relative;
        text-align: center;
        top: 40%;
        color: #DEA800;
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
</style>

<style>
    #txtUser {
        color: #3F3B3B !important;
    }

    #btnLogout {
        color: #3F3B3B !important;
    }
</style>