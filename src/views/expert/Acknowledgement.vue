<template>
    <div>
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
                            >
                                mdi-pencil
                            </v-icon>
                        </template>
                        
                        <!-- The edit passkeys modal -->
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-dialog v-model="dialog" max-width="500px">
                                    <v-card>
                                        <v-card-title>
                                        <span class="headline">Edit Passkeys</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.clientPasskey" label="Client Passkey"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="editedItem.expertPasskey" label="Expert Passkey"></v-text-field>
                                                    </v-col>
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
                    text: 'Client Passkey',
                    value: 'clientPasskey',
                },{
                    text: 'Expert Passkey',
                    value: 'expertPasskey',
                },{ 
                    text: 'Actions', 
                    value: 'actions', 
                    sortable: false 
                }
            ],
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: '',
                submitted: null,
                clientPasskey: '',
                expertPasskey: '',
                userId: '',
                expertId: ''
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
        save () {
            if (this.editedIndex > -1) {

                fetch("https://localhost:44343/api/order/SubmitPasskeys", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.editedItem)
                })
                .then((response) => {
                    if(response.ok){
                        console.log("passkeys saved");
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
            this.orders = this.$store.getters.getExpertsOrders(user.sub).map(o => ({...o, topicName: this.$store.getters.topic(o.topicId).Name}) );
        }
    }
}
</script>

<style scoped>

</style>