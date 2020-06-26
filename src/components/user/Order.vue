<template>
    <div>
        <v-container>
            <v-row class="order">
                <v-col cols="2" class="left">
                    <h5 v-bind:style="{color: statusColor}">{{status}}</h5>
                    <h5>Order#: {{id}}</h5>
                </v-col>
                <v-col cols="7" class="right">
                    <h5>Topic: {{topic.Name}}</h5>
                    <h5>Charge: ${{charge}}</h5>
                    <h5>Submitted: {{formattedSubmitDate}}</h5>
                    <h5>Call Time: {{callLength}}</h5>
                </v-col>
                <hr>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'Order',
    props: ['id', 'topicId', 'expertId', 'charge', 'status', 'submitted', 'callLength'],
    data(){
        return {
            topic: {}
        }
    },
    mounted(){
        this.topic = this.$store.getters.topic(this.topicId);
    },
    computed: {
        formattedSubmitDate(){
            return moment(this.submitted).format("lll");
        },
        statusColor(){
            return (this.status === "Completed") ? '#28A745' : ((this.status === "Unanswered") ? "#FFC107" : "#DC3545")
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