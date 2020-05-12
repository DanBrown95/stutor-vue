<template>
    <div class="main">
        <v-container>
            <v-layout row wrap>
                <v-flex sm4 offset-sm4>
                    <v-text-field v-model="searchText" dense solo append-icon="fas fa-search"></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-sm>
            <div>
                <v-layout row justify-center>
                    <v-col sm="4" v-for="(item, index) in this.restrictedArray" :key="index" @click="selectItem(item)">
                        <v-chip style="width: 100%; justify-content: center; background-color: white;" text-color="red" class="ma-2" large> {{ item.Name }} </v-chip>
                    </v-col>
                </v-layout>
                <div v-if="restrictedArray.length == 0" style="text-align: center;">
                    <v-card-text> No matches </v-card-text>
                </div>
                <h5 class="items-visible"> ({{restrictedArray.length}} of {{this.fullArray.length}})</h5>
            </div>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "listWithSearch",
    props: ["fullArray", "searchReset"],
    data() {
        return {
            searchText: "",
            restrictedArray: [],
            selectedItem: null
        }
    },
    created() {
        this.restrictedArray = this.fullArray.slice(0, 9);
    },
    methods: {
        selectItem(item) {
            this.selectedItem = item;
            this.$emit('listSelectedItem', this.selectedItem);
        }
    },
    watch: {
        searchText: function(val) {
            this.restrictedArray = this.fullArray.filter(item => item.Name.toLowerCase().includes(val.toLowerCase()));
        },
        fullArray: function () {
            this.selectedItem = null;
            this.restrictedArray = this.fullArray.slice(0, 9);
        },
        searchReset: function (val) {
            if(val){
                this.searchText = "";
            }
        }
    }
}
</script>

<style scoped>
    .items-visible {
        position: relative;
        float: right;
    }
</style>