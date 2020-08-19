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
                <div v-for="order in orders" :key="order.Id">
                    <Order :id="order.id" :status="order.status" :charge="order.charge" :topicId="order.topicId" :submitted="order.submitted" :clientPasskey="order.clientPasskey" />
                </div>
                <v-row justify="center">
                    <v-col cols="11">
                        <pagination style="float: right;" :initial-page="currentPage" :totalPages="totalPagesForPagination" @pageChange="paginationChange"></pagination>
                        <span style=" float: left;">Displaying up to {{ordersPerPage}} of {{totalOrders}} orders</span>
                    </v-col>
                </v-row>
            </div>
        </div>
        
    </div>
</template>

<script>
import Order from "@/components/user/Order.vue";
import Pagination from "@/components/useful/Pagination.vue";

export default {
    name: 'OrderHistory',
    components: {
        Order,
        Pagination
    },
    data(){
        return{
            user: {},
            orders: [],
            totalOrders: 0,
            
            currentPage: 1,
            ordersPerPage: 5,
            loading: true
        }
    },
    created() {
        this.getUser();
    },
    computed: {
        totalPagesForPagination() {
            return Math.ceil(this.totalOrders / this.ordersPerPage);
        },
        startIndex() {
            return (this.currentPage * this.ordersPerPage) - this.ordersPerPage;
        }
    },
    methods: {
        paginationChange(page){
            this.currentPage = page;
        },
        async getUser(){ // Bad form but having issues accessing the global user property for its Id
            const accessToken = await this.$auth.getAccessToken();
            this.user = await this.$auth.getUser(accessToken);
        }
    },
    watch: {
        currentPage() {
            this.loading = true;
            this.orders = this.$store.getters.getUserOrders(this.user.sub, this.startIndex, this.ordersPerPage).map(o => ({...o, clientPasskey: this.$store.getters.getClientPasskey(o.id)}) );
            this.loading = false;
        },
        user(){
            this.loading = true;
            this.orders = this.$store.getters.getUserOrders(this.user.sub, this.startIndex, this.ordersPerPage).map(o => ({...o, clientPasskey: this.$store.getters.getClientPasskey(o.id)}) );
            this.totalOrders = this.$store.getters.getUserOrdersTotal(this.user.sub);
            this.loading = false;
        }
    }
}
</script>

<style scoped>
    .main {
        min-height: 700px;
        padding-bottom: 2em;
    }

    .header {
        display:flex;
        align-items: center;
        height: 80px;
        background-color: #EDC7B7;
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