<template>
    <div>
        <v-container>
            <v-row class="order">
                <v-col cols="2" class="left">
                    <h5 v-bind:style="{color: statusColor}">{{order.status}}</h5>
                    <h5>Order#: {{order.id}}</h5>
                </v-col>
                <v-col cols="7" class="right">
                    <h5>Topic: {{order.topic.name}}</h5>
                    <h5>Charge: ${{order.charge.toFixed(2)}}</h5>
                    <h5>Submitted: {{formattedSubmitDate}}</h5>
                    <!-- <h5>Passkey: {{order.orderPasskey.clientPasskey}}</h5> -->
                    <v-btn small style="margin-top: 5px;"
                        @click="dialog = true">Submit feedback
                    </v-btn>
                    <FeedbackModal @onSave="refresh" v-model="dialog" :orderId="order.id" :expertId="order.expertId" :additionalInfo="order.additionalInfo" :rating="order.rating"></FeedbackModal>
                </v-col>
                <hr>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment'
import FeedbackModal from '@/components/utils/FeedbackModal.vue'

export default {
    name: 'Order',
    props: ['order'],
    components: {
        FeedbackModal
    },
    data(){
        return {
            dialog: false,
        }
    },
    computed: {
        formattedSubmitDate(){
            var local_date = moment.utc(this.order.submitted).local().format('lll');
            return local_date;
        },
        statusColor(){
            var color = "#DC3545";
            switch (this.order.status.toLowerCase()) {
                case "completed":
                    color = "#28A745";
                    break;
                case "unanswered":
                    color = "#FFC107";
                    break;
                case "refunded":
                    color = "#6527a8";
                    break;
            }
            return color;
        }
    },
    methods: {
        refresh() {
            location.reload();
        }
    }
    
}
</script>

<style scoped>
    .order {
        padding-bottom: 5px;
    }

    .left {
        border-right: 1px solid lightgray;
        background-color: #F6F6F6;
        border-radius: 15px 0px 0px 15px;
    }

    .right {
        border-bottom: solid 1px lightgray;
        background-color: white;
    }

    hr {
        height: 1px;
        background-color: lightgrey;
        border: none;
    }
</style>