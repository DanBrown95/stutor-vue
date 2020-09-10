<template>
    <div class="main">
        <div class="header">
            <v-row justify="center">
                <h1 class="header-heading">Your Order History </h1>
            </v-row>
        </div>
        <div v-if="loading"> <!-- Show loading symbol when loading records -->
            <v-row id="loading-wrapper" justify="center">
                <v-progress-circular :indeterminate="true" color="amber"/>
            </v-row>
        </div>
        <div v-show="!loading">
            <div v-if="totalOrders == 0"> <!-- If no records show no records header-->
                <v-row id="no-orders-row" justify="center">
                    <h2>You have no previous orders.</h2>
                </v-row>
            </div>
            <div v-else> <!-- Otherwise show records-->
                <div v-for="order in ordersToDisplay" :key="order.Id">
                    <Order :order="order" />
                </div>
                <v-row justify="center">
                    <v-col cols="11">
                        <pagination style="float: right;" :initial-page="currentPage" :totalPages="totalPagesForPagination" @pageChange="paginationChange"></pagination>
                        <span style=" float: left;">{{startIndex + 1}} - {{startIndex + ordersToDisplay.length}} of {{totalOrders}}</span>
                    </v-col>
                </v-row>
            </div>
        </div>
        
    </div>
</template>

<script>
import Order from "@/components/user/Order.vue";
import Pagination from "@/components/utils/Pagination.vue";
import { CompareBySubmittedThenStatus } from '@/helpers/Compare.js'

export default {
    name: 'OrderHistory',
    props: ['user'],
    components: {
        Order,
        Pagination
    },
    data(){
        return{
            allOrders: [],
            totalOrders: 0,
            
            currentPage: 1,
            ordersPerPage: 5,
            loading: false
        }
    },
    computed: {
        totalPagesForPagination() {
            return Math.ceil(this.totalOrders / this.ordersPerPage);
        }, 
        startIndex() {
            return (this.currentPage * this.ordersPerPage) - this.ordersPerPage;
        },
        ordersToDisplay(){
            return this.allOrders.slice(this.startIndex, this.startIndex + this.ordersPerPage);
        }
    },
    methods: {
        async getOrders(){
            const accessToken = await this.$auth.getAccessToken();

            fetch("https://localhost:44343/api/order/GetAllByUserId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(
                    this.user.sub
                )
            })
            .then(response => response.json())
            .then(jsonData => {
                this.allOrders = jsonData.sort(CompareBySubmittedThenStatus);
            });
        },
        paginationChange(page){
            this.currentPage = page;
        }
    },
    watch: {
        allOrders(orders) {
            this.totalOrders = orders.length;
            this.currentPage = 1;
        },
        user(){
            this.loading = true;
            this.getOrders();
            this.loading = false;
        }
    }
}
</script>

<style scoped>
    .main {
        min-height: 100vh;
        padding-bottom: 2em;
    }

    .header {
        display:flex;
        align-items: center;
        height: 62px;
        background-color: #DEA800;
    }

    #no-orders-row {
        min-height: 300px; 
        display:flex; 
        align-items: center;
    }

    #loading-wrapper {
        height: 700px;
        display:flex;
        align-items: center;
    }
</style>