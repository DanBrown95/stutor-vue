<template>
    <div class="main">
        <div class="header">

        </div>
        <v-container>
            <v-row dense class="justify-center">
                <v-col cols="10" class="text-center">
                    <v-data-table :items="orders" :headers="headers" item-key="id">
                        <template v-slot:[`item.id`]="{ item }">
                            <span>{{ item.id }}</span>
                        </template>

                        <template v-slot:[`item.submitted`]="{ item }">
                            <span>{{item.submitted | AsMomentShortDate}}</span>
                        </template>

                        <template v-slot:[`item.status`]="{ item }">
                            <v-chip :color="getStatusColor(item.status)">{{item.status}}</v-chip>
                        </template>

                        <template v-slot:[`item.topicName`]="{ item }">
                            <span>{{item.topic.name}}</span>
                        </template>

                        <template v-slot:[`item.callLength`]="{ item }">
                            <span>{{item.callLength | secondsAsReadableString}}</span>
                        </template>

                        <template v-slot:[`item.price`]="{ item }">
                            <span>${{item.price.toFixed(2)}}</span>
                        </template>

                        <template v-slot:[`item.actions`]="{ item }">
                            <v-icon v-if="item.status.toLowerCase() !== 'completed'"
                                small
                                class="mr-2"
                                @click="editItem(item)"
                                color="red"
                            >
                                mdi-pencil
                            </v-icon>
                        </template>

                        <template v-slot:[`header.actions`]="{ header }">
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
                                <v-dialog v-model="dialog" @click:outside="outside" max-width="500px">
                                    <v-card>
                                        <v-card-title class="justify-center">
                                            <span class="headline">Edit Passkey</span>
                                        </v-card-title>

                                        <v-card-text>
                                            <v-container>
                                                <v-row justify="center">
                                                    <v-col cols="12" sm="6" md="9">
                                                        <v-form v-on:submit.prevent="save">
                                                            <v-text-field v-model="editedItem.clientPasskey" :class="{ 'passkey-error': passkeyError }" label="Client Passkey"></v-text-field>
                                                        </v-form>
                                                    </v-col>
                                                </v-row>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="9">
                                                        <p id="passkey-error-message" style="color: red; display: none;">Incorrect Passkey</p>
                                                        <p id="passkey-success-message" style="color: green; display: none;">Passkey Confirmed!</p>
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
import { CompareByStatus } from '@/helpers/Compare.js'
import { CompareBySubmitted } from '@/helpers/Compare.js' 
import { OrdersByUserId as _expertRepo_OrdersByUserId } from '@/store/expert/repository.js'
import { SubmitPasskey as _orderRepo_SubmitPasskey } from '@/store/order/repository.js';

export default {
    name: "Acknowledgment",
    props: ['user'],
    data(){
        return {
            orders: [],
            headers: [
                {
                    text: 'Id',
                    value: 'id',
                },{
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
                    value: 'price',
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
            },
            passkeyError: false
        }
    },
    methods: {
        async getOrders(){
            var unordered = await _expertRepo_OrdersByUserId(this.user.sub);
            var status = unordered.sort(CompareByStatus);
            this.orders = status.sort(CompareBySubmitted);
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
        shakePasskeyError() {
            this.passkeyError = true;
            var suc = document.getElementById('passkey-success-message');
            suc.style.display = "none";
            var er = document.getElementById('passkey-error-message');
            er.style.removeProperty('display');

        },
        unshakePasskeyError() {
            var er = document.getElementById('passkey-error-message');
            er.style.display = "none";
            this.passkeyError = false;
        },
        close () {
            this.unshakePasskeyError();
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },
        outside () {
            this.close();
        },
        async save () {
            if (this.editedIndex > -1) {
                const accessToken = await this.$auth.getAccessToken();
                
                this.unshakePasskeyError();
                var response = await _orderRepo_SubmitPasskey(this.editedItem.id, this.editedItem.clientPasskey, this.user.sub, accessToken);
                if(response == 1){
                    Object.assign(this.orders[this.editedIndex], this.editedItem)
                    this.close();
                    var suc = document.getElementById('passkey-success-message');
                    suc.style.removeProperty('display');
                    setTimeout(window.location.reload(), 4000);
                }
                else {
                    this.shakePasskeyError();
                }
            }
        }
    },
    filters: {
        AsMomentShortDate: function(date){
            var local_date = moment.utc(date).local().format('lll');
            return local_date;
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
        user() {
            this.getOrders();
        }
    }
}
</script>

<style>
    .header {
        height: 62px;
        background-color: #DEA800;
    }

    .main {
        min-height: 100vh;
    }

    .passkey-error input {
        border-bottom: solid 2px red !important;
        animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    }

    @keyframes shake {
        10%,
        90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%,
        80% {
            transform: translate3d(2px, 0, 0);
        }

        30%,
        50%,
        70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%,
        60% {
            transform: translate3d(4px, 0, 0);
        }
    }

</style>