<template>
    <div class="main">
        <div class="banner">
            <h1>{{topic.Name}}</h1>
        </div>
        <experts id="experts" @expertSelected="expertSelected"/>

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

            <v-container id="success" class="hidden">
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
                                <h4>{{stripe.verification}}</h4>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-container id="payment-card">
                <v-row dense>
                    <v-col cols="12">
                        <card></card>
                    </v-col>
                </v-row>
            </v-container>
      </v-navigation-drawer>
    </div>
</template>

<script>
import router from '../router'
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
            topic: null,
            selectedExpertId: null,
            selectedExpert: {},
            drawer: null,
            stripe: {},
            showSuccess: false
        }
    },
    created() {
        this.topic = this.$store.getters.topic(this.$route.params.id);
    },
    methods: {
        goBack() {
            router.go(-1);
        },
        expertSelected: function(expertId) {
            this.selectedExpertId = expertId;
            document.getElementById("success").classList.add("hidden");
            this.openDrawer();
        },
        openDrawer: function() {
            document.getElementById("payment-card").classList.remove("hidden");
            this.drawer = !this.drawer;
            // A reference to Stripe.js initialized with your real test publishable API key.
            // eslint-disable-next-line no-undef
            var stripe = Stripe("pk_test_iYxcqWBu8lkKSEgZFG9V3nYg00JiUcoXYQ");
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
            .then(function(data) {
                var elements = stripe.elements();
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
                var card = elements.create("card", { style: style });
                // Stripe injects an iframe into the DOM
                card.mount("#card-element");
                card.on("change", function (event) {
                // Disable the Pay button if there are no card details in the Element
                document.querySelector("button").disabled = event.empty;
                document.querySelector("#card-errors").textContent = event.error ? event.error.message : "";
                });
                var form = document.getElementById("payment-form");
                form.addEventListener("submit", function(event) {
                event.preventDefault();
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, data.clientSecret);
                });
            });
            // Calls stripe.confirmCardPayment
            // If the card requires authentication Stripe shows a pop-up modal to
            // prompt the user to enter authentication details without leaving your page.
            var payWithCard = function(stripe, card, clientSecret) {
            loading(true);
            stripe
                .confirmCardPayment(clientSecret, {
                receipt_email: document.getElementById('email').value,
                payment_method: {
                    card: card
                }
                })
                .then(result => {
                    if (result.error) {
                        // Show error to your customer
                        showError(result.error.message);
                    } else {
                        // The payment succeeded!
                        orderComplete(result.paymentIntent.id);
                    }
                });
            };
            /* ------- UI helpers ------- */
            // Shows a success message when the payment is complete
            var orderComplete = function(paymentIntentId) {
                loading(false);
                document
                    .querySelector(".result-message a")
                    .setAttribute(
                    "href",
                    "https://dashboard.stripe.com/test/payments/" + paymentIntentId
                    );
                document.querySelector(".result-message").classList.remove("hidden");
                document.querySelector("button").disabled = true;
                //show the success div and hide the card element
                document.getElementById("success").classList.remove("hidden");
                document.getElementById("payment-card").classList.add("hidden");
            };

            // Show the customer the error from Stripe if their card fails to charge
            var showError = function(errorMsgText) {
                loading(false);
                var errorMsg = document.querySelector("#card-errors");
                errorMsg.textContent = errorMsgText;
                setTimeout(function() {
                    errorMsg.textContent = "";
                }, 4000);
            };

            // Show a spinner on payment submission
            var loading = function(isLoading) {
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
            };
        }
    },
    watch: {
        selectedExpertId: function(id){
            this.selectedExpert = this.$store.getters.expertById(id);
        }
    },
}
</script>

<style scoped>
    .main {
        height: 940px;
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