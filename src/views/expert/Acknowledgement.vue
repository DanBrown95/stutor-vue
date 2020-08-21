<template>
    <div class="main">
        <div class="header">

        </div>
        <v-container>
            <v-row dense class="justify-center">
                <v-col cols="10" class="text-center">
                    <v-data-table :items="orders" sort-by="submitted" :headers="headers" item-key="id">
                        <template v-slot:item.submitted="{ item }">
                            <span>{{item.submitted | AsMomentShortDate}}</span>
                        </template>

                        <template v-slot:item.status="{ item }">
                            <v-chip :color="getStatusColor(item.status)">{{item.status}}</v-chip>
                        </template>

                        <template v-slot:item.callLength="{ item }">
                            <span>{{item.callLength | secondsAsReadableString}}</span>
                        </template>

                        <template v-slot:item.charge="{ item }">
                            <span>${{item.charge}}</span>
                        </template>

                        <template v-slot:item.actions="{ item }">
                            <v-icon v-if="item.status.toLowerCase() !== 'completed'"
                                small
                                class="mr-2"
                                @click="editItem(item)"
                                color="red"
                            >
                                mdi-pencil
                            </v-icon>
                        </template>

                        <template v-slot:header.actions="{ header }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <span v-on="on">{{header.text}}</span>
                                </template>
                                <span>Click the pencil icon to add the passkey. These are required to verify the call and submit payments</span>
                            </v-tooltip>
                        </template>
                        
                        <!-- The edit passkeys modal -->
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-dialog v-model="dialog" max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                        <span class="headline">Edit Passkey</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.clientPasskey" label="Client Passkey"></v-text-field>
                                                    </v-col>
                                                    <!-- <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.expertPasskey" label="Expert Passkey" disabled></v-text-field>
                                                    </v-col> -->
                                                </v-row>
                                            </v-container>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>

                        
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: "Acknowledgment",
    data(){
        return {
            user: {},
            orders: [],
            headers: [
                {
                    text: 'Requested',
                    value: 'submitted',
                    sortable: true,
                    align: 'start',
                },{
                    text: 'Status',
                    value: 'status',
                },{
                    text: 'Topic',
                    value: 'topicName',
                },{
                    text: 'Call Time',
                    value: 'callLength',
                },{
                    text: 'Payment',
                    value: 'charge',
                },{ 
                    text: 'Verify Call', 
                    value: 'actions', 
                    sortable: false 
                }
            ],
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: '',
                clientPasskey: '',
            }
        }
    },
    mounted(){
        this.getUser();
    },
    methods: {
        async getUser(){ // Bad form but having issues accessing the global user property for its Id
            const accessToken = await this.$auth.getAccessToken();
            this.user = await this.$auth.getUser(accessToken);
        },
        getStatusColor(status){
            var color = "#DC3545";
            switch (status.toLowerCase()) {
                case "completed":
                    color = '#28A745';
                    break;
                case "unanswered":
                    color = '#FFC107';
                    break;
                default:
                    break;
            }
            return color;
        },
        editItem (item) {
            this.editedIndex = this.orders.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        async save () {
            if (this.editedIndex > -1) {
                const accessToken = await this.$auth.getAccessToken();
                fetch("https://localhost:44343/api/order/SubmitPasskeys", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.editedItem)
                })
                .then((response) => {
                    if(response.ok){
                        console.log("passkey saved");
                    }
                });

                Object.assign(this.orders[this.editedIndex], this.editedItem)
            }
            this.close()
        }
    },
    filters: {
        AsMomentShortDate: function(date){
            return moment(date).format('lll');
        },
        secondsAsReadableString: function(seconds){
            var d = Number(seconds);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);
            return h+'h '+m+'m '+s+'s ';
        }
    },
    watch: {
        user: function(user){
            //Get the orders and get the topic name from the Id and format the submitted date
            this.orders = this.$store.getters.getExpertsOrders(user.sub).map(o => ({...o, topicName: this.$store.getters.topic(o.topicId).Name }) );
        }
    }
}
</script>

<style scoped>
    .header {
        height: 62px;
        background-color: #DEA800;
    }

    .main {
        min-height: 100vh;
    }
</style>